import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import HomeView from './views/HomeView'
import TeamView from './views/TeamView'
import ClubView from './views/ClubView'
import MatchesView from './views/MatchesView'
import ContactView from './views/ContactView'
import { getRouteFromHash } from './utils/routing'

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

  return (
    <div className="page">
      <Nav current={currentRoute} />

      {currentRoute === 'inicio' && <HomeView />}
      {currentRoute === 'equipo' && <TeamView />}
      {currentRoute === 'club' && <ClubView />}
      {currentRoute === 'partidos' && <MatchesView />}
      {currentRoute === 'contacto' && <ContactView />}
    </div>
  )
}

export default App
