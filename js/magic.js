
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


// CREAMOS LOS BTNS DE LAS ASIGN --------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
	// Función para crear botones basados en un array y agregarlos a una sección
	function createButtonsAndAddToSection(array, startIndex, sectionId, clickHandler) {
		const section = document.getElementById(sectionId);

		for (let i = startIndex; i < array.length; i++) {
			const button = document.createElement("button");
			button.textContent = array[i];

			// Agrega un manejador de clic al botón para guardar el índice seleccionado
			button.addEventListener("click", () => {
				const buttons = section.getElementsByTagName("button");
				for (let btn of buttons) {
					btn.classList.remove("active");
				}
				button.classList.add("active");

				clickHandler(i);
				createGroupsButtons();
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

	// Llama a la función para crear botones y agregarlos a las secciones
	createButtonsAndAddToSection(headerSet, 1, "section1", handleHeaderSetClick);
	createButtonsAndAddToSection(header2Set, 2, "section2", handleHeader2SetClick);
    
});
// -------------------------------------------------------------------------------------


function createGroupsButtons() {
	subject = selectedHeaderIndex; 
	tipo = selectedHeader2Index;

	var col = getCol(headerSet[subject], header2Set[tipo]);
	if(col === -1) {
		return;
	}

	const section = document.getElementById("sectionGrupos");
	while (section.firstChild) {
		section.removeChild(section.firstChild);
	}

	var h2 = document.createElement("h2");
	h2.textContent = "Grupos de "+headerSet[subject]+" "+header2Set[tipo];
	section.appendChild(h2);


	var grupo = 1;
	var uos = getUos(col, grupo);
	grupoLenght = uos.length;

	if(grupoLenght === 0) {
		var txtNoGrupos = document.createElement("h3");
		txtNoGrupos.textContent = "No hay personas en este grupo";
		section.appendChild(txtNoGrupos);
	}

	while(grupoLenght > 0) {
		// un boton por cada grupo con el nombre "Grupo 2: 10" siendo 10 el num de personas
		// y al clickear en el boton se muestren las personas de ese grupo
		(function(grupo) {
			var button = document.createElement("button");
			button.textContent = header2Set[tipo]+""+grupo+":"+grupoLenght;

			// Agrega un manejador de clic al botón para guardar el índice seleccionado
			button.addEventListener("click", () => {
				const buttons = section.getElementsByTagName("button");
                for (let btn of buttons) {
                    btn.classList.remove("active");
                }
                button.classList.add("active");

				selectedGroup = grupo;
				processFindBtn(subject, tipo, grupo);
			});

			section.appendChild(button);

		})(grupo);
		var uos = getUos(col, ++grupo);
		grupoLenght = uos.length;
	} 
}

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

// Con la columna del data (la asignatura y tipo) y el grupo, obtiene las personas del grupo
function getUos(col, group) {
	const res = [];
	for (let i = 3; i < data.length; i++) {
		if (group.toString() === data[i][col]) {
			res.push(data[i][0]);
		}
	}
	return res;
}

// Pintar los uos

// Filtro para work
function processFindBtn(selectedAsignatura, selectedType, selectedGroup) {
	if(selectedAsignatura == null || selectedType == null || selectedGroup == null) return;
	work(selectedAsignatura, selectedType, selectedGroup);
}

// Con la asignatura, tipo y grupo seleccionado, muestra las personas del grupo
function work(subject, tipo, grupo) {
	console.log("subject: "+subject+" tipo: "+tipo+" grupo: "+grupo);
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




