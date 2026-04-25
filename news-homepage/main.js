;(function () {
  const nav = document.getElementById('navigation')
  const backdrop = document.getElementById('nav-backdrop')
  const openBtn = document.querySelector('button[aria-controls="navigation"]')
  const closeBtn = nav && nav.querySelector('button[aria-label="Close navigation menu"]')
  if (!nav || !backdrop || !openBtn || !closeBtn) return

  function openMenu() {
    nav.classList.remove('translate-x-full')
    nav.classList.add('translate-x-0')
    backdrop.classList.remove('pointer-events-none', 'opacity-0')
    backdrop.classList.add('pointer-events-auto', 'bg-slate-900/50', 'opacity-100')
    openBtn.setAttribute('aria-expanded', 'true')
    closeBtn.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
  }

  function closeMenu() {
    nav.classList.add('translate-x-full')
    nav.classList.remove('translate-x-0')
    backdrop.classList.add('pointer-events-none', 'opacity-0')
    backdrop.classList.remove('pointer-events-auto', 'bg-slate-900/50', 'opacity-100')
    openBtn.setAttribute('aria-expanded', 'false')
    closeBtn.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  }

  openBtn.addEventListener('click', openMenu)
  closeBtn.addEventListener('click', closeMenu)
  backdrop.addEventListener('click', closeMenu)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu()
  })
})()
