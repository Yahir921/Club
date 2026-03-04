function EventosView() {
  const upcomingEvents = [
    {
      title: 'Clinica de futbol formativo',
      date: 'Sabado 16 de marzo, 9:00 AM',
      place: 'Campos Morlan (Sede Cuautitlan)',
      details: 'Sesion especial para tecnica individual, coordinacion y definicion por categorias.',
      image: '/icono-red-toluca.png',
    },
    {
      title: 'Visoria interna RED Toluca',
      date: 'Domingo 24 de marzo, 8:30 AM',
      place: 'Canchas GEO (Sede Jaltenco)',
      details: 'Evaluacion deportiva para seguimiento de jugadores con proyeccion competitiva.',
      image: '/icono-red-toluca.png',
    },
    {
      title: 'Torneo amistoso intersedes',
      date: 'Sabado 6 de abril, 10:00 AM',
      place: 'Canchas GEO y Campos Morlan',
      details: 'Jornada de partidos entre categorias para fortalecer ritmo de competencia.',
      image: '/icono-red-toluca.png',
    },
    {
      title: 'Convivencia familiar del club',
      date: 'Domingo 21 de abril, 1:00 PM',
      place: 'Instalaciones del club',
      details: 'Actividad de integracion entre jugadores, entrenadores y familias.',
      image: '/icono-red-toluca.png',
    },
  ]

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

        <div className="info-grid">
          {upcomingEvents.map((event) => (
            <article key={event.title} className="info-block event-card">
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
      </section>
    </main>
  )
}

export default EventosView
