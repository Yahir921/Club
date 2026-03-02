import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import HomeView from './views/HomeView'
import TeamView from './views/TeamView'
import ClubView from './views/ClubView'
import ReglamentoView from './views/ReglamentoView'
import ContactView from './views/ContactView'
import { getRouteFromHash } from './utils/routing'

const routeTitles = {
  inicio: 'Inicio',
  equipo: 'Informacion',
  club: 'Club',
  reglamento: 'Reglamento',
  contacto: 'Contacto',
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash(window.location.hash || '#/'))

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#/'
    }

    const onHashChange = () => {
      setCurrentRoute(getRouteFromHash(window.location.hash))
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = routeTitles[currentRoute] || 'RED Toluca-Cuna de campeones'
  }, [currentRoute])

  return (
    <div className="page">
      <Nav current={currentRoute} />

      {currentRoute === 'inicio' && <HomeView />}
      {currentRoute === 'equipo' && <TeamView />}
      {currentRoute === 'club' && <ClubView />}
      {currentRoute === 'reglamento' && <ReglamentoView />}
      {currentRoute === 'contacto' && <ContactView />}

    </div>
  )
}

export default App
