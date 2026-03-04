import { useEffect, useState } from 'react'
import { apiRequest } from '../utils/api'

function EventosView() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadEvents = async () => {
      try {
        const data = await apiRequest('/events.php')
        if (isMounted) {
          setEvents(data.events || [])
          setError('')
        }
      } catch {
        if (isMounted) {
          setEvents([])
          setError('No se pudieron cargar los eventos en este momento.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadEvents()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main>
      <section className="section">
        <div className="section-head">
          <p className="section-tag">Eventos</p>
          <h2>Proximos eventos del club</h2>
          <p>
            Consulta las actividades programadas del centro de formacion y mantente al tanto de
            torneos, visorias y convivencias.
          </p>
        </div>

        {loading && <p className="event-empty">Cargando eventos...</p>}
        {!loading && error && <p className="event-empty">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="event-empty">Aun no hay eventos publicados.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="info-grid">
            {events.map((event) => (
              <article key={event.id} className="info-block event-card">
                <img className="event-image" src={event.image} alt={event.title} />
                <h3>{event.title}</h3>
                <ul className="info-list">
                  <li><strong>Fecha:</strong> {event.date}</li>
                  <li><strong>Sede:</strong> {event.place}</li>
                  <li>{event.details}</li>
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default EventosView
