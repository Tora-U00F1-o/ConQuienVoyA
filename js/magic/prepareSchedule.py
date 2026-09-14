"""
Descarga la planificación oficial de todos los grupos presentes en js/salida.js y
genera js/planificacion.js para que la web estática pueda mostrar Mi horario.

Uso (desde cualquier carpeta):
    py js/magic/prepareSchedule.py
"""

import csv
import io
import json
import re
import sys
from collections.abc import Iterable
from datetime import datetime
from pathlib import Path

import requests
import urllib3
from bs4 import BeautifulSoup
from schedule_config import ACADEMIC_YEAR, PLANNING_URL, SEMESTER

SCRIPT_DIR = Path(__file__).resolve().parent
JS_DIR = SCRIPT_DIR.parent
ENROLLMENTS_FILE = JS_DIR / "salida.js"
OUTPUT_FILE = JS_DIR / "planificacion.js"

BASE_URL = PLANNING_URL
BATCH_SIZE = 30
TYPE_CODES = {"Teor.": "T", "P.A.": "S", "P.L.": "L"}

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def log(message: str) -> None:
    print(message, flush=True)


def fail(message: str) -> None:
    log(f"ERROR: {message}")
    sys.exit(1)


def load_enrollment_data() -> list[list[str]]:
    try:
        source = ENROLLMENTS_FILE.read_text(encoding="utf-8")
        array_text = source.split("=", 1)[1].strip().rstrip(";")
        return json.loads(array_text)
    except (OSError, IndexError, json.JSONDecodeError) as error:
        fail(f"No se pudo leer {ENROLLMENTS_FILE}: {error}")


def planning_groups(data: list[list[str]]) -> list[str]:
    groups: set[str] = set()
    subjects, types = data[0], data[1]
    for row in data:
        if not re.fullmatch(r"UO\d+", str(row[0] if row else "")):
            continue
        for column in range(2, len(row)):
            group = row[column]
            class_type = types[column]
            if group in ("", "-", None) or class_type not in TYPE_CODES:
                continue
            groups.add(f"{subjects[column]}.{TYPE_CODES[class_type]}.{group}")
    return sorted(groups)


def batches(items: list[str], size: int) -> Iterable[list[str]]:
    for start in range(0, len(items), size):
        yield items[start : start + size]


def request_view(groups: list[str], view: str) -> str:
    params: dict[str, str] = {"y": ACADEMIC_YEAR, "t": SEMESTER, "vista": view}
    for group in groups:
        # PHP convierte automáticamente los puntos de la clave en guiones bajos.
        params[group.replace(".", "_")] = group
    response = requests.get(BASE_URL, params=params, timeout=90, verify=False)
    response.raise_for_status()
    return response.text


def normalise_time(value: str) -> str:
    hour, minute = value.strip().split(".")
    return f"{int(hour):02d}:{int(minute):02d}"


def csv_events(content: str) -> list[dict[str, str | bool]]:
    reader = csv.DictReader(io.StringIO(content))
    events: list[dict[str, str | bool]] = []
    for raw in reader:
        row = {(key or "").strip(): (value or "").strip() for key, value in raw.items()}
        if not row.get("Subject") or not row.get("Start Date"):
            continue
        try:
            date = datetime.strptime(row["Start Date"], "%d/%m/%Y").date().isoformat()
            events.append({
                "group": row["Subject"],
                "date": date,
                "start": normalise_time(row["Start Time"]),
                "end": normalise_time(row["End Time"]),
                "description": row.get("Description", ""),
                "location": row.get("Location", ""),
                "exception": False,
            })
        except (ValueError, KeyError):
            log(f"Aviso: fila CSV ignorada por formato no reconocido: {row}")
    return events


def red_event_keys(content: str) -> set[tuple[str, str, str, str, str]]:
    soup = BeautifulSoup(content, "html.parser")
    exceptions: set[tuple[str, str, str, str, str]] = set()
    for heading in soup.find_all("h2"):
        match = re.search(r"asignatura\s+(.+?)\s*\(", heading.get_text(" ", strip=True), re.I)
        if not match:
            continue
        group = match.group(1).strip()
        event_list = heading.find_next_sibling("ol")
        if event_list is None:
            continue
        for item in event_list.find_all("li", recursive=False):
            font = item.find("font", attrs={"color": re.compile(r"#ff0000", re.I)})
            if font is None:
                continue
            text = font.get_text(" ", strip=True)
            event = re.search(
                r"(\d{2}/\d{2}/\d{4}),\s*(\d{1,2}\.\d{2})-(\d{1,2}\.\d{2}),\s*(.*?),\s*\(\d+(?:\.\d+)?\)",
                text,
            )
            if event is None:
                log(f"Aviso: excepción no reconocida: {text}")
                continue
            date, start, end, location = event.groups()
            exceptions.add((
                group,
                datetime.strptime(date, "%d/%m/%Y").date().isoformat(),
                normalise_time(start),
                normalise_time(end),
                location.strip(),
            ))
    return exceptions


def write_output(events: list[dict[str, str | bool]]) -> None:
    events.sort(key=lambda event: (
        str(event["date"]), str(event["start"]), str(event["end"]), str(event["group"])
    ))
    content = "// Generado por js/magic/prepareSchedule.py. No editar a mano.\n"
    content += "const scheduleData = " + json.dumps(events, ensure_ascii=False, separators=(",", ":")) + ";\n"
    with OUTPUT_FILE.open("w", encoding="utf-8", newline="\n") as output:
        output.write(content)
    log(f"Generado {OUTPUT_FILE} ({len(events)} eventos).")


def main() -> None:
    data = load_enrollment_data()
    groups = planning_groups(data)
    if not groups:
        fail("No se encontraron grupos en salida.js.")
    log(f"Descargando planificación de {len(groups)} grupos en lotes de {BATCH_SIZE}.")

    events: list[dict[str, str | bool]] = []
    exceptions: set[tuple[str, str, str, str, str]] = set()
    for number, group_batch in enumerate(batches(groups, BATCH_SIZE), start=1):
        log(f"Lote {number}: {len(group_batch)} grupos...")
        try:
            events.extend(csv_events(request_view(group_batch, "csv")))
            exceptions.update(red_event_keys(request_view(group_batch, "web")))
        except requests.RequestException as error:
            fail(f"No se pudo descargar el lote {number}: {error}")

    unique_events: dict[tuple[str, str, str, str, str], dict[str, str | bool]] = {}
    for event in events:
        key = (
            str(event["group"]), str(event["date"]), str(event["start"]),
            str(event["end"]), str(event["location"]),
        )
        event["exception"] = key in exceptions
        unique_events[key] = event

    write_output(list(unique_events.values()))
    log(f"Excepciones marcadas en rojo: {sum(event['exception'] for event in unique_events.values())}.")


if __name__ == "__main__":
    main()
