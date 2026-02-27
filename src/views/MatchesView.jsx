import { fixtures } from '../data/siteData'

function MatchesView() {
  return (
    <main>
      <section className="section fixtures">
        <div className="section-head">
          <p className="section-tag">Calendario</p>
          <h2>Partidos con informacion completa</h2>
        </div>
        <div className="fixture-list">
          {fixtures.map((fixture) => (
            <article key={fixture.match} className="fixture-item">
              <div className="fixture-date-block">
                <p className="fixture-date">{fixture.date}</p>
                <p className="fixture-hour">{fixture.hour}</p>
              </div>
              <div>
                <p className="fixture-tournament">{fixture.tournament}</p>
                <h3>{fixture.match}</h3>
                <p>{fixture.stadium}</p>
                <p className="fixture-details">{fixture.details}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default MatchesView
