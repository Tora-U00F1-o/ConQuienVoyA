
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

// Con la columna del data (la asignatura y tipo) y el grupo, obtiene las personas del grupo
function getUos(col, group) {
	const res = [];
	for (let i = 3; i < data.length; i++) {
		if (group.toString() === data[i][col]) {
			res.push(data[i][0]);
		}
	}
	res.sort(compareUO);
	return res;
}
