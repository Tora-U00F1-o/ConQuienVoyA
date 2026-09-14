document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("scheduleForm");
    const input = document.getElementById("scheduleInput");
    const message = document.getElementById("scheduleMessage");
    const content = document.getElementById("plannerContent");
    const empty = document.getElementById("plannerEmpty");
    const summary = document.getElementById("plannerSummary");
    const title = document.getElementById("periodTitle");
    const previous = document.getElementById("previousPeriod");
    const next = document.getElementById("nextPeriod");
    const navigator = document.getElementById("dateNavigator");
    const officialLink = document.getElementById("officialPlanLink");
    const dialog = document.getElementById("classDialog");
    const dialogTitle = document.getElementById("dialogTitle");
    const dialogDetails = document.getElementById("dialogDetails");
    const spanishDate = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
    const shortDate = new Intl.DateTimeFormat("es-ES", { weekday: "short", day: "numeric", month: "short" });
    const typeCodes = { "Teor.": "T", "P.A.": "S", "P.L.": "L" };
    let view = "week";
    let selectedDate = new Date();
    let events = [];

    function localDate(value) {
        return new Date(`${value}T00:00:00`);
    }

    function isoDate(date) {
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
    }

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function mondayOf(date) {
        const result = new Date(date);
        const day = result.getDay() || 7;
        result.setDate(result.getDate() - day + 1);
        return result;
    }

    function myGroupCodes(uo) {
        return new Set(getEnrollmentsForUO(uo)
            .map(item => typeCodes[item.tipo] ? `${item.asignatura}.${typeCodes[item.tipo]}.${item.grupo}` : null)
            .filter(Boolean));
    }

    function buildOfficialUrl(uo) {
        const url = new URL("https://gobierno.ingenieriainformatica.uniovi.es/grado/plan/plan.php");
        url.searchParams.set("y", "26-27");
        url.searchParams.set("t", "s1");
        url.searchParams.set("vista", "web");
        for (const group of myGroupCodes(uo)) {
            url.searchParams.set(group.replaceAll(".", "_"), group);
        }
        return url.toString();
    }

    function formatTime(time) {
        return time.replace(":", ".");
    }

    function classNumber(description) {
        const match = description.match(/n[úº]mero\s+(.+?)\s+de/i);
        return match ? match[1] : "—";
    }

    function showDetails(event) {
        dialogTitle.textContent = event.group;
        dialogDetails.replaceChildren();
        const rows = [
            ["Fecha", spanishDate.format(localDate(event.date))],
            ["Hora", `${formatTime(event.start)}–${formatTime(event.end)}`],
            ["Aula", event.location || "Sin aula indicada"],
            ["Clase", `(${classNumber(event.description)})`],
        ];
        for (const [term, value] of rows) {
            const dt = document.createElement("dt");
            dt.textContent = term;
            const dd = document.createElement("dd");
            dd.textContent = value;
            dialogDetails.append(dt, dd);
        }
        if (event.exception) {
            const notice = document.createElement("p");
            notice.className = "exception-notice";
            notice.textContent = "Excepción al horario normal.";
            dialogDetails.appendChild(notice);
        }
        dialog.showModal();
    }

    function eventButton(event, compact = false) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `calendar-event${event.exception ? " exception" : ""}${compact ? " compact" : ""}`;
        button.innerHTML = `<strong>${event.group}</strong><span>${formatTime(event.start)}–${formatTime(event.end)}</span><span>${event.location || "Aula pendiente"}</span>`;
        button.addEventListener("click", () => showDetails(event));
        return button;
    }

    function renderDay() {
        const day = isoDate(selectedDate);
        const dayEvents = events.filter(event => event.date === day);
        title.textContent = spanishDate.format(selectedDate);
        content.replaceChildren();
        const list = document.createElement("div");
        list.className = "day-events";
        for (const event of dayEvents) {
            const row = document.createElement("button");
            row.type = "button";
            row.className = `day-event${event.exception ? " exception" : ""}`;
            row.innerHTML = `<time>${formatTime(event.start)}–${formatTime(event.end)}</time><span><strong>${event.group}</strong><small>${spanishDate.format(selectedDate)}, ${formatTime(event.start)}-${formatTime(event.end)}, ${event.location || "Aula pendiente"}, (${classNumber(event.description)})</small></span><span class="room">${event.location || "—"}</span>`;
            row.addEventListener("click", () => showDetails(event));
            list.appendChild(row);
        }
        content.appendChild(list);
        return dayEvents.length;
    }

    function renderWeek() {
        const firstDay = mondayOf(selectedDate);
        const days = Array.from({ length: 5 }, (_, index) => addDays(firstDay, index));
        const weekEvents = events.filter(event => {
            const date = localDate(event.date);
            return date >= firstDay && date < addDays(firstDay, 5);
        });
        title.textContent = `${shortDate.format(firstDay)} – ${shortDate.format(days[4])}`;
        content.replaceChildren();
        const grid = document.createElement("div");
        grid.className = "week-grid";
        const corner = document.createElement("div");
        corner.className = "week-corner";
        corner.textContent = "Hora";
        grid.appendChild(corner);
        for (const day of days) {
            const heading = document.createElement("div");
            heading.className = "week-day-heading";
            heading.textContent = shortDate.format(day);
            grid.appendChild(heading);
        }
        const timeAxis = document.createElement("div");
        timeAxis.className = "time-axis";
        for (let hour = 8; hour <= 20; hour += 1) {
            const label = document.createElement("span");
            label.style.top = `${(hour - 8) * 64}px`;
            label.textContent = `${String(hour).padStart(2, "0")}:00`;
            timeAxis.appendChild(label);
        }
        grid.appendChild(timeAxis);
        for (const day of days) {
            const column = document.createElement("div");
            column.className = "week-day-column";
            const dayEvents = weekEvents.filter(event => event.date === isoDate(day));
            for (const event of dayEvents) {
                const [hour, minute] = event.start.split(":").map(Number);
                const [endHour, endMinute] = event.end.split(":").map(Number);
                const startMinutes = (hour - 8) * 60 + minute;
                const duration = Math.max(30, (endHour * 60 + endMinute) - (hour * 60 + minute));
                const button = eventButton(event, true);
                button.style.top = `${startMinutes * 64 / 60}px`;
                button.style.height = `${duration * 64 / 60 - 4}px`;
                column.appendChild(button);
            }
            grid.appendChild(column);
        }
        content.appendChild(grid);
        return weekEvents.length;
    }

    function renderTable() {
        title.textContent = "Todas las clases";
        content.replaceChildren();
        const wrapper = document.createElement("div");
        wrapper.className = "schedule-table-wrapper";
        const table = document.createElement("table");
        table.className = "schedule-table";
        table.innerHTML = "<thead><tr><th>Fecha</th><th>Hora</th><th>Asignatura · grupo</th><th>Aula</th><th>Clase</th></tr></thead>";
        const body = document.createElement("tbody");
        for (const event of events) {
            const row = document.createElement("tr");
            row.className = event.exception ? "exception" : "";
            row.tabIndex = 0;
            row.innerHTML = `<td>${spanishDate.format(localDate(event.date))}</td><td>${formatTime(event.start)}–${formatTime(event.end)}</td><td><strong>${event.group}</strong></td><td>${event.location || "—"}</td><td>(${classNumber(event.description)})</td>`;
            row.addEventListener("click", () => showDetails(event));
            row.addEventListener("keydown", key => { if (key.key === "Enter" || key.key === " ") showDetails(event); });
            body.appendChild(row);
        }
        table.appendChild(body);
        wrapper.appendChild(table);
        content.appendChild(wrapper);
        return events.length;
    }

    function render() {
        let total = 0;
        if (view === "day") total = renderDay();
        if (view === "week") total = renderWeek();
        if (view === "table") total = renderTable();
        empty.hidden = total > 0;
        summary.textContent = view === "table" ? `${total} clases del semestre` : `${total} clase${total === 1 ? "" : "s"} en esta ${view === "day" ? "fecha" : "semana"}`;
        navigator.hidden = view === "table";
    }

    function loadSchedule(uo) {
        const groups = myGroupCodes(uo);
        events = scheduleData.filter(event => groups.has(event.group));
        officialLink.href = buildOfficialUrl(uo);
        render();
    }

    input.value = getMyUO();
    loadSchedule(input.value);

    form.addEventListener("submit", event => {
        event.preventDefault();
        const uo = normalizeUO(input.value);
        if (!uo) {
            message.textContent = "Introduce un UO válido, por ejemplo UO276853.";
            input.focus();
            return;
        }
        setMyUO(uo);
        input.value = uo;
        message.textContent = "";
        loadSchedule(uo);
    });

    document.querySelectorAll(".view-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            view = tab.dataset.view;
            document.querySelectorAll(".view-tab").forEach(button => {
                const active = button === tab;
                button.classList.toggle("active", active);
                button.setAttribute("aria-selected", active);
            });
            render();
        });
    });

    previous.addEventListener("click", () => {
        selectedDate = addDays(selectedDate, view === "week" ? -7 : -1);
        render();
    });
    next.addEventListener("click", () => {
        selectedDate = addDays(selectedDate, view === "week" ? 7 : 1);
        render();
    });
    document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
});
