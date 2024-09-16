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
        // Quitar todas las letras del principio y añadir "UO" delante
        uo = "UO" + uo.replace(/^\D+/g, '');

        // Limpiar la lista anterior
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        // Buscar el UO en la data
        const results = [];
        for (let i = 3; i < data.length; i++) {
            if (data[i][0] === uo) {
                for (let j = 2; j < data[i].length; j++) {
                    if (data[i][j] !== "-" && data[i][j] !== "") {
                        results.push({
                            asignatura: data[0][j],
                            tipo: data[1][j],
                            grupo: data[i][j]
                        });
                    }
                }
                break;
            }
        }

        
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