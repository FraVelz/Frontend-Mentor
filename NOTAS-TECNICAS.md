# Notas técnicas del repositorio

## Tabla de contenido

- [Notas técnicas del repositorio](#notas-técnicas-del-repositorio)
  - [Tabla de contenido](#tabla-de-contenido)
  - [Estructura del repo](#estructura-del-repo)
  - [URLs en GitHub Pages (un solo proyecto)](#urls-en-github-pages-un-solo-proyecto)
  - [Despliegue](#despliegue)
  - [Añadir un reto nuevo](#añadir-un-reto-nuevo)
  - [Desarrollo local](#desarrollo-local)
  - [Ideas para feedback o seguimiento](#ideas-para-feedback-o-seguimiento)
  - [Information](#information)

## Estructura del repo

```txt
/
  index.html                 ← índice con enlaces a cada reto
  qr-code-component/         ← ejemplo: un reto (HTML, CSS, JS, assets…)
  <otro-reto>/               ← nuevos retos: misma idea, carpeta por reto
  .github/workflows/         ← despliegue automático a GitHub Pages
  NOTAS-TECNICAS.md          ← este archivo
```

Cada carpeta de reto con su propio `index.html` se trata como un **subsitio** bajo la misma base de Pages.

## URLs en GitHub Pages (un solo proyecto)

Si el repo se llama `frontend-mentor` y tu usuario es `fravelz`, la base suele ser:

`https://fravelz.github.io/frontend-mentor/`

| Contenido               | URL de ejemplo                                                 |
| ----------------------- | -------------------------------------------------------------- |
| Índice (lista de retos) | `https://fravelz.github.io/frontend-mentor/`                   |
| Reto QR                 | `https://fravelz.github.io/frontend-mentor/qr-code-component/` |

Las rutas dentro de cada reto (`./styles/`, `./images/`, etc.) son **relativas** al `index.html` de esa carpeta; no hace falta un “base path” distinto por reto.

## Despliegue

En `main`, el workflow en `.github/workflows/deploy.yml` copia el `index.html` de la raíz y **cada carpeta** que tenga su propio `index.html` a `_site/`, que es lo que publica GitHub Pages. No suele ser necesario tocar el workflow al añadir retos.

## Añadir un reto nuevo

1. Crear una carpeta nueva en la raíz, por ejemplo `nombre-del-reto/`.
2. Dentro, al menos `index.html` (y `styles/`, `js/`, `images/`, etc. como convenga).
3. Añadir un enlace en el `index.html` de la **raíz** del repo (lista de retos).
4. Hacer push a `main`: el workflow incluirá la carpeta en el sitio publicado.

## Desarrollo local

Desde la raíz del repo:

```bash
python3 -m http.server 8080
```

- Índice: `http://localhost:8080/`
- Ejemplo QR: `http://localhost:8080/qr-code-component/`

## Ideas para feedback o seguimiento

puedes dentro de la plataforma o creando un issue para feedbacks:

- Comprobar accesibilidad (contraste, foco, etiquetas) del reto.
- Revisar nombres de clases y organización CSS frente al design system del reto.
- semejanzas o errores con el diseño del reto.
- etc.

## Information

**Author:** Fravelz

**License:** MIT
