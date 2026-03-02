import { clubInfo } from '../data/siteData'

function ClubView() {
  return (
    <main>
      <section className="section about">
        <div>
          <p className="section-tag">Sobre el club</p>
          <h2>Informacion institucional del RED Toluca-Cuna de campeones</h2>
          <p>
            RED Toluca-Cuna de campeones impulsa talento juvenil y futbol competitivo con una vision
            formativa. Trabajamos disciplina, valores y rendimiento para representar
            al barrio con orgullo en cada torneo.
          </p>
          <div className="club-grid">
            {clubInfo.map((item) => (
              <article key={item.title} className="club-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="about-box">
          <p>Entrenamientos:</p>
          <strong>Lunes a Viernes - 17:00 a 19:30</strong>
          <p>Categorias:</p>
          <strong>Juvenil y Mayor</strong>
          <p>Director tecnico:</p>
          <strong>Carlos Herrera</strong>
        </div>
      </section>
    </main>
  )
}

export default ClubView
