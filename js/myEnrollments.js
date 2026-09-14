const MY_UO_STORAGE_KEY = "conQuienVoyA_miUO";
/** UO por defecto si no se ha buscado en «A qué asignaturas va…» */
const DEFAULT_MY_UO = "UO276853";

function normalizeUO(input) {
	const match = String(input).trim().match(/^(?:UO)?\s*(\d+)$/i);
	return match ? "UO" + match[1] : "";
}

function getMyUO() {
	return localStorage.getItem(MY_UO_STORAGE_KEY) || DEFAULT_MY_UO;
}

function setMyUO(input) {
	const uo = normalizeUO(input);
	if (uo) {
		localStorage.setItem(MY_UO_STORAGE_KEY, uo);
	}
	return uo;
}

/** Misma lógica que la búsqueda en adonde.html */
function getEnrollmentsForUO(uo) {
	const results = [];
	for (const row of data) {
		if (isEnrollmentRow(row) && row[0] === uo) {
			for (let j = 2; j < row.length; j++) {
				if (row[j] !== "-" && row[j] !== "") {
					results.push({
						asignatura: data[0][j],
						tipo: data[1][j],
						grupo: String(row[j]),
					});
				}
			}
			break;
		}
	}
	results.sort((a, b) => {
		if (a.asignatura !== b.asignatura) {
			return a.asignatura.localeCompare(b.asignatura, "es");
		}
		const tipoOrder = { "Teor.": 0, "P.A.": 1, "P.L.": 2 };
		const ta = tipoOrder[a.tipo] ?? 99;
		const tb = tipoOrder[b.tipo] ?? 99;
		if (ta !== tb) {
			return ta - tb;
		}
		return String(a.grupo).localeCompare(String(b.grupo), "es", {
			numeric: true,
		});
	});
	return results;
}

function getMyEnrollments() {
	return getEnrollmentsForUO(getMyUO());
}

function hasMySubject(asignatura) {
	return getMyEnrollments().some((e) => e.asignatura === asignatura);
}

function hasMySubjectAndType(asignatura, tipo) {
	return getMyEnrollments().some(
		(e) => e.asignatura === asignatura && e.tipo === tipo
	);
}

function hasMySubjectTypeGroup(asignatura, tipo, grupo) {
	const g = String(grupo);
	return getMyEnrollments().some(
		(e) =>
			e.asignatura === asignatura &&
			e.tipo === tipo &&
			e.grupo === g
	);
}

function applyMyEnrollmentClass(button, isMine) {
	if (isMine) {
		button.classList.add("my-enrollment");
	} else {
		button.classList.remove("my-enrollment");
	}
}

function refreshTypeButtonHighlights() {
	const section = document.getElementById("section2");
	if (!section || typeof headerSet === "undefined") {
		return;
	}
	const asignatura = headerSet[selectedHeaderIndex];
	const buttons = section.getElementsByTagName("button");
	for (let btn of buttons) {
		const tipo = btn.textContent;
		applyMyEnrollmentClass(btn, hasMySubjectAndType(asignatura, tipo));
	}
}
