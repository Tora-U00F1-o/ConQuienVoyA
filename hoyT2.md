# SEW (Software y Estándares para la Web) — Apuntes para examen tipo test  
Basado en los PDFs de **Computación Web**, **Lenguajes de Script**, **JavaScript** y **Tecnologías relacionadas**, más controles/preguntas modelo (cliente, accesibilidad y usabilidad).

> Idea para estudiar tipo test: céntrate en **definiciones exactas**, “**puerto por defecto**”, “**sin estado**”, y frases tipo **siempre / nunca** (suelen ser trampas).

---

## Tema 1 — Computación en la Web

### 1) Computación en cliente vs servidor
- **Cliente (front-end)**: el cliente hace una **petición HTTP** y recibe una **respuesta HTML**; la “computación” ocurre en la **máquina cliente** a partir del HTML.
- **Servidor (back-end)**: el cliente hace la petición; **en el servidor** se realiza la computación; el servidor devuelve el resultado al cliente (normalmente en HTML).

### 2) ¿Qué es un servidor Web?
- Programa que **procesa peticiones HTTP** y **envía respuestas HTTP**.

### 3) TCP/IP (muy preguntable)
- **TCP/IP** = conjunto de reglas/protocolos para comunicarse en redes (Internet).
- **IP**: obtiene la **dirección** a la que se envían los datos.
- **TCP**: se encarga de la **entrega** de los datos una vez se conoce la IP.

### 4) HTTP
- Protocolo de nivel de aplicación (arquitectura web): **Petición / Respuesta**.
- **Puerto por defecto**: **80**.
- **HTTP es “sin estado” (stateless)**: cada petición no está influenciada por transacciones previas.

**Trampa típica**: “HTTP mantiene el estado alcanzado por peticiones previas” → FALSO.

### 5) HTTPS
- Extensión de HTTP para comunicaciones seguras.
- Cifrado con **SSL/TLS**.
- **El nivel de cifrado depende del servidor remoto y del navegador del cliente**.
- **Puerto estándar**: **443**.

### 6) Tipos de computación en el cliente (en HTML)
En una página HTML puedes “traer” computación al cliente con:
- **<object> / <embed>** (plug-ins / recursos externos)
- **<script>** (código interpretado por el navegador)

### 7) <object> y <embed> — Pros/Contras (examen)
**Ventajas**:
- Reduce carga en servidor.
- Reduce ancho de banda en el momento de la computación.
- Se descarga una vez y luego se ejecuta localmente (si queda instalado).

**Inconvenientes** (ojo: aquí suelen preguntar “por qué NO es recomendable”):
- Dependencia de capacidades del cliente.
- Necesidad de instalar plug-ins.
- **Riesgos de seguridad** (plug-ins maliciosos, malware…).
- Restricciones por administradores / usuarios sin permisos.
- Puede no garantizarse accesibilidad.
- **Mala idea** distribuir un plug-in propio (salvo grandes empresas: falta de confianza).

### 8) ActiveX / Applets / Flash / Silverlight (histórico + seguridad)
- **ActiveX**: tecnología Microsoft (Internet Explorer), ejecutables descargados al cliente; “pueden hacer cualquier cosa” ⇒ **gran riesgo de seguridad**. Hoy **no compatible** con navegadores modernos.
- **Java applets**: etiqueta `<applet>` está *deprecated*; se sustituyó por `<object>`. Hoy los applets **ya no se pueden usar directamente** en navegadores modernos.
- **Flash**: retirado (fin oficial en 2020) y bloqueado por navegadores.
- **Silverlight**: descontinuado (2021).

### 9) <script> (computación “normal” hoy)
- Incluye código (habitualmente un dialecto de **ECMAScript**) que interpreta/ejecuta el navegador.
- No requiere instalar plug-ins.
- El código fuente es visible (idea clásica: reduce riesgo de “caja negra” en el cliente).
- Históricamente se asoció a **DHTML**.

---

## Tema 2 — Lenguajes de Script y estándares

### 1) ECMAScript
- ECMAScript es el estándar base del que derivan dialectos usados en navegadores.
- Recomendación típica de compatibilidad: usar características estándar y evitar extensiones propietarias.

### 2) Versiones “clásicas” que suelen caer
- **ES3 (1999)**: regex, mejoras de strings, control de flujo, excepciones `try/catch`, etc.
- **ES4**: *desechada*.
- **ES5 (2009)**: aclara ambigüedades, añade getters/setters, soporte de JSON…
- **ES5.1 (2011)**: modo estricto.
- **ES6 / ES2015 (2015)**: clases, módulos, iteradores, generadores, etc.

> Consejo test: si preguntan “¿ES4 existe como versión estándar?” → respuesta típica: **no, se desechó**.

### 3) TypeScript (qué afirmar en test)
- Lenguaje con **comprobación de tipos** (tipado) y pensado para mejorar robustez.
- Se “traduce/compila” a JavaScript para ejecutarse donde se ejecute JS.

### 4) WebAssembly (Wasm)
- Formato **binario** (máquina de pila) para ejecución rápida en web.
- No es un dialecto de JavaScript ni “genera JavaScript” en general: se ejecuta aparte y complementa a JS.

---

## Tema 3 — El lenguaje JavaScript (lo más preguntable)

### 1) Objetos “del navegador” y depuración
- `window`: objeto predefinido (raíz en navegador).
- `console` pertenece a `window` y se usa para depurar (`console.log`, etc.).
- `navigator.userAgent`: típico para “nombre del agente de usuario”.

### 2) Variables: ámbito y tiempo de vida
- Variables dentro de una **función** → suelen ser **locales** a la función (ámbito: dentro de la función).
- `const`: en test suele aparecer como “las constantes tienen **ámbito local a un bloque**”.

### 3) Operadores (clásico)
- `===` compara **tipo y valor**.

### 4) Prototipos (pregunta directa)
- `prototype`: permite modificar objetos añadiendo métodos y propiedades **en tiempo de ejecución**.

### 5) Modelo de eventos (preguntas “¿para qué elemento está definido?”)
- Evento = acontecimiento provocado por usuario o sistema, gestionado por un **gestor de eventos**.
- Tabla típica:
  - `onload`: `<body>`
  - `onunload`: `<body>`
  - `onsubmit`: `<form>`
  - `onchange`: `<input>`, `<select>`, `<textarea>`
  - `onclick`: todos los elementos HTML
  - `onmousedown`: todos los elementos HTML
  - `onblur`: `<button>`, `<input>`, `<label>`, `<select>`, `<textarea>` y `<body>` (según preguntas modelo)

### 6) Funciones flecha (trampa de test)
- En controles aparece: “**deben declararse antes de ser usadas**” (por cómo se suelen usar como expresiones asignadas a variables).

---

## Tema 4 — Tecnologías y recursos relacionados con JavaScript

### 1) AJAX
- “JavaScript Asíncrono y XML”.
- Usa el objeto predefinido **`XMLHttpRequest`** para comunicación asíncrona.
- Puede cargar del servidor: XML, JSON y texto.

**Ventajas**:
- Aumenta usabilidad (sensación tipo app de escritorio, menos recargas).
- Rapidez percibida, menos carga en servidor, menos ancho de banda.

**Inconvenientes** (súper preguntables):
- “Desaparece” el botón atrás tal como el usuario lo espera.
- Problemas con buscadores (indexación), permalinks y favoritos.
- Dependencia de carga/latencia.
- **Problemas de accesibilidad** para personas con necesidades especiales.

### 2) HTML5 + JavaScript (script loading)
- Etiqueta `<script>`: atributos:
  - `async=true` ejecuta de forma asíncrona mientras se parsea la página.
  - `defer=true` (con `async=false`) ejecuta al terminar de cargar.
  - Si `async=false` y `defer=false`: ejecuta inmediatamente y bloquea el parsing.

### 3) JSON en HTML5/JS
- JSON = **formato de texto** para intercambio de datos.
- Dos estructuras: objeto (pares nombre:valor) y array (lista ordenada).
- Clásico: `JSON.parse()` y `JSON.stringify()`.
- Se usa mucho como Open Data.

### 4) API Geolocation / WebGL (HTML5)
- Geolocation: dentro del estándar W3C (según controles).
- WebGL: permite crear gráficos **3D**.

---

## Seminarios — Usabilidad y Accesibilidad (preguntado en test)

### 1) Usabilidad: ideas “de examen”
- Favorecer la usabilidad:
  - **Incluir un buscador**.
  - **Indicar dónde estamos** (guía de navegación).
- Home: evitar “bienvenidas obligatorias”, autobombo o vídeos obligatorios.
- Metáfora del semáforo: usar **colores y etiquetas**.
- Rollovers/carruseles de menú: en preguntas modelo se consideran **poco usables**.
- “Navegación constante o global”: conjunto de elementos que aparecen en **todas** las páginas del sitio.

### 2) Pruebas de usabilidad (conceptos de control)
- Deben hacerse con usuarios que **no necesitan experiencia en informática**.
- El equipo de desarrollo: observar y **no interferir**.
- El número de rondas/tandas **no es fijo**.

### 3) Accesibilidad (ideas clave de examen)
- “Usabilidad Universal” (en control) se toma como **otra definición de accesibilidad**.
- WAI / WCAG: “última versión en desarrollo” → **3.0** (según control).
- Barrera típica visión reducida: **pérdida de contexto al ampliar**.
- Diseño accesible:
  - Fuentes: unidades relativas (`em`, `rem`, `ex`).
  - Imágenes: unidades relativas (`%`, `vw`, `vh`).
- SWML: siglas de **SignWriting Markup Language**.

---

## Chuleta de 20 segundos
- HTTP: puerto **80**, petición/respuesta, **sin estado**.
- HTTPS: SSL/TLS, puerto **443**, cifrado depende de servidor + navegador.
- TCP/IP: IP “busca” dirección; TCP “entrega”.
- `<object>/<embed>`: plug-ins, **riesgo seguridad** + accesibilidad.
- `<script>`: sin plug-ins; `async/defer` afecta a ejecución/parsing.
- `===`: tipo + valor.
- `prototype`: añade métodos/propiedades en runtime.
- `navigator.userAgent`: nombre agente usuario.
- `console` pertenece a `window`.

---

# Mini-test (estilo examen) — 35 preguntas

Marca la opción correcta (A–E). Respuestas al final.

## Bloque A — Protocolos y computación web
1) HTTP es:  
A) físico  B) aplicación  C) marcado  D) cifrado  E) framework

2) Puerto por defecto de HTTP:  
A) 21  B) 22  C) 80  D) 443  E) 8080

3) Puerto estándar de HTTPS:  
A) 80  B) 443  C) 53  D) 25  E) 110

4) HTTP “sin estado” significa:  
A) guarda cookies siempre  
B) guarda sesiones automáticamente  
C) cada petición no depende de transacciones previas  
D) solo usa GET  
E) cifra siempre

5) En TCP/IP, IP se encarga de:  
A) cifrar  B) comprimir  C) obtener dirección destino  D) parsear HTML  E) renderizar CSS

6) `<object>`/`<embed>`:  
A) sin recursos externos  
B) recursos externos/plug-ins con riesgos  
C) solo HTML4  
D) solo CSS  
E) equivalente a `<meta>`

7) Desventaja típica de `<object>/<embed>`:  
A) no ejecuta en cliente  
B) más carga en servidor  
C) requiere plug-ins y tiene problemas de seguridad  
D) impide multimedia  
E) obliga ES6

8) ActiveX:  
A) recomendado por seguridad  
B) Microsoft+IE; hoy no compatible con navegadores modernos  
C) extensión W3C HTML5  
D) lo mismo que JSON  
E) API Android

## Bloque B — TypeScript / Wasm / JSON
9) TypeScript:  
A) dialecto sin tipos  
B) añade comprobación de tipos y se traduce a JS  
C) solo IE  
D) reemplaza JS  
E) estándar W3C

10) WebAssembly:  
A) dialecto de JS  
B) formato binario (máquina de pila) complementario a JS  
C) dialecto de CSS  
D) lenguaje de marcado  
E) solo accesibilidad

11) JSON es:  
A) binario  
B) texto independiente del lenguaje (objetos/arrays)  
C) exclusivo de Java  
D) protocolo  
E) XML

## Bloque C — JavaScript
12) `===` compara:  
A) valor  B) tipo  C) tipo y valor  D) siempre referencia  E) siempre string

13) `prototype` sirve para:  
A) desactivar eventos  
B) añadir métodos/propiedades en runtime  
C) cifrar  
D) crear CSS  
E) validar XML

14) `navigator.userAgent`:  
A) nombre del agente de usuario  
B) puerto HTTP  
C) HTML parseado  
D) CSS calculado  
E) IP servidor

15) `console` pertenece a:  
A) document  B) navigator  C) window  D) XMLHttpRequest  E) JSON

16) `onload` típicamente para:  
A) form  B) body  C) meta  D) head  E) link

17) `onsubmit` para:  
A) body  B) form  C) img  D) select  E) a

18) `onchange` para:  
A) input/select/textarea  B) body  C) div  D) form  E) p

## Bloque D — Ajax / HTML5 APIs
19) AJAX usa principalmente:  
A) window  B) document  C) XMLHttpRequest  D) navigator  E) console

20) Ventaja típica de AJAX:  
A) más recargas  
B) menos usabilidad  
C) sensación de app y menos esperas  
D) obliga plug-ins  
E) no funciona con REST

21) Inconveniente típico de AJAX:  
A) mejora accesibilidad siempre  
B) “botón atrás” deja de funcionar como se espera + problemas de accesibilidad  
C) solo XML  
D) solo JSON  
E) obliga puerto 443

22) `async=true` en `<script>` implica:  
A) bloquea siempre  
B) asíncrono mientras se parsea  
C) solo al final  
D) solo con CSS  
E) prohíbe carga externa

23) Geolocation (HTML5):  
A) API Google Maps  
B) fuera del estándar  
C) dentro del estándar W3C (según controles)  
D) solo con jQuery  
E) plugin

24) WebGL (HTML5):  
A) drag&drop  B) gráficos 3D  C) streaming  D) XML→JSON  E) validar CSS

## Bloque E — Usabilidad / Accesibilidad
25) Favorecer usabilidad:  
A) tablas maquetación  B) iframes  C) buscador  D) popups  E) vídeo obligatorio

26) Guiar al usuario:  
A) cambiar colores cada página  B) indicar dónde estamos  C) popups  D) ocultar navegación  E) quitar menú

27) Metáfora semáforo:  
A) solo colores  B) colores y etiquetas  C) no existe  D) solo etiquetas  E) animaciones

28) Usabilidad Universal (control):  
A) caso adaptabilidad  B) otra definición de accesibilidad  C) autoajuste resolución  D) ninguna  E) solo móviles

29) WCAG “última versión en desarrollo” (control):  
A) 1.0  B) 2.0  C) 2.2  D) 3.0  E) 4.0

## Respuestas
1B, 2C, 3B, 4C, 5C, 6B, 7C, 8B,  
9B, 10B, 11B,  
12C, 13B, 14A, 15C, 16B, 17B, 18A,  
19C, 20C, 21B, 22B, 23C, 24B,  
25C, 26B, 27B, 28B, 29D
