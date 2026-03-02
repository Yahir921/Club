import { useEffect, useState } from 'react'
import { navItems } from '../data/siteData'

function Nav({ current }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [current])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('menu-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('menu-open')
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
