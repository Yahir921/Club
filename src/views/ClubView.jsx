import { clubInfo } from '../data/siteData'

function ClubView() {
  return (
    <main>
      <section className="section club-hero">
        <div className="club-hero-content">
          <p className="section-tag">Sobre el club</p>
          <h2>Centro de Formacion de Futbol RED Toluca "Cuna de campeones"</h2>
          <p className="club-hero-text">
            RED Toluca-Cuna de campeones impulsa talento juvenil y futbol competitivo con una
            vision formativa. Trabajamos disciplina, valores y rendimiento para representar al
            barrio con orgullo en cada torneo.
          </p>

          <div className="club-layout">
            <div className="club-panel">
              <p className="club-kicker">Entrenamientos</p>
              <div className="club-line">
                <span className="club-label">Martes</span>
                <span className="club-value">4:30 PM a 18:30 PM</span>
              </div>
              <div className="club-line">
                <span className="club-label">Jueves</span>
                <span className="club-value">4:30 PM a 18:30 PM</span>
              </div>
              <p className="club-subtitle">Juegos fin de semana</p>
            </div>

            <div className="club-panel club-panel-accent">
              <p className="club-kicker">Becas</p>
              <p className="club-cta">Pregunta por tu beca</p>
              <p className="club-subtitle">WhatsApp</p>
              <p className="club-phone">5527561310</p>
              <p className="club-phone">5545819295</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="club-grid club-grid-tight">
          {clubInfo.map((item) => (
            <article key={item.title} className="club-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ClubView
