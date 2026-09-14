document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const nameInput = document.getElementById("nameInput");
    const lista = document.getElementById("lista");
    const resBlock = document.getElementById("res");

    searchButton.addEventListener("click", function () {
        let uo = nameInput.value.trim();
        if (uo === "") {
            alert("Por favor, ingrese un UO.");
            return;
        }
        uo = setMyUO(uo);
        if (!uo) {
            alert("Por favor, ingrese un UO válido.");
            return;
        }

        // Limpiar la lista anterior
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        const results = getEnrollmentsForUO(uo);

        
		var parrafo = document.getElementById("try");

        // Mostrar los resultados en la lista
        if (results.length > 0) {
		    parrafo.textContent = "Asignaturas de "+uo;
            results.forEach(result => {
                const li = document.createElement("li");
                li.textContent = `${result.asignatura} (${result.tipo}): Grupo ${result.grupo}`;
                lista.appendChild(li);
            });
            resBlock.hidden = false;
        } else {
            parrafo.textContent = uo+" no encontrado";

            const li = document.createElement("li");
            li.textContent = "El UO no se encontró en la base de datos.";
            lista.appendChild(li);
            resBlock.hidden = false;
        }
    });
});