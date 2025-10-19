# SEW — Apuntes de **Teoría_XML** (examen tipo test)
_Grado en Ingeniería Informática del Software — Software y Estándares para la Web_  
**Fuentes:** 01‑Introducción XML, 02‑DTDs, 03‑Schemas (XSD), 04‑XPath, 05‑XSLT, 06‑Procesamiento XML.

> 🎯 **Objetivo**: condensar definiciones, sintaxis y “trampas” frecuentes de preguntas tipo test. Memoriza palabras **clave** (bien formado vs **válido**, `DOCTYPE`, `schemaLocation`, **min/maxOccurs**, **@atributos** en XPath, `match` en XSLT…).

---

## 1) XML en contexto
- **XML (eXtensible Markup Language)** = **metalenguaje** para definir lenguajes de marcas específicos de una aplicación.  
- **Separa** contenido/estructura de la presentación (esta la aporta CSS/XSLT).  
- **Pilares**: *documentos bien formados* (sintaxis XML) y *documentos válidos* (cumplen DTD o XSD).  
- **De SGML→XML**: XML es subconjunto de SGML (SGML ISO 8879:1986). En la doc del curso se destaca la comparación formal (SGML tipo 2, XML tipo 3, en la jerarquía de Chomsky).  
- **Usos**: intercambio de información, servicios web, configuración, formatos intermedios, vocabularios específicos.  
- **Mapa mental**: XML habilita DTD/XSD, XPath, XSLT/XSL‑FO, parsers y APIs (DOM, SAX/JAXP, etc.).

### Bien formado vs Válido
- **Bien formado**: sintaxis correcta (un único elemento raíz, etiquetas bien anidadas/cerradas, atributos con comillas, sensibilidad a mayúsculas/minúsculas, etc.).  
- **Válido**: además, cumple las **reglas de un DTD o un XML Schema (XSD)**.  
- **Importante**: la validación requiere **parser con validación** y que el XML **referencie** su DTD/XSD.

---

## 2) DTD (Document Type Definition)
**Qué define**: gramática (elementos, atributos, entidades, notaciones) de un tipo de documento.  
**Dónde**: incrustado (subset interno de `<!DOCTYPE … [ … ]>`) o externo (`SYSTEM`, `PUBLIC`).

### Enlazar un DTD
- **Interno** (subset dentro del propio XML):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE pizzas [
  <!ELEMENT pizzas (pizza+)>
  <!ELEMENT pizza (ingrediente*)>
  <!ELEMENT ingrediente (#PCDATA)>
  <!ATTLIST pizza nombre CDATA #REQUIRED>
  <!ATTLIST pizza precio CDATA #REQUIRED>
  <!ATTLIST ingrediente nombre CDATA #REQUIRED>
]>
<pizzas>…</pizzas>
```
- **Externo (SYSTEM)**:
```xml
<!DOCTYPE pizzas SYSTEM "pizzas.dtd">
```
- **Externo (PUBLIC)** (ej. XHTML 1.1):
```xml
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

### Declaraciones básicas
- `<!ELEMENT>` estructura y multiplicidad (`+`, `*`, `?`).  
- `<!ATTLIST>` atributos y tipos: `CDATA`, `ID`, etc.; ocurrencia: `#REQUIRED`, `#IMPLIED`.  
- `<!ENTITY>` entidades (macro‑sustituciones).  
- `<!NOTATION>` notaciones (p. ej., tipos binarios).

**Ventajas**: sintaxis breve. **Limitaciones**: sin tipos de datos ricos, sin espacios de nombres, expresividad limitada → **XSD** lo resuelve.

---

## 3) XML Schema (XSD)
**Objetivo**: describir **estructura**, **tipos** y **restricciones** con sintaxis **XML**. Soporta **espacios de nombres**, **tipos predefinidos**, **tipos por el usuario**, **min/maxOccurs**, **restricciones numéricas**, **documentación**, **herencia/extensión** y **import/include/redefine**.

### Patrón básico (namespaces + tipos)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://www.uniovi.es"
           xmlns="http://www.uniovi.es"
           elementFormDefault="qualified">

  <xs:element name="pizzas">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="pizza" minOccurs="1" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:element name="pizza">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="ingrediente" minOccurs="1" maxOccurs="4"/>
      </xs:sequence>
      <xs:attribute name="nombre" type="xs:ID" use="required"/>
      <xs:attribute name="precio" type="xs:integer" use="required"/>
    </xs:complexType>
  </xs:element>

  <xs:element name="ingrediente">
    <xs:complexType>
      <xs:attribute name="nombre" type="xs:string" use="required"/>
    </xs:complexType>
  </xs:element>

</xs:schema>
```
- **Asociar XML ↔ XSD** en el documento XML:
```xml
<pizzas xmlns="http://www.uniovi.es"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.uniovi.es pizzas.xsd">…</pizzas>
```
- **Tipos**: simples (`xs:string`, `xs:integer`, …) y complejos; **composición** (`sequence`, `choice`, `all`); **simpleContent/complexContent** + `extension`/`restriction`.  
- **Namespace**: `targetNamespace` (el del esquema), `elementFormDefault="qualified"` (elementos calificados).

**Cuándo usar XSD**: cuando necesitas **tipos**, **restricciones** y **namespaces** (frente a DTD).

---

## 4) XPath (W3C)
**Para qué**: seleccionar nodos/valores en el árbol DOM de un XML. Resultado: **nodos** o **escalares** (string, número, boolean).

### Sintaxis abreviada útil (memoriza)
- `X` hijos con nombre `X`; `*` todos los hijos.  
- `text()` contenido textual; `@attr` atributo.  
- `X[1]` primer `X`; `X[last()]` último.  
- `*/X` nietos `X`; `X//Y` `Y` descendientes de `X`; `//Y` desde raíz.  
- `..` padre; `.` nodo actual.  
- Ej.: `//libro[@isbn][precio/@moneda="Euro"]`

---

## 5) XSLT (Transformaciones)
**Familia XSL**: **XSLT** (transforma XML→XML/HTML/TXT), **XSL‑FO** (formateo para impresión/PDF), **XPath** (selección).  
**Versión**: XSLT **3.0** (Recomendación W3C 08‑jun‑2017).

### Estructura mínima de una hoja XSLT
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <html><body><h1>Poema</h1></body></html>
  </xsl:template>
</xsl:stylesheet>
```
- **Templates**: `<xsl:template match="expresión XPath">…</xsl:template>`  
- **Selectores/valores**: `<xsl:value-of select="…"/>`  
- **Iteración**: `<xsl:for-each select="…">`  
- **Selección**: `<xsl:if>`, `<xsl:choose><xsl:when>…</xsl:when><xsl:otherwise/></xsl:choose>`  
- **Asociar hoja al XML** (PI en el XML):
```xml
<?xml-stylesheet type="text/xsl" href="poema.xsl"?>
```
> ⚠️ Nota del curso: navegadores modernos **han dejado de aplicar XSLT** sobre XML por seguridad; queda soporte en entornos/plug‑ins o navegadores antiguos (p.ej., IE).

**Ejemplos típicos**: leer atributos `@autor/@fecha/@lugar`, extraer texto `<titulo>`, etc.

---

## 6) Procesamiento XML y parsers
- **Parser** = analizador que verifica **bien formado** y opcionalmente **validez** (contra DTD/XSD).  
- **Sin validación**: solo sintaxis; **con validación**: además DTD/XSD.  
- **APIs**:
  - **DOM** (árbol en memoria, flexible; más consumo).  
  - **SAX** (evento/stream, solo hacia delante; bajo consumo).  
  - **JAXP** (Java): factorías para SAX/DOM/XSLT (incluye `javax.xml.parsers`/`transform`).  
- **Por lenguaje** (curso): C# (`XmlReader` → *rápido, sin caché, cursor sólo hacia delante*; `XmlDocument`; LINQ to XML), Python, JavaScript.  
- **Servicios Web** y **generación de XML**: flujos típicos de E/S, consumo y serialización.

---

## 7) Snippets canónicos (listos para copiar)
### DTD incrustado (resumen)
```xml
<!DOCTYPE libros [
  <!ELEMENT libros (libro+)>
  <!ELEMENT libro (título, autor+, año?, precio, editorial, clasificación, idioma)>
  <!ATTLIST libro isbn ID #REQUIRED>
  <!ATTLIST precio moneda CDATA #REQUIRED>
]>
```

### XSD con `minOccurs/maxOccurs` y atributos tipados
```xml
<xs:element name="pizza">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="ingrediente" minOccurs="1" maxOccurs="5"/>
    </xs:sequence>
    <xs:attribute name="nombre" type="xs:ID" use="required"/>
    <xs:attribute name="precio" type="xs:integer" use="required"/>
  </xs:complexType>
</xs:element>
```

### XPath típicos de examen
- Primer título: `//libro/título[1]/text()`  
- Libros en EUR: `//libro[precio/@moneda="Euro"]`  
- Último verso: `//poema/verso[last()]`

### XSLT: leer atributos y texto
```xml
<xsl:template match="poema">
  Autor: <xsl:value-of select="@autor"/><br/>
  Título: <xsl:value-of select="titulo"/>
</xsl:template>
```

### C# con `XmlReader` (idea general)
```csharp
using var reader = XmlReader.Create("libros.xml");
while (reader.Read()) {
  if (reader.NodeType == XmlNodeType.Element && reader.Name == "titulo") {
    Console.WriteLine(reader.ReadElementContentAsString());
  }
}
```

---

## 8) Trampas típicas (marca mental “ojo”)
- **Bien formado ≠ válido**; validez solo si hay **DTD/XSD** y parser **con validación**.  
- `<!DOCTYPE …>` **no** “pone bonito” el XML: **declara** reglas/gramática (o referencia a DTD).  
- **`schemaLocation`** (en el XML) **no** va en el XSD; requiere `xmlns:xsi` de **XMLSchema‑instance**.  
- En XSD, **`elementFormDefault="qualified"`** hace que los **elementos** deban ir con el **namespace**.  
- XPath: `@atributo` **no** selecciona elementos, sino **atributos**.  
- XSLT en navegadores **no está garantizado** hoy; usar procesadores dedicados.  
- `XmlReader` es **forward‑only** (no DOM), **sin caché**, **rápido**.

---

## 9) Mini‑test de repaso (V/F)
1. ( ) Un XML puede ser válido pero no bien formado. → **F**  
2. ( ) `<!DOCTYPE …>` permite enlazar un DTD externo con `SYSTEM` o `PUBLIC`. → **V**  
3. ( ) XSD permite tipos (`xs:integer`, `xs:string`) y restricción de ocurrencias. → **V**  
4. ( ) `xsi:schemaLocation` se declara dentro del XSD. → **F**  
5. ( ) `//libro[@isbn]` selecciona libros con atributo `isbn`. → **V**  
6. ( ) XSLT transforma XML a HTML, texto u otros XML. → **V**  
7. ( ) `@precio` en XPath selecciona el elemento `<precio>`. → **F**  
8. ( ) `XmlReader` recorre nodos hacia delante, sin almacenamiento en caché. → **V**  
9. ( ) DOM es más ligero que SAX en memoria. → **F**  
10. ( ) Un XML puede asociar una hoja XSLT con `<?xml-stylesheet …?>`. → **V**

---

## 10) Checklist exprés (antes del examen)
- [ ] Diferencias **bien formado**/**válido** claras.  
- [ ] Enlazar **DTD** (`DOCTYPE`) y **XSD** (`xsi:schemaLocation`) sin confusiones.  
- [ ] `minOccurs/maxOccurs`, `xs:attribute`, tipos **simples/compuestos** dominados.  
- [ ] XPath abreviado controlado (`//`, `@`, `[1]`, `last()`).  
- [ ] XSLT: estructura de **templates**, `match`/`select`, `value-of`, `for-each`.  
- [ ] DOM vs SAX, validación, JAXP y `XmlReader` entendidos.

---

### Fin
Repasa este documento 1–2 veces y practica creando **un DTD**, **un XSD** y **3 consultas XPath** sobre los XML de ejemplo.
