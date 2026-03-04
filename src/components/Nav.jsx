import { useEffect, useState } from 'react'
import { navItems } from '../data/siteData'

function Nav({ current }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const page = document.querySelector('.page')
    const nonNavElements = page
      ? Array.from(page.children).filter((element) => !element.classList.contains('nav'))
      : []
    const scrollY = window.scrollY

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const preventBackgroundTouch = (event) => {
      if (!event.target.closest('.nav-drawer-panel')) {
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('touchmove', preventBackgroundTouch, { passive: false })
    document.body.classList.add('menu-open')
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'

    nonNavElements.forEach((element) => {
      element.inert = true
      element.setAttribute('aria-hidden', 'true')
    })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('touchmove', preventBackgroundTouch)
      document.body.classList.remove('menu-open')
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''

      nonNavElements.forEach((element) => {
        element.inert = false
        element.removeAttribute('aria-hidden')
      })

      window.scrollTo({ top: scrollY, behavior: 'auto' })
    }
  }, [isOpen])

  return (
    <nav className="nav">
      <p className="brand">
        <img
          className="brand-icon"
          src="/icono-red-toluca.png"
          alt=""
          aria-hidden="true"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
        <span className="brand-title">RED Toluca-Cuna de campeones</span>
      </p>
      <button
        type="button"
        className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
        aria-label={isOpen ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <div className="nav-links">
        {navItems.map((item) => (
          <a key={item.key} href={item.href} className={item.key === current ? 'is-active' : ''}>
            {item.label}
          </a>
        ))}
      </div>
      <div
        className={`nav-drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="nav-drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="nav-drawer-head">
            <span>Menu</span>
            <button
              type="button"
              className="nav-close"
              aria-label="Cerrar menu"
              onClick={() => setIsOpen(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="nav-drawer-links">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={item.key === current ? 'is-active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
