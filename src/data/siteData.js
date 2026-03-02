export const stats = [
  { value: '1948', label: 'Fundado' },
  { value: '12', label: 'Torneos ganados' },
  { value: '28k', label: 'Aficionados activos' },
]

export const players = [
  { number: 1, name: 'Diego Mendez', role: 'Portero', age: 24 },
  { number: 4, name: 'Luis Rojas', role: 'Defensa central', age: 27 },
  { number: 8, name: 'Marco Salas', role: 'Mediocampista', age: 22 },
  { number: 10, name: 'Javier Ortega', role: 'Capitan', age: 29 },
  { number: 9, name: 'Emilio Cruz', role: 'Delantero', age: 25 },
]

export const clubInfo = [
  { title: 'Mision', text: 'Desarrollar talento deportivo con disciplina, identidad y compromiso social.' },
  { title: 'Vision', text: 'Ser un club referente en formacion y competencia regional.' },
  { title: 'Valores', text: 'Respeto, trabajo en equipo, esfuerzo y juego limpio.' },
]

export const fixtures = [
  {
    date: '03 Mar 2026',
    hour: '19:00',
    tournament: 'Liga Municipal - Jornada 5',
    match: 'RED Toluca-Cuna de campeones vs Halcones FC',
    stadium: 'Estadio Central',
    details: 'Partido clave para mantener el liderato de grupo.',
  },
  {
    date: '10 Mar 2026',
    hour: '18:30',
    tournament: 'Liga Municipal - Jornada 6',
    match: 'Atletico Norte vs RED Toluca-Cuna de campeones',
    stadium: 'Cancha Norte',
    details: 'Visita dificil ante un rival directo en la tabla.',
  },
  {
    date: '17 Mar 2026',
    hour: '20:00',
    tournament: 'Liga Municipal - Jornada 7',
    match: 'RED Toluca-Cuna de campeones vs Real Valle',
    stadium: 'Estadio Central',
    details: 'Encuentro especial con activaciones para la aficion.',
  },
]

export const navItems = [
  { key: 'inicio', label: 'Inicio', href: '#/' },
  { key: 'equipo', label: 'Informacion', href: '#/equipo' },
  { key: 'club', label: 'Club', href: '#/club' },
  { key: 'partidos', label: 'Partidos', href: '#/partidos' },
  { key: 'contacto', label: 'Contacto', href: '#/contacto' },
]

export const routeMap = {
  '#/': 'inicio',
  '#/equipo': 'equipo',
  '#/club': 'club',
  '#/partidos': 'partidos',
  '#/contacto': 'contacto',
}
