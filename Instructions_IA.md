# Instrucciones: actualizar retos (README + índice)

Documento de referencia para **ti** y para el **asistente de IA** cuando se incorpore un nuevo reto de [Frontend Mentor](https://www.frontendmentor.io) a este repositorio. Objetivo: cambios **mínimos**, **consistentes** y **revisables** en el futuro. Al cerrar cada tarea, aplicar **Conventional Commits** y **subir al remoto** (`git push`), en la línea del historial del repo (véase la sección Git más abajo).

---

## Alcance

| Archivo / ubicación                         | Rol                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------- |
| `README.md` (raíz)                          | Lista de retos en Markdown, enlaces relativos a cada carpeta. |
| `index.html` (raíz)                         | Página índice servida en la raíz del sitio (p. ej. GitHub Pages). |
| `readme-template.md` (raíz)                 | Plantilla para el README de cada reto; base para generar `nombre-reto/README.md` (personalizar en la carpeta, no dejar la plantilla dentro del reto). |
| `nombre-reto/README.md`                     | Documentación de la solución (estructura alineada con retos ya hechos en este repo). |

No forman parte de esta rutina obligatoria: código de implementación detallado dentro de `nombre-reto/` más allá de lo necesario para el README, y `NOTAS-TECNICAS.md` (salvo que enlaces un reto nuevo allí por separado).

**Archivos a eliminar dentro de cada carpeta de reto al incorporarla:** el `README.md` que trae el paquete de Frontend Mentor (instrucciones genéricas del reto), y si existen **`AGENTS.md`** y **`CLAUDE.md`** en esa carpeta (no deben quedar duplicados respecto a la documentación del monorepo en la raíz).

En Cursor, la regla `.cursor/rules/actualizar-retos-frontend-mentor.mdc` recuerda este flujo al trabajar con el índice en la raíz; el README **por carpeta** es un paso adicional descrito más abajo.

---

## Principios

1. **Copiar el patrón existente** del último reto añadido (formato de línea en README, bloque de tarjeta en `index.html`).
2. **No rediseñar** la página ni reestructurar secciones salvo petición explícita.
3. **No reescribir** entradas de retos anteriores salvo correcciones acordadas.
4. **Un reto = una carpeta**; el nombre de carpeta suele coincidir con el del proyecto en Frontend Mentor (kebab-case).
5. Si falta información **imprescindible** (nombre de carpeta, título a mostrar), **preguntar antes** de tocar archivos.

---

## Patrón actual: `README.md` (raíz del repositorio)

Ubicación de la lista: sección **«Retos incluidos»**. (No confundir con `nombre-reto/README.md`, descrito en su propia sección.)

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

## README dentro de cada carpeta del reto (`nombre-reto/README.md`)

Al preparar una carpeta nueva (o alinear una que aún tenga solo el README de Frontend Mentor):

1. **Eliminar** el `README.md` original del paquete de Frontend Mentor (el que describe el reto para descargarlo, no tu solución documentada).
2. **Eliminar**, si aparecen en esa carpeta, **`AGENTS.md`** y **`CLAUDE.md`** (son redundantes o ajenos al contenido que debe vivir en el monorepo; la guía para agentes, si aplica, está en la raíz del repo).
3. **Crear el nuevo `README.md`** a partir de **`readme-template.md`** en la **raíz del repositorio**: copiar la plantilla a `nombre-reto/README.md` (o equivalente: el contenido final debe ser un único `README.md` en la carpeta del reto, no dejar `readme-template.md` dentro del reto).
4. **Configurar** ese `README.md` siguiendo el **mismo criterio** que los README de los retos ya completados en este repo (por ejemplo `qr-code-component/README.md`, `blog-preview-card/README.md`, `social-links-profile/README.md`): título con el patrón *Frontend Mentor - \<nombre del reto\> solution*, enlace al challenge en Frontend Mentor, tabla de contenidos coherente, secciones **Overview** (Screenshot, Links), **My process** (Built with, What I learned, Continued development, Useful resources) y **Author**, enlaces a repositorio y GitHub Pages con la ruta correcta (`https://github.com/FraVelz/Frontend-Mentor/tree/main/<carpeta-del-reto>`, `https://fravelz.github.io/Frontend-Mentor/<carpeta-del-reto>/`), imagen `./screenshot.png` cuando exista captura, y listas de tecnologías alineadas con lo realmente usado en el proyecto.

Si `readme-template.md` aún no existe en la raíz, créalo primero duplicando la estructura de uno de esos README de referencia y sustituyendo los fragmentos variables por marcadores claros (nombre del reto, URLs, carpeta).

---

## Enlaces: repositorio y demo (opcional)

En el estado actual del repo, la lista del **README** enlaza solo a la **carpeta** del reto. Si más adelante documentas **repo** o **live demo**:

- Sigue el mismo estilo y orden que el último reto que ya los tenga.
- URL típica de **GitHub Pages** para un reto en subcarpeta:  
  `https://<usuario>.github.io/<repo>/nombre-carpeta/`  
  (ajusta usuario, repo y carpeta; el índice en `/` lista las rutas relativas que ya muestra `index.html`).

Hasta que eso exista en el README, no inventar columnas nuevas.

---

## Git y GitHub (Conventional Commits)

### Regla de cierre

**No dar por terminada** la incorporación o actualización de un reto hasta que **todo** lo tocado en esa sesión esté **versionado y subido**: `git add` de los archivos relevantes, **al menos un *commit*** con mensaje **Conventional Commits**, y **`git push`** al remoto habitual (`origin`, rama en la que trabajes, p. ej. `main`). Eso incluye:

- Cambios solo en la raíz (`README.md`, `index.html`, `readme-template.md`, `Instructions_IA.md`, etc.).
- Carpeta completa del reto (HTML, CSS, assets, `nombre-reto/README.md`, etc.) cuando forme parte del mismo trabajo.
- Cualquier otra modificación relacionada (renombrar carpetas, corregir enlaces, plantillas).

Si el entorno lo permite, el asistente debe **ejecutar** commit y push; no limitarse a describirlos.

### Formato y congruencia con este repositorio

Seguir **[Conventional Commits](https://www.conventionalcommits.org/)**: `<tipo>[ámbito opcional]: <descripción breve en imperativo>` (mensajes en **inglés**, como en el historial reciente del repo).

**Antes de redactar el mensaje**, conviene revisar los últimos commits (`git log --oneline -15`) y **imitar el estilo** ya usado aquí: mismos tipos, ámbitos entre paréntesis cuando aplique, y nivel de detalle.

Tipos frecuentes en este proyecto:

| Tipo     | Uso típico aquí |
| -------- | ---------------- |
| `docs`   | README de la raíz, índice, README de un reto, instrucciones. Ámbito `challenges` o `(/)` cuando encaje con commits previos. |
| `chore`  | Mantenimiento, migraciones de carpetas, cambios que no son solo “docs” ni una `feat`. |
| `feat`   | Nuevo reto o funcionalidad sustancial (p. ej. *add challenge … complete*). |
| `fix`    | Correcciones puntuales en una página o reto. |

**Ejemplos reales del historial** (referencia de tono y forma):

- `docs(challenges): list recipe-page-main in README and index`
- `docs(challenges): add social-links-profile to index and document Git workflow`
- `docs(challenges): add product-preview-card, readme template, fix recipe-page paths`
- `chore: migrate recipe-page-main to recipe-page and add product-preview challenge`
- `feat: add challenge social-links-profile complete`
- `fix: detail in the page recipe`

Para una sola entrega que mezcle índice + carpeta del reto, un mensaje tipo `docs(challenges): …` o `chore: …` que nombre el reto y lo esencial (index, README, assets) encaja con entregas grandes recientes del historial. Si el cambio es casi solo listar en raíz, priorizar `docs(challenges): …` como en los ejemplos de arriba.

### Un commit o varios

- **Un commit** suele bastar si todo el trabajo es una unidad (nuevo reto + entrada en índice).
- **Varios commits** solo si separas de forma clara (p. ej. primero implementación, luego solo docs); en ese caso, cada uno con Conventional Commits y el push al final de la serie.

### Push

Tras el o los commits: `git push origin <rama>`. Sin push, la rutina queda incompleta respecto a “subir el proyecto” al remoto.

---

## Checklist al añadir un reto

1. Confirmar **nombre de carpeta** y **títulos** (README de la raíz en español, nombre FM en el índice si mantienes la convención actual).
2. En la carpeta del reto: **eliminar** el README de Frontend Mentor; **eliminar** `AGENTS.md` y `CLAUDE.md` si existen; **generar** `README.md` desde `readme-template.md` y **configurarlo** como los README de retos ya hechos (enlaces, secciones, screenshot).
3. Editar **README.md** (raíz): un nuevo ítem en «Retos incluidos» con el formato de arriba.
4. Editar **index.html**: un nuevo `<li>` con la plantilla de arriba.
5. Revisar en local que el enlace relativo `./nombre-carpeta/` abre el `index` del reto.
6. No cambiar estilos globales de `index.html` ni secciones que no sean la lista.
7. **Cierre en Git**: incluir en el *stage* **todos** los archivos de ese trabajo (raíz + carpeta del reto, etc.). *Commit* con **Conventional Commits** alineado con `git log` del repo (inglés, tipo `docs` / `docs(challenges)` / `chore` / `feat` / `fix` según el caso). **`git push`** a `origin` en la rama activa. No omitir el push al terminar.

---

## Salida esperada del asistente

Tras los cambios, el resultado debe ser **aplicable de inmediato**: difs claros en `README.md` e `index.html` de la raíz, en `nombre-reto/README.md` cuando proceda, y en `readme-template.md` si se crea o actualiza la plantilla (o archivos completos si el flujo de trabajo lo pide), sin rodeos innecesarios. Si el entorno permite ejecutar Git de forma segura: **commit** (mensaje Conventional Commits **coherente con commits anteriores del repo**) y **push** de **todo** lo relativo a la tarea, hasta dejar el remoto actualizado.

---

## Resumen rápido

| Pregunta                                  | Acción                      |
| ----------------------------------------- | --------------------------- |
| ¿Mismo formato que los retos ya listados? | Sí, siempre.                |
| ¿README dentro de `nombre-reto/`?         | Sustituir el de FM; usar plantilla raíz y alinear con retos hechos; quitar `AGENTS.md`/`CLAUDE.md` en la carpeta. |
| ¿Tocar CSS o el hero de `index.html`?     | No, al solo añadir un reto. |
| ¿Falta el nombre de la carpeta?           | Preguntar; no adivinar.     |
| ¿Commit y push al terminar (índice, reto, subir proyecto)? | Sí: *stage* completo, Conventional Commits al estilo del `git log`, y `git push` a `origin`. |
