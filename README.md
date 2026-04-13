# Frontend Mentor — varios retos (monorepo)

Este repositorio agrupa **varios retos de Frontend Mentor**, cada uno en **su propia carpeta**. Así mantienes el código separado y, al publicar con **GitHub Pages**, cada reto tiene **su propia URL** dentro del sitio.

## Cómo quedan las URLs (GitHub Pages en un proyecto)

Si el repo se llama `frontend-mentor` y tu usuario es `fravelz`, la base suele ser:

`https://fravelz.github.io/frontend-mentor/`

| Contenido | URL de ejemplo |
|-----------|----------------|
| Índice (lista de retos) | `https://fravelz.github.io/frontend-mentor/` |
| Reto QR | `https://fravelz.github.io/frontend-mentor/qr-code-component/` |

Las rutas dentro de cada reto (`./styles/`, `./images/`) son **relativas** al `index.html` de esa carpeta, así que no hace falta configurar un “base path” por reto.

## Estructura del repo

```
/
  index.html              ← página principal con enlaces a cada reto
  qr-code-component/      ← un reto (HTML, CSS, JS, imágenes…)
  otro-reto/              ← cuando añadas más, misma idea
  .github/workflows/      ← despliegue a GitHub Pages
```

## Añadir un reto nuevo

1. Crea una carpeta nueva en la raíz, por ejemplo `nombre-del-reto/`.
2. Dentro, pon al menos `index.html` (y `styles/`, `js/`, `images/`, etc. como quieras).
3. Añade un enlace en el `index.html` de la **raíz** del repo (la lista de retos).
4. Haz push a `main`: el workflow copia automáticamente **cualquier carpeta** que tenga su propio `index.html` al sitio publicado.

No hace falta tocar el workflow salvo casos raros: el script ya incluye esas carpetas en `_site/`.

## Retos incluidos

- [QR code component](./qr-code-component/) — código en `qr-code-component/`.

## Desarrollo local

Desde la raíz del repo:

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080/` para el índice y `http://localhost:8080/qr-code-component/` para el reto.
