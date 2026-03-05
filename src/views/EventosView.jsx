import { useEffect, useState } from 'react'
import { apiRequest, resolveAssetUrl } from '../utils/api'

function formatDate(dateValue) {
  if (!dateValue) {
    return '-'
  }

  const parsed = new Date(`${dateValue}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    return dateValue
  }

  return parsed.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function eventStatus(dateValue) {
  const parsed = new Date(`${dateValue}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    return 'Evento'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parsed < today ? 'Finalizado' : 'Proximo'
}

function isFinishedEvent(dateValue) {
  const parsed = new Date(`${dateValue}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parsed < today
}

function modalStatus(dateValue) {
  const parsed = new Date(`${dateValue}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    return 'Evento'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parsed < today ? 'Ya realizado' : 'Proximo evento'
}

function placeLink(place, placeUrl) {
  if (placeUrl) {
    return placeUrl
  }
  if (!place) {
    return '#'
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
}

function formatDisplayTime(value) {
  const trimmed = String(value || '').trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/)
  if (!match) {
    return value || '-'
  }

  const hours = Number(match[1])
  const minutes = match[2]
  if (Number.isNaN(hours) || hours < 0 || hours > 23) {
    return value || '-'
  }

  const suffix = hours >= 12 ? 'pm' : 'am'
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12
  return `${twelveHour}:${minutes} ${suffix}`
}

function EventosView() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)

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
          <div className="events-grid">
            {events.map((event) => (
              <article
                key={event.id}
                className="event-card-v2"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedEvent(event)}
                onKeyDown={(keyEvent) => {
                  if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
                    keyEvent.preventDefault()
                    setSelectedEvent(event)
                  }
                }}
              >
                <div className="event-media">
                  <img
                    className={`event-image-v2 ${isFinishedEvent(event.date) ? 'event-image-finished' : ''}`}
                    src={resolveAssetUrl(event.image)}
                    alt={event.title}
                  />
                  <span className="event-status-chip">{eventStatus(event.date)}</span>
                  <div className="event-logo-badge">
                    <img src="/icono-red-toluca.png" alt="" aria-hidden="true" />
                  </div>
                </div>

                <div className="event-body">
                  <p className="event-kicker">Evento deportivo</p>
                  <h3>{event.title}</h3>
                  <p className="event-meta">
                    <span className="event-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2Zm13 8H4v10h16V10Zm-2-4H6v2h12V6Z" />
                      </svg>
                    </span>
                    {formatDate(event.date)}
                  </p>
                  <p className="event-meta">
                    <span className="event-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm1 5h-2v6l5 3 1-1.7-4-2.3V7Z" />
                      </svg>
                    </span>
                    {formatDisplayTime(event.time || event.details)}
                  </p>
                  <p className="event-meta">
                    <span className="event-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" focusable="false">
                        <path d="M12 2a7 7 0 0 1 7 7c0 5.3-7 13-7 13S5 14.3 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z" />
                      </svg>
                    </span>
                    <a
                      className="event-map-link"
                      href={placeLink(event.place, event.placeUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(clickEvent) => clickEvent.stopPropagation()}
                    >
                      {event.place}
                    </a>
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {selectedEvent && (
          <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div
              className="event-modal-card"
              role="dialog"
              aria-modal="true"
              aria-label={`Detalle del evento ${selectedEvent.title}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="event-modal-close"
                aria-label="Cerrar detalle"
                onClick={() => setSelectedEvent(null)}
              >
                x
              </button>

              <img
                className={`event-modal-image ${isFinishedEvent(selectedEvent.date) ? 'event-image-finished' : ''}`}
                src={resolveAssetUrl(selectedEvent.image)}
                alt={selectedEvent.title}
              />
              <div className="event-modal-logo">
                <img src="/icono-red-toluca.png" alt="" aria-hidden="true" />
              </div>

              <div className="event-modal-body">
                <p className="event-modal-status">{modalStatus(selectedEvent.date)}</p>
                <h3>{selectedEvent.title}</h3>

                <p className="event-meta">
                  <span className="event-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2Zm13 8H4v10h16V10Zm-2-4H6v2h12V6Z" />
                    </svg>
                  </span>
                  {formatDate(selectedEvent.date)}
                </p>
                <p className="event-meta">
                  <span className="event-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm1 5h-2v6l5 3 1-1.7-4-2.3V7Z" />
                    </svg>
                  </span>
                  {formatDisplayTime(selectedEvent.time || selectedEvent.details)}
                </p>
                <p className="event-meta">
                  <span className="event-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path d="M12 2a7 7 0 0 1 7 7c0 5.3-7 13-7 13S5 14.3 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z" />
                    </svg>
                  </span>
                  <a
                    className="event-map-link"
                    href={placeLink(selectedEvent.place, selectedEvent.placeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedEvent.place}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default EventosView
