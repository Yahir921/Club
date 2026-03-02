import { navItems } from '../data/siteData'

function Nav({ current }) {
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
      <div className="nav-links">
        {navItems.map((item) => (
          <a key={item.key} href={item.href} className={item.key === current ? 'is-active' : ''}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Nav
