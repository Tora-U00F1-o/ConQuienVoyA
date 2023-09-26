import requests
from bs4 import BeautifulSoup

# URL de la página web con la tabla
url = "https://gobierno.euitio.uniovi.es/grado/gd/?y=23-24&t=s1"

try:
    # Realizar una solicitud HTTP para obtener el contenido de la página
    response = requests.get(url, verify=False)
    response.raise_for_status()  # Lanza una excepción si hay un error en la solicitud HTTP

    # Parsear el contenido HTML con BeautifulSoup
    soup = BeautifulSoup(response.text, "html.parser")

    # Encontrar la tabla que deseas copiar
    table = soup.find("table")

    # Crear un array para almacenar los datos de la tabla
    data = []

    # Iterar a través de las filas de la tabla y guardar los datos en la lista
    for row in table.find_all("tr"):
        row_data = [cell.get_text(strip=True) for cell in row.find_all(["th", "td"])]
        data.append(row_data)
except Exception as e:
    print("Se produjo un error al acceder a la página web:", e)
    print("Cargando datos desde el archivo array.txt...")

    # En caso de error, cargar datos desde el archivo array.txt
    with open('array.txt', 'r') as file:
        input_text = file.read()

    # Parsear el texto
    lines = input_text.split('\n')
    data = []

    for line in lines:
        # Dividir cada línea en función de las tabulaciones y eliminar los espacios en blanco
        row_data = [cell.strip() for cell in line.split('\t')]
        data.append(row_data)
else:
    print("Datos de la página web obtenidos con éxito.")

# Convertir el array en una cadena de texto en formato JavaScript
js_array = "[\n"
for row in data:
    js_array += "[" + ', '.join(['"{}"'.format(column) for column in row]) + "],\n"
js_array = js_array.rstrip(",\n") + "\n]"

# Escribir el resultado en un archivo salida.js
with open('../salida.js', 'w') as file:
    file.write('const data = ' + js_array + ';\n')

print("Archivo de salida 'salida.js' generado con éxito.")

input("Inserte cualquier cosa para cerrar")
