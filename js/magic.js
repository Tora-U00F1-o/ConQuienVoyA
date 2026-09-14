

// CREAMOS LOS BTNS DE LAS ASIGN --------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
	// Función para crear botones basados en un array y agregarlos a una sección
	function createButtonsAndAddToSection(array, startIndex, sectionId, clickHandler) {
		const section = document.getElementById(sectionId);

		for (let i = startIndex; i < array.length; i++) {
			const button = document.createElement("button");
			button.textContent = array[i];

			if (sectionId === "section1") {
				applyMyEnrollmentClass(button, hasMySubject(array[i]));
			}

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
		refreshTypeButtonHighlights();
	}

	// Función para manejar el clic en los botones de header2Set
	function handleHeader2SetClick(index) {
		selectedHeader2Index = index;
	}

	// Llama a la función para crear botones y agregarlos a las secciones
	createButtonsAndAddToSection(headerSet, 1, "section1", handleHeaderSetClick);
	createButtonsAndAddToSection(header2Set, 2, "section2", handleHeader2SetClick);
	refreshTypeButtonHighlights();
});
// -------------------------------------------------------------------------------------


function createGroupsButtons() {
	const subject = selectedHeaderIndex;
	const tipo = selectedHeader2Index;

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


	const groups = getGroups(col);

	if (groups.length === 0) {
		var txtNoGrupos = document.createElement("h3");
		txtNoGrupos.textContent = "No hay personas en este grupo";
		section.appendChild(txtNoGrupos);
	}

	for (const grupo of groups) {
		const members = getUos(col, grupo);
		// un boton por cada grupo con el nombre "Grupo 2: 10" siendo 10 el num de personas
		// y al clickear en el boton se muestren las personas de ese grupo
		(function(grupo) {
			var button = document.createElement("button");
			button.textContent = header2Set[tipo]+""+grupo+":"+members.length;
			applyMyEnrollmentClass(
				button,
				hasMySubjectTypeGroup(headerSet[subject], header2Set[tipo], grupo)
			);

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
	}
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




