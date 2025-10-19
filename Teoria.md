# SEW — Apuntes de **Teoría** (estudio orientado a examen tipo test)
_Grado en Ingeniería Informática del Software — Software y Estándares para la Web_  
**Fuente:** 01-Diseño con estándares, 02-Lenguajes de marcado, 03-HTML5, 04-CSS — Conceptos.

> 🎯 Objetivo: condensar definiciones, fechas clave, “reglas del profe” y trampas típicas tipo test. Memoriza las **palabras exactas** (p. ej., *niveles* en CSS, no “versiones”) y las **obligaciones** (DOCTYPE, `lang`, `charset`, `rel` en `<link>`, CSS externo, etc.).

---

## 1) Diseño con estándares y W3C (visión general)
### Historia y actores
- **La Web (1989)**: Tim Berners‑Lee (CERN) crea **HTML, HTTP, servidor y navegador**. W3C se funda en **1994** para estandarizar la Web.  
- **Organismos**: **W3C** (estándares Web), **WHATWG** (HTML “living standard”), **ECMA** (ECMAScript/JS), **Khronos** (WebGL).  
- **MOU 28/05/2019**: W3C y WHATWG acuerdan versiones “únicas” para **HTML** y **DOM** (especificaciones vivas).

### ¿Por qué estándares?
- **Abiertos** (sin licencias/patentes), **compatibles** (“no rompas la web”), **accesibles**, **seguros** y **SEO friendly**.  
- **Buenas prácticas**: validadores (HTML/CSS), internacionalización (idiomas, codificación), accesibilidad (**WCAG**).

### Conceptos clave del ecosistema
- **Cliente web**: cualquier dispositivo con navegador (agente de usuario).  
- **Servidor web**: atiende peticiones (HTTP/HTTPS), puede tener **capas** (presentación/negocio/datos).  
- **Frontend** (HTML, CSS, JS), **Backend** (p. ej. PHP), **Full‑Stack** = ambos.  
- **Navegador**: UI, motor de render, analizador, intérprete JS, **árbol DOM**.  
- **Estándares de diseño** (8): simplicidad, jerarquía visual, navegabilidad, consistencia, capacidad de respuesta (**responsive**), accesibilidad, convencionalidad, credibilidad.

---

## 2) Lenguajes de marcado (SGML → HTML/XHTML → HTML5)
### SGML
- Metalenguaje (ISO **8879:1986**). Demasiado complejo para la Web.

### Evolución HTML
- **1991**: primeras *HTML Tags* (subconjunto de SGML).  
- **HTML 2.0** (1995, RFC 1866); **HTML 3.2** (1997); **HTML 4.01** (1999, corrige errores y fomenta CSS/scripting/accesibilidad).  
- Problemas de interoperabilidad por proliferación de elementos “de navegador”.

### XHTML
- **Familia** de tipos de documento con semántica de **HTML 4** pero sintaxis **XML** (XHTML 1.0 en 2000, 1.1 en 2001). Se cerró el grupo **XHTML2** en 2010.

### HTML5 y el acuerdo W3C–WHATWG
- **2004**: nace WHATWG. **2007**: W3C adopta su propuesta.  
- **28/10/2014**: HTML5 Recomendación.  
- **28/05/2019**: **MOU** W3C–WHATWG → estándar “vivo” para **HTML** y **DOM**.

---

## 3) HTML5 práctico para el examen
### Estructura mínima y metadatos
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Título del documento</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Evita <style> interno salvo casos didácticos -->
  </head>
  <body>Contenido…</body>
</html>
```
- `<!DOCTYPE html>` → **imprescindible** (modo estándar).  
- `<html lang="es">` → **obligatorio** indicar idioma (ISO 639‑1).  
- En `<head>` siempre: **`<meta charset="utf-8">`** y **`<title>`** descriptivo (lo verás en la pestaña/historial).  
- `<link>`: **`rel` es obligatorio**; `href` apunta al recurso (p. ej. CSS).  
- `<base href="…">` fija **base para todas las URLs relativas** (precaución).  
- `<meta>`: `name`/`http-equiv`/`content`/`charset`/`media`.  
- `<style>` en documento → **desaconsejado** (en esta asignatura, **prohibido** frente a CSS externo).

### Sintaxis y reglas
- **Elementos**: `<p>…</p>` (preferible cerrar siempre, aunque algunas etiquetas permitan omitir cierre).  
- **Mayúsculas/minúsculas**: en HTML5 se recomienda **minúsculas**.  
- **Comentarios**: `<!-- ... -->` (mejoran comprensión).  
- **Atributos**: `nombre="valor"`; **comillas dobles**; **booleanos** sin valor (`disabled`, `checked`, …).  
- **Anidamiento correcto**: sin solapamientos (afecta a CSS y JS).

### DOM y manipulación
- El navegador **parsea** el documento y construye un **árbol DOM** (nodos de documento, elementos, texto, comentarios, etc.).  
- Cada elemento es un **objeto** manipulable vía **API DOM** (atributos, propiedades, eventos).

### Elementos frecuentes
- **Texto**: `p`, `pre`, `blockquote`, listas `ul/ol/li`, `dl/dt/dd`.  
- **Enlaces**: `a` (usar `href`, `title` descriptivo).  
- **Multimedia**: `img`, `audio`, `video` (con atributos adecuados).  
- **Tablas**: `table`, `thead/tbody/tfoot`, `tr`, `th`, `td`.  
- **Formularios**: `form`, `input`, `label`, `select`, `textarea`, `button`… (atributos semánticos).  
- **Secciones**: `header`, `nav`, `section`, `article`, `aside`, `footer`…

---

## 4) CSS — Conceptos fundamentales
### Qué es CSS y cómo evoluciona
- **CSS** describe la **presentación** de documentos (HTML/XML) en pantalla, papel, voz, etc.  
- **Niveles (levels)**, **no “versiones”**:  
  - **CSS1** (1996, obsoleto → usa CSS 2.1), **CSS2** (1998), **CSS 2.1** (2011), propuesta **CSS 2.2** (WD).  
  - **CSS3** = **módulos** sobre el **core** de CSS 2.1 (cada módulo progresa por niveles propios: p. ej., Selectors‑4, Color‑4).  
  - **“CSS4” no existe** como especificación monolítica (solo módulos nivel 4+).

### Principios de diseño CSS (objetivos)
Compatibilidad hacia atrás/adelante, independencia de dispositivo/plataforma, mantenibilidad, sencillez, rendimiento, flexibilidad, riqueza, localización, **accesibilidad**.

### Anatomía de una regla
```css
/* Selector + declaración(es) */
h2 { color: green; font-weight: bold; }
/* Agrupación de selectores y propiedades abreviadas (shorthand) */
h1, h2, h3 { font-weight: bold; }
/* Regla del reloj en shorthands (top, right, bottom, left) */
padding: 2em 3em 1em 4em; /* 4 valores */
padding: 2em 3em;         /* vertical horizontal */
```
- **Selector** → vincula HTML con el estilo.  
- **Declaración**: `propiedad: valor;` (una o varias).  
- **Shorthand**: cuidado con **redefiniciones** (el validador avisa).

### Cómo enlazar estilos (regla del curso)
- **Recomendado/Obligatorio**: **CSS externo** con `<link rel="stylesheet" href="…">`.  
- **Prohibido** en esta asignatura: **estilos inline** (`style="…"`) y **hojas incrustadas** en `<style>` (no separan contenido y presentación, peor mantenimiento/reutilización).
- Ventajas del CSS externo: **reutilización**, **mantenimiento**, **caché**, posibilidad de **varias hojas** y selección por el usuario.

### Modelo de caja (Box Model)
- Todo elemento se representa como **caja**: **contenido + padding + borde + margen**.  
- Conocer cómo afectan ancho/alto y cómo colapsan márgenes es clave para preguntas de test.

### Cascada, herencia y procesamiento
- **Cascada y herencia** determinan el **valor final** de cada propiedad en cada elemento (origen, importancia, especificidad, orden).  
- **Modelo de procesamiento** del agente de usuario (conceptual): parseo → DOM → medio de destino → recuperar hojas → calcular estilos → generar estructura de formato → representar.

---

## 5) “Trampas” típicas tipo test (de teoría)
- `<!DOCTYPE html>` **activa modo estándar** → **obligatorio**.  
- El atributo `lang` **se debe indicar** en `<html>`.  
- En `<link>` el atributo **`rel` es obligatorio**.  
- `<base href>` **afecta a todas** las URLs relativas del documento.  
- **Atributos booleanos**: se **usan sin valor** (`disabled`, `checked`), no `disabled="true"`.  
- HTML5 recomienda **minúsculas**; conviene **cerrar siempre** las etiquetas.  
- **Anidamiento incorrecto** (solapamientos) **es error** y afecta a CSS/JS.  
- **CSS usa “niveles”**, no versiones; **“CSS4”** no existe como estándar único.  
- **CSS externo** es la **opción correcta** para separación de responsabilidades; **inline** y `<style>` **penalizan** (en esta asignatura **prohibidos**).  
- **Shorthand**: con **2 valores** en `padding/margin` → `vertical horizontal`.  
- **Box model**: `width`/`height` afectan al **contenido** (no incluyen `padding`/`border` salvo `box-sizing: border-box`). *(Recuerda la idea general del modelo aunque no se pida box‑sizing en los apuntes.)*
- **DOM**: es la **estructura en memoria** manipulable por scripts; el navegador crea **nodos de texto** por espacios/retornos.

---

## 6) Píldoras de memorización (flash)
- **W3C** (1994), **WHATWG** (2004), **MOU HTML/DOM** (2019).  
- **HTML 4.01 (1999)**, **XHTML 1.0 (2000)**, **grupo XHTML2 cerrado (2010)**, **HTML5 Recomendación (2014)**.  
- **CSS 2.1 (2011)**; **CSS3 modular**; **no “CSS4”**.  
- **Head siempre**: `charset` + `title` + `link` a CSS externo.  
- **Validación**: usar validadores de HTML/CSS; accesibilidad **WCAG**.

---

## 7) Mini‑test de repaso (marca V/F)
1. ( ) En HTML5, `<!DOCTYPE html>` es opcional. → **F**  
2. ( ) `lang` debe indicarse en `<html>`. → **V**  
3. ( ) En `<link>`, el atributo `rel` es opcional. → **F**  
4. ( ) `<base href>` solo afecta a los enlaces dentro de `<nav>`. → **F**  
5. ( ) Los atributos booleanos se ponen como `disabled="true"`. → **F**  
6. ( ) En HTML5 se recomienda minúsculas y cerrar todas las etiquetas. → **V**  
7. ( ) CSS evoluciona por niveles y módulos; “CSS4” no existe como tal. → **V**  
8. ( ) El CSS inline es preferible por rendimiento. → **F**  
9. ( ) El Box Model incluye contenido, padding, borde y margen. → **V**  
10. ( ) El DOM es una representación en memoria del documento. → **V**

---

## 8) Snippets canónicos para el examen
### HTML mínimo + CSS externo
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejemplo</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <header><h1>Título</h1></header>
  <nav><a href="inicio.html">Inicio</a></nav>
  <main><section><p>Hola</p></section></main>
  <footer>©</footer>
</body>
</html>
```

### CSS con shorthands y “regla del reloj”
```css
/* Agrupación + shorthands */
h1, h2, h3 { font-weight: bold; }
.box {
  margin: 1rem 2rem;       /* vertical horizontal */
  padding: 1rem 2rem 0 3rem; /* top right bottom left */
  border: 1px solid #000;
}
```

---

## 9) Checklist exprés
- [ ] DOCTYPE, `lang`, `charset`, `title` presentes.  
- [ ] CSS enlazado **externo** con `<link rel="stylesheet">`.  
- [ ] Atributos **booleanos** correctos (sin valores).  
- [ ] Anidamiento HTML correcto (sin solapamientos).  
- [ ] Entiendes Box Model, shorthands y “regla del reloj”.  
- [ ] Repasado el **timeline** W3C/WHATWG/HTML5 y **niveles** de CSS.

---

### Fin
Repasa primero **definiciones y obligatoriedades**; después, practica con el **mini‑test** y valida mentalmente el **HTML mínimo** y el **CSS de ejemplo** en cada lectura.
