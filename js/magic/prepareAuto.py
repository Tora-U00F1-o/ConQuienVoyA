"""
Descarga la tabla de grupos de la EII y genera js/salidaA.js.
Las rutas se resuelven respecto a este script (no al directorio desde el que se ejecute).
"""

import json
import sys
import urllib3
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# Rutas fijas respecto a la ubicación del script
SCRIPT_DIR = Path(__file__).resolve().parent
JS_DIR = SCRIPT_DIR.parent
ARRAY_TXT = SCRIPT_DIR / "array.txt"
OUTPUT_JS = JS_DIR / "salidaA.js"
OUTPUT_JS_APP = JS_DIR / "salida.js"

# Columnas de la tabla oficial (cabecera + UO + grupos)
EXPECTED_COLUMNS = 80

# URL de la página web con la tabla (curso y semestre)
url = "https://gobierno.ingenieriainformatica.uniovi.es/grado/gd/?y=26-27&t=s1"

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def log(msg: str) -> None:
    try:
        print(msg, flush=True)
    except UnicodeEncodeError:
        enc = getattr(sys.stdout, "encoding", None) or "utf-8"
        safe = msg.encode(enc, errors="replace").decode(enc)
        print(safe, flush=True)


def fail(msg: str, code: int = 1) -> None:
    log(f"ERROR: {msg}")
    sys.exit(code)


def load_from_web(source_url: str) -> list[list[str]]:
    log(f"Descargando datos desde:\n  {source_url}")
    try:
        response = requests.get(source_url, verify=False, timeout=60)
        response.raise_for_status()
    except requests.exceptions.Timeout:
        fail("La petición HTTP ha superado el tiempo de espera (60 s). Comprueba tu conexión.")
    except requests.exceptions.ConnectionError as e:
        fail(f"No se pudo conectar con el servidor: {e}")
    except requests.exceptions.HTTPError as e:
        fail(f"El servidor respondió con error HTTP: {e}")

    soup = BeautifulSoup(response.text, "html.parser")
    table = soup.find("table")
    if table is None:
        fail(
            "La página se descargó pero no contiene ninguna tabla <table>. "
            "Puede que la URL del curso/semestre no sea válida o la web haya cambiado."
        )

    data: list[list[str]] = []
    for row in table.find_all("tr"):
        row_data = [cell.get_text(strip=True) for cell in row.find_all(["th", "td"])]
        if row_data:
            data.append(row_data)

    if len(data) < 2:
        fail(
            f"La tabla solo tiene {len(data)} fila(s). Se esperaban al menos cabecera y datos."
        )

    log(f"Datos de la página web obtenidos con éxito ({len(data)} filas).")
    return data


def load_from_array_txt() -> list[list[str]]:
    log(f"Cargando datos de respaldo desde:\n  {ARRAY_TXT}")
    if not ARRAY_TXT.is_file():
        fail(
            f"No existe el archivo de respaldo '{ARRAY_TXT.name}' en {SCRIPT_DIR}. "
            "No hay datos alternativos."
        )

    try:
        input_text = ARRAY_TXT.read_text(encoding="utf-8")
    except OSError as e:
        fail(f"No se pudo leer '{ARRAY_TXT}': {e}")

    data: list[list[str]] = []
    for line in input_text.splitlines():
        if not line.strip():
            continue
        data.append([cell.strip() for cell in line.split("\t")])

    if len(data) < 2:
        fail(f"'{ARRAY_TXT.name}' no contiene filas válidas suficientes ({len(data)} filas).")

    log(f"Datos cargados desde array.txt ({len(data)} filas).")
    return data


def normalize_rows(rows: list[list[str]]) -> list[list[str]]:
    """
    Ajusta filas al mismo formato que js/salida.js:
    - ancho fijo (80 columnas), rellenando con "" si faltan celdas al final
    - "." (exportaciones antiguas) -> "" en las dos primeras filas de cabecera
    """
    if not rows:
        return rows

    width = max(len(rows[0]), EXPECTED_COLUMNS)
    normalized: list[list[str]] = []

    for i, row in enumerate(rows):
        cells = list(row)
        if i < 2:
            cells = ["" if c == "." else c for c in cells]
        if len(cells) < width:
            cells.extend([""] * (width - len(cells)))
        elif len(cells) > width:
            cells = cells[:width]
        normalized.append(cells)

    return normalized


def rows_to_js_array(rows: list[list[str]]) -> str:
    """
    Mismo formato que js/salida.js: una fila del array por línea, no una celda por línea.
    """
    row_lines: list[str] = []
    for row in rows:
        cells = ", ".join(json.dumps(cell, ensure_ascii=False) for cell in row)
        row_lines.append(f"[{cells}]")
    return "[\n" + ",\n".join(row_lines) + "\n]"


def build_salida_js_content(rows: list[list[str]]) -> str:
    return f"const data = {rows_to_js_array(rows)};\n"


def write_js_file(path: Path, content: str) -> None:
    try:
        path.write_text(content, encoding="utf-8")
    except OSError as e:
        fail(f"No se pudo escribir '{path}': {e}")
    size_kb = path.stat().st_size / 1024
    log(f"  -> {path.name}: {size_kb:.1f} KiB ({path})")


def write_salida_js(rows: list[list[str]]) -> None:
    JS_DIR.mkdir(parents=True, exist_ok=True)
    content = build_salida_js_content(rows)

    log("Escribiendo archivos (formato idéntico a js/salida.js):")
    write_js_file(OUTPUT_JS, content)
    write_js_file(OUTPUT_JS_APP, content)
    log("La app (index.html / adonde.html) carga js/salida.js, ya actualizado.")


def main() -> None:
    if hasattr(sys.stdout, "reconfigure"):
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except (OSError, ValueError):
            pass

    log(f"Directorio del script: {SCRIPT_DIR}")
    data: list[list[str]] | None = None
    source = "web"

    try:
        data = load_from_web(url)
    except SystemExit:
        raise
    except Exception as e:
        log(f"Fallo al procesar la página web: {e}")
        log("Intentando cargar datos desde array.txt...")
        source = "array.txt"
        data = load_from_array_txt()

    if data is None:
        fail("No se obtuvieron datos.")

    data = normalize_rows(data)
    bad_width = [i for i, r in enumerate(data) if len(r) != len(data[0])]
    if bad_width:
        fail(
            f"Tras normalizar, {len(bad_width)} fila(s) no tienen {len(data[0])} columnas."
        )

    try:
        write_salida_js(data)
    except SystemExit:
        raise
    except Exception as e:
        fail(f"Error inesperado al generar el archivo de salida: {e}")

    log(f"Proceso completado (origen: {source}).")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        log("\nOperación cancelada por el usuario.")
        sys.exit(130)
    if sys.stdin.isatty():
        try:
            input("\nPulsa Enter para cerrar...")
        except EOFError:
            pass
