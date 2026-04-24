# Metadatos HTML: guía y convenciones

**Ubicación:** `docs/CONVENCIONES-METADATOS.md` (referencia en prompts: `docs/CONVENCIONES-METADATOS.md` o `@docs/CONVENCIONES-METADATOS.md`).

Este documento define **cómo añadir metadatos** (SEO, Open Graph, Twitter) en el índice del repositorio y en cada reto. Úsalo al crear un proyecto nuevo o al pedir a la IA que lo configure: basta con **referenciar este archivo** y el nombre de la carpeta del reto.

## Constantes del repositorio

| Concepto                         | Valor                                       |
| -------------------------------- | ------------------------------------------- |
| **Usuario / org en GitHub**      | `FraVelz`                                   |
| **Repositorio**                  | `Frontend-Mentor`                           |
| **Base pública (GitHub Pages)**  | `https://fravelz.github.io/Frontend-Mentor` |
| **Rama por defecto en URLs raw** | `main`                                      |

### URLs de imagen para redes (previews)

- **Índice raíz** (captura del listado de retos en la raíz del repo):

  `https://github.com/FraVelz/Frontend-Mentor/blob/main/screenshot.png?raw=true`

- **Cada reto** (sustituir `{carpeta}` por el nombre de la carpeta del proyecto, p. ej. `qr-code-component`):

  `https://github.com/FraVelz/Frontend-Mentor/blob/main/{carpeta}/screenshot.png?raw=true`

> Alternativa equivalente (misma imagen, otra URL):  
> `https://raw.githubusercontent.com/FraVelz/Frontend-Mentor/main/{carpeta}/screenshot.png`  
> En este repositorio se prefiere el formato `blob/.../screenshot.png?raw=true` para alinear con la documentación existente.

### `canonical` y `og:url`

Siempre con **trailing slash** y bajo el dominio de Pages:

- Índice: `https://fravelz.github.io/Frontend-Mentor/`
- Reto: `https://fravelz.github.io/Frontend-Mentor/{carpeta}/`

---

## 1. Archivo `index.html` en la raíz del repo

**Idioma del documento:** `lang="es"`.

**Añadir en `<head>`** (después de `<title>`, junto al resto de meta; orden recomendado: descripción → canonical → Open Graph → Twitter → favicon):

- `meta name="description"`: 1–2 frases en español sobre el índice (retos, stack, enlaces a demos y GitHub).
- `meta name="author"`: p. ej. `Fravelz`.
- `link rel="canonical"`: URL del índice (ver arriba).
- Open Graph: `og:type` = `website`, `og:url`, `og:title`, `og:description`, `og:image` (raíz), `og:image:alt`, `og:site_name`, `og:locale` = `es_ES`.
- Twitter: `twitter:card` = `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (misma que `og:image` de raíz).

**`og:title` / título de página** deben coincidir con el `<title>` del documento.

---

## 2. Cada reto: `{carpeta}/index.html`

**Idioma del documento:** en los retos actuales, `lang="en"` (convención Frontend Mentor en inglés).

**Añadir en `<head>`** inmediatamente **después** de `<title>` (y de `charset` / `viewport` si aplica), antes de favicon, estilos o scripts:

- `meta name="description"`: 1 frase clara en **inglés** sobre qué resuelve el reto.
- `link rel="canonical"`: `https://fravelz.github.io/Frontend-Mentor/{carpeta}/`
- Open Graph: `og:type` = `website`, `og:url` (misma que canonical), `og:title` (alineada con `<title>`, p. ej. `Frontend Mentor | Nombre del reto`), `og:description`, `og:image` (patrón con `{carpeta}`), `og:image:alt` (corto, inglés), `og:locale` = `en_US`.
- Twitter: `summary_large_image` + título, descripción e imagen (mismas que OG cuando tenga sentido).

**Obligatorio en el repositorio:** que exista `{carpeta}/screenshot.png` para la preview en redes y para la coherencia con el índice.

---

## 3. Plantilla para un reto nuevo

Sustituye los marcadores `{{NOMBRE_CARPETA}}`, `{{TITULO_CORTO}}` y `{{DESCRIPCION_EN}}`.

```html
<meta name="description" content="{{DESCRIPCION_EN}}" />
<link rel="canonical" href="https://fravelz.github.io/Frontend-Mentor/{{NOMBRE_CARPETA}}/" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://fravelz.github.io/Frontend-Mentor/{{NOMBRE_CARPETA}}/" />
<meta property="og:title" content="Frontend Mentor | {{TITULO_CORTO}}" />
<meta property="og:description" content="{{DESCRIPCION_OG_CORTA_EN}}" />
<meta
  property="og:image"
  content="https://github.com/FraVelz/Frontend-Mentor/blob/main/{{NOMBRE_CARPETA}}/screenshot.png?raw=true"
/>
<meta property="og:image:alt" content="{{TITULO_CORTO}} challenge preview" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Frontend Mentor | {{TITULO_CORTO}}" />
<meta name="twitter:description" content="{{DESCRIPCION_TWITTER_CORTA_EN}}" />
<meta
  name="twitter:image"
  content="https://github.com/FraVelz/Frontend-Mentor/blob/main/{{NOMBRE_CARPETA}}/screenshot.png?raw=true"
/>
```

- `{{TITULO_CORTO}}` debe coincidir con el nombre del reto en Frontend Mentor (como en el resto de proyectos: después del `|` en `<title>`).
- `og:description` puede ser ligeramente más larga que `twitter:description` si hace falta; evita duplicar párrafos idénticos sin necesidad.

---

## 4. Checklist al añadir un reto

1. Crear la carpeta `{carpeta}/` con `index.html` y recursos.
2. Añadir `screenshot.png` en `{carpeta}/` (usada en el índice y en metadatos).
3. Copiar el bloque de la plantilla (sección 3) y rellenar título y descripciones.
4. Asegurar que `<title>` sea `Frontend Mentor | {TITULO_CORTO}`.
5. En el `index.html` **raíz**, añadir la tarjeta del reto (captura, enlaces, nivel, etc.) según el diseño actual del listado.
6. Si se documenta en un fichero de enlaces (p. ej. notas con URLs de solución FM, demo y GitHub), actualizarlo también.

---

## 5. Cómo pedirlo a la IA (Cursor / Copilot, etc.)

Puedes pegar o referenciar:

> Aplica las convenciones de `docs/CONVENCIONES-METADATOS.md` al proyecto en la carpeta `{nombre}`. Título del reto: «…». Descripción breve en inglés: «…».

Con eso se puede generar el bloque de `<head>`, y si indicas además _“actualiza el index raíz”_, mantener alineado el listado y las capturas.

---

## 6. Campos mínimos (resumen)

| Dónde    | Campos mínimos                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------- |
| **Raíz** | `description`, `canonical`, `og:*` básicos + `twitter:card` + imágenes                         |
| **Reto** | `description`, `canonical`, `og:url/title/description/image`, `twitter:*` e imagen por carpeta |

No es obligatorio añadir `keywords`, `article:*` o `og:image:width/height` salvo que se quiera optimizar un caso concreto.
