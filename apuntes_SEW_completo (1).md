# SEW (Software y Estándares para la Web) — Apuntes para examen tipo test (Cliente + Servidor + PHP/MySQL)

> Enfoque test: memoriza **definiciones**, **puertos**, “**sin estado**”, y qué afirmaciones son **NO recomendables** por **seguridad / compatibilidad**.

---

## Tema 1 — Computación en la Web (cliente)

### Cliente vs Servidor
- **Computación en cliente**: el navegador interpreta HTML/CSS/JS y ejecuta la lógica en la máquina del usuario.
- **Computación en servidor**: el servidor ejecuta código (p. ej. PHP), genera HTML y lo devuelve al cliente.

### TCP/IP (lo típico de test)
- **TCP/IP**: familia de protocolos de Internet.
- **IP**: obtiene la **dirección destino**.
- **TCP**: se encarga de la **entrega** de los datos una vez se conoce la IP.

### HTTP / HTTPS
- **HTTP**: Petición/Respuesta, **puerto 80**, protocolo de nivel de aplicación y **sin estado (stateless)**.
- **HTTPS**: HTTP seguro con **SSL/TLS**, **puerto 443**. El **nivel de cifrado** depende del servidor remoto y del navegador del cliente.

### Computación en cliente con `<object>/<embed>` vs `<script>`
- `<object>/<embed>`: carga de recursos/plug-ins externos.
  - **Pros**: menos carga en servidor, menos ancho de banda durante la computación.
  - **Contras**: dependencia del cliente, instalación, **seguridad** y accesibilidad.
- `<script>`: ejecución nativa en navegador (ECMAScript/JavaScript), sin plug-ins.

---

## Tema 2 — Lenguajes de script: ECMAScript, TypeScript, WebAssembly

- **ECMAScript**: estándar base de JavaScript.
- **TypeScript**: lenguaje con **comprobación de tipos** que se compila a JavaScript.
- **WebAssembly (Wasm)**: formato **binario** basado en máquina de pila; complementa a JS y busca rendimiento.

---

## Tema 3 — JavaScript (test)

### Objetos del navegador
- `window`: objeto raíz.
- `console` pertenece a `window` (debug).
- `navigator.userAgent`: obtener nombre/agente de usuario.

### Operadores y prototipos
- `===`: compara **tipo y valor**.
- `prototype`: permite añadir métodos/propiedades a objetos en tiempo de ejecución.

### Eventos (los que caen)
- `onload`: `<body>`
- `onunload`: `<body>`
- `onsubmit`: `<form>`
- `onchange`: `<input>`, `<select>`, `<textarea>`
- `onclick`, `onmousedown`: todos los elementos HTML
- `onblur`: `<button>`, `<input>`, `<label>`, `<select>`, `<textarea>` y `<body>`

---

## Tema 4 — Tecnologías relacionadas (jQuery, AJAX, HTML5 APIs)

### jQuery
- Biblioteca externa; `$` como constructor; facilita selección/recorrido del DOM.

### AJAX
- Usa el objeto **`XMLHttpRequest`**.
- **Ventajas**: mejor usabilidad percibida (menos recargas).
- **Inconvenientes**: “botón atrás” y favoritos/permalinks, indexación, **accesibilidad**.

### HTML5 APIs (según preguntas modelo)
- Las APIs de HTML5 se consideran dentro del estándar W3C.
- **Geolocation**: dentro del estándar W3C/HTML5.
- **WebGL**: gráficos 3D.

---

# BLOQUE SERVIDOR (nuevo)

## Tema 5 — Computación en el servidor

### Arquitectura cliente-servidor en la Web
- El cliente (navegador) realiza una **petición HTTP**.
- El servidor localiza el recurso (servidor estático) o **realiza computación** (servidor dinámico) y retorna la respuesta.

### Servidor web estático vs dinámico
- **Servidor estático**: actúa como “directorio”: recibe petición HTTP, **recupera recurso** y lo devuelve.
- **Servidor dinámico**: recibe petición HTTP y ejecuta código que **genera** la respuesta (cálculos, acceso a archivos/BD, etc.). Contiene la **lógica de negocio**.

### Arquitectura en capas (Vista–Negocio–Datos)
- **Capa Vista/Presentación**: interfaz, conexión con usuario; típicamente HTML/CSS/JS y puede incluir código ejecutable en servidor (p. ej. PHP).
- **Capa Negocio**: reglas de negocio, algoritmos, comunica con la capa de datos, cambia el estado de la aplicación y devuelve respuesta a la vista.
- **Capa Datos**: gestiona persistencia (BD/almacenamiento). Recibe peticiones de negocio: CRUD (crear, modificar, recuperar, eliminar).

---

## Tema 6 — PHP (fundamentos para test)

### Qué es PHP (enunciados típicos)
- Lenguaje **open source**, **multiplataforma** y centrado en **scripts** para desarrollo web.
- Se ejecuta en el **servidor**: genera HTML y lo envía al cliente.
- Soporta paradigmas procedimental/funcional/POO.

### Dónde se usa PHP (3 usos “de diapositiva”)
1. **Scripts del lado del servidor** (lo típico web).
2. **Scripts en línea de comandos** (cron/planificador).
3. **Aplicaciones de escritorio** (no es lo más adecuado; extensiones como PHP-GTK, histórico).

### Sintaxis básica que suele preguntarse
- Bloques PHP entre `<?php` y `?>`.
- Las sentencias terminan en `;`.
- Comentarios: `//`, `#`, `/* ... */`.
- `echo` imprime.
- Concatenación de strings con `.`.
- `phpversion()` devuelve versión del intérprete.
- `phpinfo()` genera una página con info de configuración (**ojo seguridad: no dejarlo público**).

### Tipos de datos (listado)
- Escalares: `boolean`, `integer`, `float`, `string`.
- Compuestos: `array`, `object`, `callable`, `iterable`.
- Especiales: `null`, `resource`.

### Variables
- Empiezan por `$`.
- Patrón de nombre típico: `[a-zA-Z_][a-zA-Z0-9_]*`.
- Sensibles a mayúsculas/minúsculas.

### Estructuras de control (formas)
- `for`, `while`, `do-while`, `foreach`.
- Sintaxis alternativa: `endif`, `endfor`, `endforeach`, `endswitch`, `endwhile` (suele caer por “reconocer”).

### Arrays (muy preguntable)
- PHP usa arrays como estructura muy flexible: indexados y asociativos.
- Arrays multidimensionales: clave → array de claves/valores.
- `var_dump()` muestra estructura y valores (si es array, explora recursivamente).

### Funciones
- Definición: `function nombre($arg1, ...) { ... return ...; }`.
- El `return` es opcional.

### Clases y objetos (POO)
- Propiedades `public`, `protected`, `private`.
- Constructor `__construct()`.
- Herencia con `extends`.
- **No hay herencia múltiple**.
- Para reutilizar clases: `include` o `require`.

### Variables predefinidas (superglobales)
- Son **arrays especiales** disponibles en cualquier parte del script sin declarar.
- No puedes usar sus nombres como variables propias.
- Lista típica: `$GLOBALS`, `$_SERVER`, `$_REQUEST`, `$_POST`, `$_GET`, `$_FILES`, `$_ENV`, `$_COOKIE`, `$_SESSION`, etc.

Ejemplo de `$_SERVER` típico de test:
- `$_SERVER["SERVER_NAME"]` y `$_SERVER["PHP_SELF"]`.

---

## Tema 7 — Archivos en PHP (lectura/escritura) + problemas de archivos planos

### Flujo típico
- **Lectura**: abrir → leer → cerrar.
- **Escritura**: abrir/crear → escribir → cerrar.

### `fopen()` (modo de apertura: preguntas típicas)
- Devuelve un puntero (handle). Si falla devuelve `false` y PHP lanza `E_WARNING`.
- Modos:
  - `r`, `r+`: puntero al inicio (lectura / lectura+escritura).
  - `w`, `w+`: puntero al inicio y **vacía** contenido; crea si no existe.
  - `x`, `x+`: crea; si existe da error.
  - `a`, `a+`: puntero al final; crea si no existe.
  - `b`: binario (predeterminado y recomendado), combinado.
  - `t`: texto (Windows), combinado.
- Puede abrir archivos remotos con prefijos de protocolo (flujos), pero ojo permisos y seguridad.

### Lectura
- `fread($handle, $length)`: lee bytes (modo binario seguro) hasta length o EOF.
- `fgets($handle [, $length])`: lee una línea de texto.

### Escritura
- `fwrite($handle, $string [, $length])` (o `fputs`, alias): escribe bytes.

### Cierre
- `fclose($handle)`: cierra el puntero.

### Atajos (muy examinables)
- `file_get_contents($filename, ...)`: copia fichero completo a string; mapeo a memoria; mejor rendimiento; se usa también para consumir servicios web.
- `file_put_contents($filename, $data, ...)`: equivalente a `fopen + fwrite + fclose`.

### Otras funciones de archivo (listado rápido)
- `fgetss`: lee línea y elimina etiquetas PHP/HTML.
- `fgetcsv`: analiza línea como CSV.
- `readfile`: lee e imprime en buffer de salida (abre–imprime–cierra).
- `file`: lee y devuelve array (una línea por elemento).
- `fgetc`: un carácter.
- `file_exists`, `filesize`, `unlink`.
- `rewind`, `fseek`, `ftell`.
- `flock`: bloqueos (`LOCK_SH`, `LOCK_EX`, `LOCK_UN`, `LOCK_NB`).

### Problemas de archivos planos (por qué preferir BD)
- Con archivos grandes: más lento.
- Búsqueda complicada.
- Accesos simultáneos → cuellos de botella.
- Procesamiento secuencial; acceso aleatorio implica cargar todo y reescribir.
- Dificultad de permisos por nivel.
- Seguridad.

---

## Tema 8 — SGBD + PHP y MySQL/MariaDB

### Archivos vs SGBD: ventajas del SGBD
- Acceso más rápido.
- Consultas más fáciles.
- Accesos simultáneos.
- Acceso aleatorio.
- Privilegios/permisos.
- Mejor seguridad.

### Arquitectura PHP + MySQL (idea)
- Petición a `*.php` → intérprete en servidor ejecuta PHP → puede acceder a MySQL → genera HTML y lo devuelve.

### MySQLi (biblioteca principal en PHP para MySQL)
- **MySQLi** = MySQL Improved.
- Interfaz dual: procedimental y orientada a objetos.
- Soporta **sentencias preparadas**, múltiples declaraciones, transacciones, depuración mejorada, servidor empotrado.

### Conexión / seleccionar BD / consultar / insertar / cerrar (lo que cae)
- Conexión: `new mysqli(host, usuario, contraseña, basedatos)` y revisar `connect_errno` / `connect_error`.
- Seleccionar BD: `mysqli::select_db("agenda")`.
- Consultar: `mysqli::query($sql)` → devuelve un objeto de resultados; `num_rows` indica número de filas.
- Insertar seguro con preparados:
  - `mysqli::prepare("INSERT ... VALUES (?,?,?)")`
  - `bind_param('sss', $_POST["dni"], ...)`
  - `execute()`
  - `affected_rows` filas agregadas
  - `close()` (statement) y `db->close()` (conexión)
- Cierre/limpieza:
  - liberar conjunto resultados: `$resultado->free()`
  - cerrar conexión: `$db->close()`

### PDO (idea de examen)
- “Interfaz genérica” para BD: te permite conectar a distintos SGBD con una API común (concepto).

### XAMPP (pregunta modelo)
- Entorno local para trabajar con **Apache, PHP y MariaDB**.

### Seguridad (TRAMPA CLÁSICA)
- Si SQL proviene de orígenes externos: usar **`mysqli::prepare`** para evitar inyección SQL directa.

---

# Chuleta final (lo que te salva el test)

- **Servidor estático**: devuelve recursos; **servidor dinámico**: ejecuta código + genera respuesta.
- Capas: **Vista** (UI, HTML/CSS/JS, PHP), **Negocio** (reglas), **Datos** (persistencia, CRUD).
- PHP: interpretado en servidor, genera HTML; `.` concatena; `phpinfo()` **no público**.
- Superglobales: `$_GET`, `$_POST`, `$_FILES`, `$_SESSION`… (arrays asociativos).
- Archivos: `fopen` modos `r/w/a/x` + `b`; `file_get_contents`/`file_put_contents`.
- BD: mejor que archivos planos por concurrencia, consultas, permisos y seguridad.
- MySQLi: `new mysqli`, `select_db`, `query`, `prepare/bind_param/execute`, `free`, `close`.
- XAMPP: Apache + PHP + MariaDB.

---

# Mini-test (estilo examen) — 20 preguntas de Servidor/PHP

1) Un servidor web **estático**…  
A) ejecuta lógica de negocio siempre  
B) actúa como “directorio” devolviendo recursos solicitados  
C) necesita siempre una base de datos  
D) solo sirve JSON  
E) cifra siempre con TLS

2) Un servidor web **dinámico**…  
A) no devuelve HTML  
B) devuelve solo recursos alojados  
C) ejecuta código y genera dinámicamente la respuesta  
D) no puede acceder a archivos  
E) no tiene lógica de negocio

3) La capa **Vista/Presentación** suele contener:  
A) solo SQL  
B) interfaz y punto de conexión con el usuario (HTML/CSS/JS)  
C) solo reglas de negocio  
D) solo persistencia  
E) solo sockets

4) La capa **Datos** se encarga de:  
A) renderizar HTML  
B) reglas de negocio  
C) gestionar datos persistentes y operaciones CRUD  
D) eventos del DOM  
E) cifrado TLS

5) PHP se ejecuta principalmente:  
A) en el cliente  
B) en el servidor  
C) en la tarjeta gráfica  
D) dentro de CSS  
E) dentro de XML Schema

6) Bloques PHP se delimitan por:  
A) `<script>`  
B) `<?php ... ?>`  
C) `{ ... }`  
D) `<!-- -->`  
E) `<!DOCTYPE>`

7) El operador de concatenación en PHP es:  
A) `+`  
B) `&`  
C) `.`  
D) `::`  
E) `=>`

8) `phpinfo()`…  
A) solo imprime “Hola”  
B) devuelve versión y configuración (peligroso dejarlo público)  
C) cifra la conexión  
D) crea una base de datos  
E) valida HTML

9) Tipos escalares de PHP:  
A) array, object  
B) boolean, integer, float, string  
C) null, resource  
D) callable, iterable  
E) DOM, SOAP

10) Una **superglobal** es:  
A) una variable local  
B) una constante  
C) un array especial disponible sin declarar  
D) un objeto de BD  
E) un evento JS

11) `$_GET` es:  
A) cookie  
B) superglobal  
C) clase  
D) archivo en disco  
E) plantilla

12) `$_FILES` se considera:  
A) un entero  
B) un array asociativo  
C) un socket  
D) una cookie  
E) un JSON string

13) Para abrir un archivo y escribir al final (creándolo si no existe) usarías:  
A) `r`  
B) `w`  
C) `a`  
D) `x`  
E) `t`

14) `w` en `fopen`…  
A) coloca puntero al final  
B) coloca puntero al inicio y vacía el archivo  
C) no crea archivos  
D) solo lectura  
E) bloquea siempre

15) `file_put_contents` equivale conceptualmente a:  
A) `fopen+fgets+fclose`  
B) `fopen+fwrite+fclose`  
C) `fopen+fread`  
D) `unlink+fclose`  
E) `ftell+rewind`

16) Problema típico de archivos planos (vs SGBD):  
A) acceso aleatorio fácil  
B) permisos finos sencillos  
C) cuellos de botella con accesos simultáneos  
D) consultas SQL más potentes  
E) más seguridad

17) MySQLi es:  
A) un evento de JS  
B) una clase/conexión para trabajar con MySQL desde PHP  
C) un estándar W3C  
D) un protocolo  
E) un tipo de dato

18) `mysqli::query` devuelve:  
A) un boolean siempre  
B) un objeto de resultados  
C) un archivo  
D) un evento  
E) un JSON

19) Si SQL viene de orígenes externos, se recomienda:  
A) concatenar strings sin más  
B) usar `mysqli::prepare` para evitar inyección SQL  
C) usar `echo`  
D) usar `phpinfo`  
E) usar `unlink`

20) XAMPP es:  
A) un navegador  
B) un entorno local con Apache, PHP y MariaDB  
C) un estándar ISO  
D) un plugin de Flash  
E) un lenguaje de marcado

**Respuestas**: 1B, 2C, 3B, 4C, 5B, 6B, 7C, 8B, 9B, 10C, 11B, 12B, 13C, 14B, 15B, 16C, 17B, 18B, 19B, 20B
