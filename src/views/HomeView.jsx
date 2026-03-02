import { stats } from '../data/siteData'

function HomeView() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <p className="kicker">Pasion por el futbol</p>
          <h1>Un club, una aficion que nunca se rinde.</h1>
          <p>
            Promocionamos nuestro equipo y compartimos toda la informacion del club:
            jugadores, resultados, eventos y actividades para la comunidad.
          </p>
          <a className="cta" href="#/contacto">Unete al club</a>
        </div>
      </header>

      <section className="stats" aria-label="Estadisticas del club">
        {stats.map((item) => (
          <article key={item.label} className="stat-card">
            <p className="stat-value">{item.value}</p>
            <p className="stat-label">{item.label}</p>
          </article>
        ))}
      </section>
    </>
  )
}

export default HomeView
