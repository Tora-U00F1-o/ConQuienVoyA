
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

// -------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {

	// Función para crear botones basados en un array y agregarlos a una sección
	function createButtonsAndAddToSection(array, startIndex, sectionId, clickHandler) {
		const section = document.getElementById(sectionId);

		for (let i = startIndex; i < array.length; i++) {
			const button = document.createElement("button");
			button.textContent = array[i];

			// Agrega un manejador de clic al botón para guardar el índice seleccionado
			button.addEventListener("click", () => {
				clickHandler(i);
                updateTargetUI();
			});

			section.appendChild(button);
		}
	}

	// Función para manejar el clic en los botones de headerSet
	function handleHeaderSetClick(index) {
		selectedHeaderIndex = index;
	}

	// Función para manejar el clic en los botones de header2Set
	function handleHeader2SetClick(index) {
		selectedHeader2Index = index;
	}

	var numberInput = document.getElementById("number");

	// Agrega un escucha de evento input al elemento input
	numberInput.addEventListener("input", updateTargetUI);

    function updateTargetUI() {
		var number = document.getElementById("number");
		selectedGroup = number.value;
        const a = headerSet[selectedHeaderIndex];
		const b = header2Set[selectedHeader2Index];
		const col = getCol(a, b);
		if (col !== -1) {
			
			var textTarget = document.getElementById("subjectTarget");
			textTarget.textContent = "Consultar Asignatura: "+  data[0][col]+" "+data[1][col] +" "+selectedGroup;
		}
    }

	// Llama a la función para crear botones y agregarlos a las secciones
	createButtonsAndAddToSection(headerSet, 1, "section1", handleHeaderSetClick);
	createButtonsAndAddToSection(header2Set, 2, "section2", handleHeader2SetClick);
    
    updateTargetUI();
});
// -------------------------------------------------------------------------------------



function getCol(subject, t) {
	const index = header.indexOf(subject);
	for (let i = index; i < header2.length; i++) {
		if (t === header2[i]) {
			return i;
		}
	}
	return -1;
}

function getUos(col, group) {
	const res = [];
	for (let i = 3; i < data.length; i++) {
		if (group.toString() === data[i][col]) {
			res.push(data[i][0]);
		}
	}
	return res;
}

function processFindBtn() {
	var number = document.getElementById("number");
	selectedGroup = number.value;
	if(selectedHeaderIndex == null || selectedHeader2Index == null || selectedGroup == null) return;
	work(selectedHeaderIndex, selectedHeader2Index, selectedGroup);
}

function work(subject, tipo, grupo) {
	const a = headerSet[subject];
	const b = header2Set[tipo];

	const col = getCol(a, b);
	if (col !== -1) {
		const res = getUos(col, grupo);
		var parrafo = document.getElementById("try");

		// Cambia el contenido del párrafo
		parrafo.textContent = data[0][col]+ ' '+ data[1][col]+ grupo+ ' personas:'+res.length;

		// Obtener el elemento de la lista
		const lista = document.getElementById("lista");
		while (lista.firstChild) {
			lista.removeChild(lista.firstChild);
			}

		// Generar elementos de lista a partir del array de res
		for (let i = 0; i < res.length; i++) {
			const elementoLista = document.createElement("li");
			elementoLista.textContent = res[i];
			lista.appendChild(elementoLista);
		}

		var resBlock = document.getElementById("res");
		resBlock.hidden = false;
	}
}

