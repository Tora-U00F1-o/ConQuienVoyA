
const header = [];
const header2 = [];

const uos = [];

const headerSet = [];
const header2Set = [];

for (let i = 0; i < data.length; i++) {
	for (const n of data[0]) {
		header.push(n);
		if (!headerSet.includes(n)) {
			headerSet.push(n);
		}
	}

	for (const n of data[1]) {
		header2.push(n);
		if (!header2Set.includes(n)) {
			header2Set.push(n);
		}
	}

	uos.push(data[i][0]);
}

let selectedHeaderIndex = 1; // Variable para guardar el índice seleccionado de headerSet
let selectedHeader2Index = 2; // Variable para guardar el índice seleccionado de header2Set
let selectedGroup = 1;


// Con el codigo de asignatura y tipo de asignatura, obtiene la columna del data
function getCol(subject, t) {
	const index = header.indexOf(subject);
	for (let i = index; i < header2.length; i++) {
		if (t === header2[i]) {
			return i;
		}
	}
	return -1;
}

function compareUO(a, b) {
	const na = parseInt(String(a).replace(/\D/g, ""), 10);
	const nb = parseInt(String(b).replace(/\D/g, ""), 10);
	if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) {
		return na - nb;
	}
	return String(a).localeCompare(String(b), "es");
}

function isEnrollmentRow(row) {
	return Array.isArray(row) && /^UO\d+$/i.test(String(row[0] || "").trim());
}

// Con la columna del data (la asignatura y tipo) y el grupo, obtiene las personas del grupo.
// No asumimos que los grupos sean numéricos: también existen valores como «I-1».
function getUos(col, group) {
	const res = [];
	for (const row of data) {
		if (isEnrollmentRow(row) && String(group) === String(row[col])) {
			res.push(row[0]);
		}
	}
	res.sort(compareUO);
	return res;
}

function getGroups(col) {
	const groups = new Set();
	for (const row of data) {
		const group = row[col];
		if (isEnrollmentRow(row) && group !== "-" && group !== "" && group != null) {
			groups.add(String(group));
		}
	}
	return [...groups].sort((a, b) =>
		a.localeCompare(b, "es", { numeric: true, sensitivity: "base" })
	);
}
