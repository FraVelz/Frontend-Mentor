/**
 * Focus: {@link setShareOpen} al abrir pasa el foco al primer control (getFirstFocusable);
 * al cerrar, devuelve el foco al gatillo; Escape o clic fuera cierra el panel.
 */
const btnShared = document.querySelectorAll('.btn-shared')
const links = document.getElementById('links')
const mainEl = document.getElementById('main')

let isOpen = false
/** Botón con el que se abrió el panel (para devolver el foco al cerrar) */
let lastOpener = null

/**
 * Primer control enfocable dentro del popover (enlaces, botones, etc.).
 * @param {ParentNode | null} container
 * @returns {HTMLElement | null}
 */
function getFirstFocusable(container) {
  if (!container) return null
  const el = container.querySelector(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
  )
  return el instanceof HTMLElement ? el : null
}

/** Enfoca tras repintar (doble rAF) para diálogos: el destino queda en el árbol de accesibilidad y pintado. */
function applyFocus(target) {
  if (!target || typeof target.focus !== 'function') return
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      target.focus()
    })
  })
}

function setShareA11y(open) {
  if (open) {
    links.removeAttribute('aria-hidden')
  } else {
    links.setAttribute('aria-hidden', 'true')
  }
  btnShared.forEach((b) => {
    b.setAttribute('aria-haspopup', 'dialog')
    b.setAttribute('aria-expanded', String(open))
    b.setAttribute('aria-label', open ? 'Close share options' : 'Share, opens a panel')
  })
}

/**
 * Mueve el foco al abrir: primer control interactivo, o al contenedor con tabindex="-1" si no hay.
 * Al cerrar, devuelve el foco al gatillo y quita tabindex del contenedor.
 * @param {boolean} open
 * @param {{ focusOnClose?: Element | null }} [opts]
 */
function setShareOpen(open, opts = {}) {
  const { focusOnClose = null } = opts
  isOpen = open
  if (open && mainEl) {
    links.style.width = mainEl.offsetWidth + 'px'
  }
  links.classList.toggle('hidden', !open)
  setShareA11y(open)

  if (open) {
    const toFocus = getFirstFocusable(links) || links
    if (toFocus === links) {
      links.setAttribute('tabindex', '-1')
    } else {
      links.removeAttribute('tabindex')
    }
    applyFocus(toFocus)
  } else {
    links.removeAttribute('tabindex')
    applyFocus(focusOnClose)
  }
}

// Estado inicial
setShareA11y(false)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) {
    setShareOpen(false, { focusOnClose: lastOpener })
  }
})

document.addEventListener('click', (e) => {
  if (!isOpen) return
  const clickedShareBtn = Array.from(btnShared).some((b) => b.contains(e.target))
  if (!links.contains(e.target) && !clickedShareBtn) {
    setShareOpen(false, { focusOnClose: lastOpener })
  }
})

btnShared.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (!isOpen) {
      lastOpener = btn
      setShareOpen(true)
    } else {
      setShareOpen(false, { focusOnClose: lastOpener || btn })
    }
  })
})
