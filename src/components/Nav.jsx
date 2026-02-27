import { navItems } from '../data/siteData'

function Nav({ current }) {
  return (
    <nav className="nav">
      <p className="brand">Club Toluca</p>
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
