# Seminarios SEW — Usabilidad y Adaptabilidad
_Grado en Ingeniería Informática del Software — Software y Estándares para la Web_  
**Apuntes orientados a examen tipo test (Seminarios 1, 2 y 3).**

> 💡 Consejo de estudio: prioriza las **reglas de Krug**, las **convenciones de navegación** y las **técnicas de diseño adaptable**. Repasa ejemplos y “trampas” típicas al final.

---

## 1) Conceptos base: UX y Usabilidad (Seminario 1)
- **UX (Experiencia de Usuario)**: conjunto de factores que influyen en cómo interactúa el usuario con un sistema: funcionalidad, utilidad, hardware, software, usabilidad, diseño de interacción, accesibilidad, diseño visual, contenidos, navegación/búsqueda, eficacia/eficiencia, **emociones**, **marca** y **confianza**.
- **Usabilidad** = **Fácil de aprender** + **Fácil de utilizar**. Es mucho más que colores y tipografías: incluye **diseño de diálogos**, **enlace cognitivo** (modelo mental), **documentación** y **metáforas**.
- **Familiaridad y metáforas**: usar metáforas **verbales/visuales** (iconos) reduce la carga cognitiva. **Ojo**: **no siempre existe una metáfora válida** → aumentar pruebas de usabilidad.

### Reglas de Krug (imprescindibles)
1. **No me hagas pensar**: las páginas deben ser **obvias, evidentes y claras** (evitar nombres ingeniosos u oscuros, o botones dudosos).
2. **Los clics no importan** si la elección es **mecánica e inequívoca**.
3. **Reduce el texto**: elimina la mitad de las palabras y luego **la mitad de lo que quede**.

#### Cómo navega realmente la gente (implicaciones)
- **Hojea** en vez de leer; toma la **primera opción razonable**; **no** aprende el sistema antes de usarlo → el diseño debe **tolerar** esto.
- Evita preguntas tipo: “¿dónde estoy?”, “¿por dónde empiezo?”, “¿puedo hacer clic aquí?” con **rotulación clara**, affordances y jerarquía visual.

---

## 2) Diseño de la navegación (Seminario 2)
### Propósitos
- **Encontrar**: mover al usuario entre secciones.
- **Orientar**: indicar **dónde estoy** y **qué hay**.
- **Enseñar** el uso del sitio (por dónde empezar).
- **Generar confianza** (clave en e‑commerce).

### Convenciones (aprende el **vocabulario** de la UI)
- **Navegación constante/global** (aparece en casi todas las páginas):  
  **Identificación (logo)** · **Enlace a Home** · **Secciones** · **Búsqueda** · **Utilidades** (ayuda, carrito, contacto…). Mantener **misma ubicación y aspecto**.
- **Identificación del sitio (logo)**: visible en todas las páginas; arriba‑izquierda (idiomas LTR), arriba‑derecha en RTL; también válido centrado (sensibilidad multicultural). **El logo lleva a Home**.
- **Secciones**: nivel superior de la jerarquía. Puede mostrarse **navegación secundaria** (subsecciones) del contexto actual.
- **Utilidades**: enlaces importantes **fuera** de la jerarquía de contenidos (ayuda, “acerca de”, servicio al cliente…). **4‑5 máx.**; si hay más, agrupar en Home.
- **Búsqueda**: **cuadro o enlace** en todas las páginas. Etiqueta “**Buscar**” (evita “encontrar rápidamente…”). Si añades opciones, que **funcionen** (mejor refinamiento en resultados).
- **Home**: sentir de “**punto de partida**”. Reforzar que el **logo vuelve a Home**; opcional rotular “Home/Página principal” junto al logo (excepto en la propia Home).

### Diferencias con el mundo físico (efectos en usabilidad)
- Sin **escala** ni **direcciones** (no hay izq./der./arriba/abajo).
- Se pierde fácil la **ubicación** → favoritos, **botón Atrás** (30–40% de clics) y enlace permanente a Home.

### Página principal (qué **NO** poner)
- Nada de **saludos**, **autobombo** ni **vídeos obligatorios** al entrar. Debe permitir, de un vistazo: **buscar**, **navegar**, **ver lo mejor** del sitio.

---

## 3) Adaptabilidad/Responsive (Seminario 3)
**Objetivo**: visualización **óptima** en cualquier **resolución/dispositivo** (ordenador, tablet, móvil). Es un caso particular de **usabilidad**.

### Ventajas
- Mejor **UX** (especialmente en sitios de ancho fijo en móviles).
- **Coste** menor de creación/mantenimiento cuando pantallas comparten diseño.
- Evita apps nativas distintas por SO.

### Hitos móviles (contexto)
- iPhone (2007), Android (2008), iPad (2010), Windows Phone (2010, desc. 2014).

### Técnicas clave
- **Viewport (HTML5)**  
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
  - `width=device-width`: ancho = dispositivo.
  - `initial-scale=1.0`: zoom inicial.
- **Layouts fluidos** con **Flexbox/Grid** (unidades **relativas** %; rejillas de **12 columnas**, ancho total **100%**).
- **Media queries (CSS3)**: reglas condicionales según características del dispositivo (típicamente **ancho**).  
  ```css
  @media only screen and (max-width: 600px) {
    body { background-color: lightblue; }
  }
  ```
  - Nota: hay opiniones que usando **Grid** y funciones modernas se podrían reducir media queries, pero no hay consenso.
- **Imágenes y vídeos flexibles**  
  ```css
  /* Imagen flexible */
  img { max-width: 100%; height: auto; }
  /* Vídeo flexible */
  video { max-width: 100%; height: auto; }
  ```
- **Frameworks CSS (ejemplos)**: Pure.css, Milligram, Skeleton, Blueprint, GroundworkCSS, W3.CSS.  
- **Frameworks JS (ejemplos)**: React, Modernizr, jQuery, jQuery Mobile, AngularJS, Bootstrap.

---

## 4) Trampas típicas de tipo test (de seminarios)
- **UX ≠ parte de Usabilidad/Accesibilidad/Adaptabilidad** → **es más amplia** (engloba múltiples factores).
- **Rollover/carruseles de menú**: **no** son “muy usables” ni “ahorran espacio” por defecto.
- **Mejora de usabilidad**: añadir **buscador** (no tablas para maquetar, ni iFrames).
- **Guiar al usuario**: **indicar dónde estoy** (no cambiar CSS aleatoriamente ni abusar de pop‑ups).
- **Home**: evitar saludos, autopromo y vídeos obligatorios al entrar.
- **Barreras de accesibilidad (ceguera)**: maquetar con **tablas**, **imágenes sin `alt`**, **frames** → son **barreras**.

---

## 5) Checklist exprés pre‑examen
- [ ] ¿Puedo **decir dónde estoy** y **a dónde ir** en cada página?
- [ ] ¿Hay **logo** que vuelve a **Home** y **búsqueda** visible?
- [ ] ¿Las **secciones** y **utilidades** están claras y no saturadas?
- [ ] ¿El contenido está **recortado** (sin paja) y los **nombres** son claros?
- [ ] ¿Hay **viewport**, **layout fluido**, **media queries** y **medios flexibles**?
- [ ] ¿Evito **rollovers** y pop‑ups innecesarios?

---

## 6) Glosario breve
- **UX**: experiencia global del usuario con un sistema.
- **Usabilidad**: facilidad para aprender y usar.
- **Navegación global/constante**: elementos comunes (logo→Home, secciones, búsqueda, utilidades).
- **Utilidades**: enlaces importantes fuera de la jerarquía (ayuda, carrito, contacto).
- **Viewport**: área visible; meta para controlar ancho y escala inicial.
- **Media query**: regla CSS condicional por características del dispositivo.
- **Layout fluido**: rejillas/unidades relativas que ajustan al ancho disponible.

---

## 7) Mini‑test de repaso (marca V/F)
1. ( ) Los clics importan siempre: cuantos menos, mejor, aunque la opción sea clara. → **F**  
2. ( ) En cada página debe existir una forma de buscar. → **V**  
3. ( ) El logo debe enlazar a la página principal. → **V**  
4. ( ) Con `img { width:100%; height:auto }` la imagen se adapta. → **V**  
5. ( ) Los carruseles de menú son altamente usables por defecto. → **F**  

---

## 8) Bibliografía recomendada (de los seminarios)
- **Steve Krug** — _Don’t Make Me Think_ (3ª ed.; esp. **No me hagas pensar. Actualización**, Anaya 2014).  
- **Jakob Nielsen** — _Designing Web Usability_ (2000) y otros.

---

### Fin
Repasa este documento 1–2 veces y haz tests de muestra. Concéntrate en reglas, convenciones y patrones claros: **no me hagas pensar**.
