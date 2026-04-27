const btnShared = document.querySelectorAll('.btn-shared')
const links = document.getElementById('links')
const mainEl = document.getElementById('main')

let isOpen = false
/** Botón con el que se abrió el panel (para devolver el foco al cerrar) */
let lastOpener = null

function setShareA11y(open) {
  links.setAttribute('aria-hidden', String(!open))
  btnShared.forEach((b) => {
    b.setAttribute('aria-expanded', String(open))
    b.setAttribute('aria-label', open ? 'Close share options' : 'Share')
  })
}

/**
 * @param {boolean} open
 * @param {{ focusTarget?: Element | null }} [opts]
 */
function setShareOpen(open, opts = {}) {
  const { focusTarget = null } = opts
  isOpen = open
  if (open && mainEl) {
    links.style.width = mainEl.offsetWidth + 'px'
  }
  links.classList.toggle('hidden', !open)
  setShareA11y(open)
  if (focusTarget && typeof focusTarget.focus === 'function') {
    focusTarget.focus()
  }
}

// Estado inicial
setShareA11y(false)

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isOpen) {
    setShareOpen(false, { focusTarget: lastOpener })
  }
})

document.addEventListener('click', (e) => {
  if (!isOpen) return
  const clickedShareBtn = Array.from(btnShared).some((b) => b.contains(e.target))
  if (!links.contains(e.target) && !clickedShareBtn) {
    setShareOpen(false, { focusTarget: lastOpener })
  }
})

btnShared.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (!isOpen) {
      lastOpener = btn
      setShareOpen(true, { focusTarget: document.getElementById('btn-facebook') })
    } else {
      setShareOpen(false, { focusTarget: lastOpener || btn })
    }
  })
})
