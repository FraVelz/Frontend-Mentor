# Instrucciones: actualizar retos (README + índice)

Documento de referencia para **ti** y para el **asistente de IA** cuando se incorpore un nuevo reto de [Frontend Mentor](https://www.frontendmentor.io) a este repositorio. Objetivo: cambios **mínimos**, **consistentes** y **revisables** en el futuro.

---

## Alcance

| Archivo             | Rol                                                               |
| ------------------- | ----------------------------------------------------------------- |
| `README.md` (raíz)  | Lista de retos en Markdown, enlaces relativos a cada carpeta.     |
| `index.html` (raíz) | Página índice servida en la raíz del sitio (p. ej. GitHub Pages). |

No forman parte de esta rutina: código dentro de `nombre-reto/`, `NOTAS-TECNICAS.md` (salvo que decidas enlazar un reto nuevo allí por separado), ni `AGENTS.md` de cada reto.

En Cursor, la regla `.cursor/rules/actualizar-retos-frontend-mentor.mdc` recuerda este flujo al trabajar con esos dos archivos en la raíz (el criterio “solo raíz” está aclarado en la propia regla para no confundirlo con el README de cada reto).

---

## Principios

1. **Copiar el patrón existente** del último reto añadido (formato de línea en README, bloque de tarjeta en `index.html`).
2. **No rediseñar** la página ni reestructurar secciones salvo petición explícita.
3. **No reescribir** entradas de retos anteriores salvo correcciones acordadas.
4. **Un reto = una carpeta**; el nombre de carpeta suele coincidir con el del proyecto en Frontend Mentor (kebab-case).
5. Si falta información **imprescindible** (nombre de carpeta, título a mostrar), **preguntar antes** de tocar archivos.

---

## Patrón actual: `README.md`

Ubicación de la lista: sección **«Retos incluidos»**.

Formato de cada ítem (ejemplo real):

```markdown
- [Componente de código QR](./qr-code-component/) — implementación en la carpeta `qr-code-component/`.
```

Reglas:

- Título del enlace: **español**, corto y descriptivo (puedes basarte en el nombre del reto en FM).
- Destino: ruta relativa `./nombre-carpeta/`.
- Tras el guión largo (`—`): frase fija del estilo *implementación en la carpeta* + nombre de carpeta entre backticks.
- Nuevos retos: **al final** de la lista, salvo que ya exista un criterio de orden distinto acordado.

La nota *(La lista se irá ampliando…)* debe mantenerse debajo de la lista si ya está.

---

## Patrón actual: `index.html`

- La lista está en `<section aria-labelledby="challenges-heading">`, dentro de `<ul>`.
- Cada reto es un `<li>` con un único `<a class="challenge-link" href="./nombre-carpeta/">`.
- **Nombre visible** (`challenge-name`): convención del reto en Frontend Mentor (a menudo en inglés, como en el diseño).
- **Ruta** (`challenge-path`): `/<nombre-carpeta>/` con barra inicial en el texto.
- Conservar la **misma estructura HTML** (spans, SVG de flecha, clases) que el último ítem; solo sustituir textos y `href`.

Plantilla para un nuevo ítem (sustituir `NOMBRE-CARPETA` y `Título del reto FM`):

```html
<li>
  <a class="challenge-link" href="./NOMBRE-CARPETA/">
    <span class="challenge-text">
      <span class="challenge-name">Título del reto FM</span>
      <span class="challenge-path">/NOMBRE-CARPETA/</span>
    </span>
    <span class="challenge-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  </a>
</li>
```

El script que rellena `#base` con la URL de GitHub Pages **no debe modificarse** al añadir retos.

---

## Enlaces: repositorio y demo (opcional)

En el estado actual del repo, la lista del **README** enlaza solo a la **carpeta** del reto. Si más adelante documentas **repo** o **live demo**:

- Sigue el mismo estilo y orden que el último reto que ya los tenga.
- URL típica de **GitHub Pages** para un reto en subcarpeta:  
  `https://<usuario>.github.io/<repo>/nombre-carpeta/`  
  (ajusta usuario, repo y carpeta; el índice en `/` lista las rutas relativas que ya muestra `index.html`).

Hasta que eso exista en el README, no inventar columnas nuevas.

---

## Checklist al añadir un reto

1. Confirmar **nombre de carpeta** y **títulos** (README en español, nombre FM en el índice si mantienes la convención actual).
2. Editar **README.md**: un nuevo ítem en «Retos incluidos» con el formato de arriba.
3. Editar **index.html**: un nuevo `<li>` con la plantilla de arriba.
4. Revisar en local que el enlace relativo `./nombre-carpeta/` abre el `index` del reto.
5. No cambiar estilos globales de `index.html` ni secciones que no sean la lista.

---

## Salida esperada del asistente

Tras los cambios, el resultado debe ser **aplicable de inmediato**: difs claros en `README.md` y `index.html` (o archivos completos si el flujo de trabajo lo pide), sin rodeos innecesarios.

---

## Resumen rápido

| Pregunta                                  | Acción                      |
| ----------------------------------------- | --------------------------- |
| ¿Mismo formato que los retos ya listados? | Sí, siempre.                |
| ¿Tocar CSS o el hero de `index.html`?     | No, al solo añadir un reto. |
| ¿Falta el nombre de la carpeta?           | Preguntar; no adivinar.     |
