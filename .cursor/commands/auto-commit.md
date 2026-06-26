# Autocommit — Frontend Mentor (índice HTML + retos estáticos)

Usar cuando el usuario pida **hacer commit** del trabajo actual. Mensajes **Conventional Commits**, coherentes con
`git log` de este repo. **No** hacer `git push` salvo petición explícita.

**No confundir con cerrar un reto:** el checklist índice + README del reto + push está en
**[config-git-push.md](./config-git-push.md)**. Usa **`/auto-commit`** para commits generales (cursor, mantenimiento,
migraciones, docs de raíz sin cerrar un challenge completo).

## Cuándo ejecutar

- Invocación de **`/auto-commit`** o petición explícita de **commit** / **autocommit**.
- **No** commitear si el usuario no lo pidió.

## Antes de commitear

1. `git status` — staged y unstaged.
2. `git diff` — qué entra en el commit.
3. `git log -15 --oneline` — tono reciente.
4. **Respetar borrados:** si el diff elimina líneas o archivos, **no restaurarlos** ni "arreglar" el contenido antes del commit salvo petición explícita del usuario. Un borrado suele ser intencional.

**No** incluir secretos ni archivos generados salvo petición explícita.

## Ámbitos (`scope`) habituales en este repo

`challenges`, `index`, `readme`, `docs`, `cursor`, `chore`, `feat`, `fix`.

Rutas de referencia: `README.md`, `index.html`, `docs/`, carpetas de retos en la raíz, `.cursor/commands/`.

## Formas de mensaje

### A) Formato lista — varias áreas

```text
docs(challenges): list recipe-page in README and index

chore: migrate recipe-page-main folder name
chore(cursor): add auto-commit and git-commits rules
```

### B) Formato clásico — un tema

```text
feat: add challenge social-links-profile complete
```

## Tipos

| Tipo    | Uso aquí                                      |
| ------- | --------------------------------------------- |
| `docs`  | README raíz, índice, README de reto           |
| `feat`  | Nuevo reto o funcionalidad sustancial         |
| `fix`   | Correcciones en una página o reto             |
| `chore` | Mantenimiento, migraciones, `.cursor/`        |

## Reglas

- Mensaje en **inglés**; respuesta al chat en **español**.
- Cumplir `.cursor/rules/git-commits.mdc` (sin coautoría IA).
- Hook rechazado → nuevo commit; sin `--no-verify` salvo petición explícita.

## Comandos relacionados

- Cerrar reto + push: **`/config-git-push`**.
