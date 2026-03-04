import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import HomeView from './views/HomeView'
import EventosView from './views/EventosView'
import TeamView from './views/TeamView'
import ClubView from './views/ClubView'
import ReglamentoView from './views/ReglamentoView'
import ContactView from './views/ContactView'
import AdminLoginView from './views/AdminLoginView'
import { getRouteFromHash } from './utils/routing'

const routeTitles = {
  inicio: 'Inicio',
  eventos: 'Eventos',
  equipo: 'Informacion',
  club: 'Club',
  reglamento: 'Reglamento',
  contacto: 'Contacto',
  adminLogin: 'Acceso Administrador',
}

function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromHash(window.location.hash || '#/'))
  const isAdminLoginRoute = currentRoute === 'adminLogin'

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
    <div className={`page ${isAdminLoginRoute ? 'page-no-nav' : ''}`}>
      {!isAdminLoginRoute && <Nav current={currentRoute} />}

      {currentRoute === 'inicio' && <HomeView />}
      {currentRoute === 'eventos' && <EventosView />}
      {currentRoute === 'equipo' && <TeamView />}
      {currentRoute === 'club' && <ClubView />}
      {currentRoute === 'reglamento' && <ReglamentoView />}
      {currentRoute === 'contacto' && <ContactView />}
      {currentRoute === 'adminLogin' && <AdminLoginView />}

      {!isAdminLoginRoute && (
        <div className="wa-float">
          <a
            className="wa-bubble"
            href="https://wa.me/525545819295?text=Hola,%20quiero%20informacion%20del%20club."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar WhatsApp al numero 2"
          >
            <svg viewBox="0 0 24 24" role="img" focusable="false" aria-hidden="true">
              <path d="M19.1 4.9A9.94 9.94 0 0 0 12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5.2-1.4A9.97 9.97 0 0 0 12 22c5.5 0 10-4.5 10-10 0-2.7-1-5.2-2.9-7.1ZM12 20a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1s-.6.7-.8.8c-.1.1-.3.1-.5 0-1.2-.6-2.2-1.5-3-2.7-.1-.2 0-.3.1-.4.1-.1.2-.3.4-.5.1-.1.1-.3.2-.4.1-.1 0-.3 0-.4 0-.1-.5-1.2-.7-1.6-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.3-.2.2-.8.7-.8 1.8s.8 2.1.9 2.2c.1.2 1.6 2.5 4 3.4.5.2 1 .4 1.4.5.6.2 1.1.1 1.5.1.5-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1 0-.2-.2-.2-.4-.3Z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}

export default App
