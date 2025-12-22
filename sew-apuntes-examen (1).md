# SEW — Apuntes de examen (teoría tipo test)
**Grado en Ingeniería Informática del Software**  
**Asignatura:** Lenguajes y estándares para la Web (SEW)  
**Formato:** apuntes de repaso orientados a examen tipo test

> Estos apuntes condensan los *Temas 1–4* (Computación en la Web, Lenguajes de Script, JavaScript, y Tecnologías relacionadas con JavaScript) y refuerzan con preguntas reales de controles (HTML/CSS, XML, Usabilidad/Accesibilidad y Computación en el Cliente).

---

## Cómo estudiar (rápido)
- Lee cada sección “Idea clave” y “Pregunta típica”.  
- Memoriza definiciones y pares “concepto ↔ término/etiqueta”.  
- Repasa las notas “**Ojo examen**” (preguntas trampa frecuentes).  
- Haz los mini–tests al final de cada bloque.

---

## Tema 1 — Computación en la Web (resumen de teoría)

### Sitios **estáticos** vs **dinámicos**
- **Estáticos**: solo HTML, sin computación; contenido fijo; muy seguros/estables, baratos. Ideales para “quiénes somos”, etc.
- **Dinámicos**: la página se **genera en el momento**; depende de *quién* y *cuándo* la solicite (noticias, tiempo…). Requiere **computación** (cliente/servidor) y, a menudo, **BD**.
- **Ventajas dinámicos**: **flexibilidad** (se adapta al cliente) y **eficiencia** (no necesitas datos locales).
- **Cómo generar dinámico**:
  - **Cliente**: `<object>`, `<embed>`, `<script>`.
  - **Servidor**: CGI; lenguajes/entornos como **PHP**, **ASP**, **JSP**, **Node.js**; **Servicios Web/REST**.

**Pregunta típica**  
- “Un sitio estático…” → *no ejecuta computación, información fija.*  
- “La generación dinámica…” → *contenido se crea al solicitarlo, puede variar por usuario/tiempo.*

---

### Computación **en el cliente** vs **en el servidor**
- **Cliente (front‑end)**: el servidor responde con **HTML/JS/CSS** y **el navegador ejecuta** la lógica.  
- **Servidor (back‑end)**: la lógica se ejecuta en el servidor; devuelve HTML/JSON/etc.

**`<object>` / `<embed>`** (cliente): historicamente usados para integrar objetos/plugins (Flash, ActiveX…). **No se recomiendan por seguridad.**  
**`<script>`** (cliente): ejecuta JavaScript incluido o enlazado.

**Pregunta típica**  
- “¿Qué etiqueta se usa para computación del lado del cliente?” → *`<script>`*  
- “¿Por qué no se aconseja `<object>`?” → *por seguridad*.

---

### Protocolos
- **TCP/IP**: pila base de Internet.  
- **HTTP/HTTPS**: protocolo de aplicación para la Web; **HTTPS** añade **cifrado** y **autenticación** (TLS).

**Pregunta típica**  
- “¿TCP/IP son protocolos?” → *Sí.*  
- “¿IP obtiene la IP del destino?” → *Sí.*

---

## Tema 2 — Lenguajes de Script

### ¿Para qué sirven?
Interfaces interactivas (menús/botones), validación de formularios, cálculos, personalización, manipulación del DOM, juegos/calculadoras, geolocalización/mapas, consumo de **Servicios Web**, etc.

### Estándar **ECMAScript**
- **ECMAScript** es el estándar de los **lenguajes de script**; **JavaScript** es su dialecto más extendido.
- Implementaciones, dialectos, extensiones, preprocesadores (transpiladores).  
- **WebAssembly**: binario portable que complementa a JS para cómputo intensivo.

**Pregunta típica**  
- “ECMAScript es estándar de…” → *los lenguajes de Script.*

---

## Tema 3 — El lenguaje **JavaScript** (JS)

### Generalidades
- **Estructurado, funcional y orientado a objetos**.
- **Basado en prototipos** (y clases modernas); **dinámico** (tipos en tiempo de ejecución); **interpretado**.
- Objetos predefinidos: `window`, `document` (DOM), `navigator`, `console`, `String`, `Number`, `Date`, `Array`, `Math`, etc.

**Métodos comunes (muy preguntados)**  
- `String.length`, `String.replace`, `String.toUpperCase()`  
- `Date.getDate()/getMonth()/getFullYear()`, `getDay()/getHours()/getMinutes()/getSeconds()`  
- `Array.sort()/concat()`  
- `Math.round()/max()/min()/sin()`, constante `Math.PI`

**Pregunta típica**  
- “JS es *case‑sensitive*?” → *Sí.*  
- “¿Dónde se coloca `<script>`?” → *En `<head>`, en `<body>`, tras el elemento al que referencia, o en archivo externo.*

---

### Organización del código y POO
- **Separación de archivos**: contenido (`.html`), presentación (`.css`), computación (`.js`).  
- **Clases y objetos** (ES6+); preferir **vanilla JS** en la asignatura salvo indicación.

**Pregunta típica**  
- “¿Se permiten bibliotecas externas en prácticas?” → *No, salvo que se indique lo contrario.*

---

### Eventos, arrays, colecciones y utilidades
- **Modelo de eventos**: elementos HTML disparan eventos; se registran manejadores.  
- **Funciones**: pueden tener varios `return`; **anónimas y de flecha** (ojo con las preguntas del banco).  
- **`apply`**: invoca función con `this` y **array de argumentos**.  
- **Arrays**: soporte de **estáticos y dinámicos**; pueden ser **heterogéneos** y **dispersos**.  
- **`Map`/`Set`**: correspondencias y conjuntos.  
- **Expresiones regulares**, **excepciones**, **promesas**, **referencias débiles**.

**Ojo examen**  
- Aparece *prototype* y su semántica. Repasa bien cómo funcionan las **propiedades `prototype` de las funciones constructoras** y la **cadena de prototipos**.

---

### DOM y DHTML (muy frecuentes)
- `document` representa el **árbol DOM**; crear/insertar nodos con `createElement`, `appendChild`, `insertBefore`, etc.
- DHTML = HTML + CSS + JS (interactividad sin recargar).

**Mini‑test**  
1) `document.body.insertBefore(h1, document.body.firstChild)` → *inserta un `<h1>` al inicio del `<body>`*  
2) `$("p").hide()` en jQuery → *oculta todos los `<p>`*

---

## Tema 4 — Tecnologías y recursos relacionados con JS

### jQuery
- **Qué es**: biblioteca JS para **seleccionar DOM**, **manejar eventos**, **efectos/animaciones**, **manipular CSS** y **facilitar Ajax**. Compatible con Firefox/Edge/Safari/Opera/Chrome. Extensible vía **plugins**.
- **Configurar**: incluir un **único archivo** `jquery-x.y.z.min.js` local o vía **CDN** (`code.jquery.com`, `ajax.googleapis.com`). Se recomienda usar atributos de **integridad (SRI)** (`integrity=...`) y `crossorigin`.
- **Patrón básico**: `$(document).ready(function(){ ... })`  
- **Selectores** (muestras): `"*"`, `"#id"`, `".clase"`, `"p:first"`, `"tr:even"`, combinaciones.  
- **Algunos métodos**: `.hide()/.show()`, `.css()`, `.click(handler)`…

**Preguntas típicas**  
- “`css()` sirve para…” → *obtener, definir o establecer propiedades CSS.*  
- “Ventajas de jQuery” → *compatibilidad entre navegadores, plugins, efectos/animaciones.*

### Ajax
- Técnica para **comunicar** cliente‑servidor sin recargar página; datos frecuentes: **JSON**, **XML**, **texto**.

### HTML5 (APIs)
- APIs de navegador (p.ej., geolocalización), nuevos elementos semánticos, etc.

---

## Repaso — **HTML y CSS** (controles)
- Listas: **`<ul>`, `<ol>`, `<dl>`** (y elementos internos).  
- Especificidad (patrón **IDs > clases/atributos > elementos**). Ej.: `a[accesskey]` → 0-1-1.  
- Tres formas de aplicar CSS: **inline**, **interna** (`<style>`), **externa** (`<link rel="stylesheet">`).  
- Prefijos *vendor*: **`-moz-`** (Firefox), `-webkit-` (WebKit), etc.

**Mini‑test**  
- “¿Qué prefijo de CSS usa Firefox?” → *`-moz-`*.

---

## Repaso — **XML** (controles)
- **Espacios de nombres**: evitan **homonimia** en etiquetas (prefijos/URIs).  
- **SVG**: *vocabulario XML*, *estándar W3C*, *gráficos vectoriales*.  
- **KMZ**: archivo **KML** empaquetado con **ZIP**.  
- **XPath**: `//X[last()][@Y="Z"]` → *últimos descendientes `X` con atributo `Y="Z"`*.  
- **`<xs:all>`**: elementos complejos **no ordenados**; pueden aparecer **en cualquier orden**.  
- **XSLT en navegadores actuales**: **no asumas compatibilidad directa** en las últimas versiones.

---

## Repaso — **Usabilidad & Accesibilidad** (seminarios)
- Metáfora de **semáforo**: *colores **y** etiquetas* (no solo color).  
- **Rollovers/carruseles de menú**: **no** ahorran espacio ni son “muy usables” → evitar.  
- **Favorecer usabilidad**: incluye **buscador**, muestra **dónde estoy** (miguitas/indicadores), no cambies estilos cada página ni uses pop‑ups intrusivos.
- **Accesibilidad**:  
  - **SWML**: *SignWriting Markup Language* (no “lenguaje de signos” en sí).  
  - **Usabilidad Universal** ~ otra **definición de accesibilidad**.  
  - Barreras de **visión reducida**: pérdida de **contexto** al ampliar, etc.  
  - Personas **sordociegas**: existen **dispositivos** y **normativa** que lo contemplan.

---

## Repaso — **Pruebas de Usabilidad**
- **Número de rondas**: **no** hay número fijo.  
- **Usuarios de prueba**: no necesitan ser expertos en informática ni del equipo.  
- El equipo de desarrollo: **conoce usabilidad**, **observa** a usuarios y **no interfiere**.  
- Rol de la **persona observadora**: anotar reacciones, cronometrar tareas, registrar cómo piensa el usuario.

---

## Banco de **preguntas tipo test** (resumen rápido)
> Úsalas para auto‑evaluarte. Están extraídas de controles y recopilatorios.

- `===` compara **tipo y valor** en JS.  
- **ECMAScript** es el **estándar** de los lenguajes de **script**.  
- **XML**: estándar de **transferencia de datos** (enfoque típico).  
- **onclick** es el evento que se lanza al pulsar.  
- `mysqli::prepare()` se usa para **consultas preparadas** (evitar inyección, seguridad).  
- **MariaDB** es compatible con **MySQL** (en XAMPP lo sustituye desde 5.5.30).  
- `navigator.userAgent` obtiene el **agente de usuario**.  
- **`<base>`**: establece URL base; **no** todos los HTML “se basan” en ella.  
- **Servicios Web**: no son *un estándar único*; suelen usar HTTP; intercambio JSON/XML.  
- JS **arrays**: soportan estáticos/dinámicos; pueden ser heterogéneos/dispersos.  
- **`apply()`**: invoca con `this` y **array** de argumentos.  
- jQuery `.css()` **lee**/**define**/**establece** propiedades CSS.  
- `<object>` **no recomendado** por **seguridad**.

> **Sugerencia**: crea tarjetas tipo *flashcards* con estas preguntas y alterna con mini‑tests de 10–15 ítems.

---

## Checklist final (antes del test)
- Diferencias clave **estático** vs **dinámico** y **cliente** vs **servidor**.  
- Etiquetas **`<script>` / `<object>` / `<embed>`** y sus usos.  
- Qué es **ECMAScript** y su relación con **JavaScript**.  
- **Eventos**, **DOM**, **arrays**, `apply`, `Map/Set`, **excepciones**.  
- jQuery: **selectores**, `.ready()`, `.css()`, `.hide()/.show()`, CDN e **integridad**.  
- HTML/CSS: **listas**, **especificidad**, **formas de aplicar CSS**, **prefijos**.  
- XML: **namespaces**, **SVG**, **KMZ**, **XPath `last()`**, **`<xs:all>`**, nota sobre **XSLT**.  
- Usabilidad/Accesibilidad: **semáforo**, **buscador**, **“dónde estoy”**, **SWML**, **usuarios y observadores** en pruebas.

---

**¡Ánimo!** Practica preguntas y repasa definiciones cortas la víspera del examen.
