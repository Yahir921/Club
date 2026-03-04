import { useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../utils/api'

const emptyForm = {
  title: '',
  date: '',
  place: '',
  details: '',
  image: '',
}

function AdminLoginView() {
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [events, setEvents] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)

  const sortedEvents = useMemo(() => [...events], [events])

  const loadEvents = async () => {
    const data = await apiRequest('/events.php')
    setEvents(data.events || [])
  }

  useEffect(() => {
    let isMounted = true

    const bootstrap = async () => {
      try {
        const authData = await apiRequest('/auth.php', { method: 'GET' })
        if (isMounted) {
          setIsLoggedIn(Boolean(authData.authenticated))
        }
      } catch {
        if (isMounted) {
          setIsLoggedIn(false)
        }
      } finally {
        if (isMounted) {
          setAuthChecked(true)
        }
      }
    }

    bootstrap()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      setEvents([])
      return
    }

    loadEvents().catch(() => {
      setMessage('No se pudieron cargar los eventos.')
    })
  }, [isLoggedIn])

  const handleLogin = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')

    try {
      await apiRequest('/auth.php', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      setIsLoggedIn(true)
      setUsername('')
      setPassword('')
      setMessage('Sesion iniciada correctamente.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleLogout = async () => {
    setBusy(true)
    setMessage('')
    try {
      await apiRequest('/auth.php', {
        method: 'POST',
        body: JSON.stringify({ action: 'logout' }),
      })
      setIsLoggedIn(false)
      setEditingId(null)
      setForm(emptyForm)
      setMessage('Sesion cerrada.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEventSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')

    try {
      if (editingId) {
        await apiRequest('/events.php', {
          method: 'PUT',
          body: JSON.stringify({ id: editingId, ...form }),
        })
        setMessage('Evento actualizado.')
      } else {
        await apiRequest('/events.php', {
          method: 'POST',
          body: JSON.stringify(form),
        })
        setMessage('Evento creado.')
      }

      setForm(emptyForm)
      setEditingId(null)
      await loadEvents()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleEdit = (eventItem) => {
    setEditingId(eventItem.id)
    setForm({
      title: eventItem.title || '',
      date: eventItem.date || '',
      place: eventItem.place || '',
      details: eventItem.details || '',
      image: eventItem.image || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm('Seguro que deseas eliminar este evento?')
    if (!confirmed) {
      return
    }

    setBusy(true)
    setMessage('')
    try {
      await apiRequest('/events.php', {
        method: 'DELETE',
        body: JSON.stringify({ id: eventId }),
      })
      setMessage('Evento eliminado.')
      await loadEvents()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  if (!authChecked) {
    return (
      <main className="admin-login-page">
        <section className="admin-login-card">
          <p>Cargando...</p>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-label="Acceso administrador">
        <p className="section-tag">Acceso Privado</p>
        <h1>{isLoggedIn ? 'Panel de Eventos' : 'Login Toluca'}</h1>
        <p className="admin-login-help">
          {isLoggedIn
            ? 'Administra eventos publicados en la seccion informativa.'
            : 'Esta seccion es solo para administradores. Inicia sesion para gestionar contenido.'}
        </p>

        {message && <p className="admin-message">{message}</p>}

        {!isLoggedIn && (
          <form className="admin-login-form" onSubmit={handleLogin}>
            <label htmlFor="admin-user">Usuario</label>
            <input
              id="admin-user"
              name="admin-user"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <label htmlFor="admin-pass">Contrasena</label>
            <input
              id="admin-pass"
              name="admin-pass"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" className="admin-login-btn" disabled={busy}>
              {busy ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        )}

        {isLoggedIn && (
          <>
            <form className="admin-login-form" onSubmit={handleEventSubmit}>
              <label htmlFor="event-title">Titulo</label>
              <input
                id="event-title"
                type="text"
                value={form.title}
                onChange={(event) => handleFormChange('title', event.target.value)}
                required
              />

              <label htmlFor="event-date">Fecha</label>
              <input
                id="event-date"
                type="text"
                placeholder="Sabado 16 de marzo, 9:00 AM"
                value={form.date}
                onChange={(event) => handleFormChange('date', event.target.value)}
                required
              />

              <label htmlFor="event-place">Sede</label>
              <input
                id="event-place"
                type="text"
                value={form.place}
                onChange={(event) => handleFormChange('place', event.target.value)}
                required
              />

              <label htmlFor="event-details">Descripcion</label>
              <textarea
                id="event-details"
                className="admin-textarea"
                value={form.details}
                onChange={(event) => handleFormChange('details', event.target.value)}
                required
              />

              <label htmlFor="event-image">Imagen (URL o ruta)</label>
              <input
                id="event-image"
                type="text"
                placeholder="/icono-red-toluca.png"
                value={form.image}
                onChange={(event) => handleFormChange('image', event.target.value)}
              />

              <div className="admin-actions">
                <button type="submit" className="admin-login-btn" disabled={busy}>
                  {editingId ? 'Guardar cambios' : 'Crear evento'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={() => {
                      setEditingId(null)
                      setForm(emptyForm)
                    }}
                  >
                    Cancelar edicion
                  </button>
                )}
              </div>
            </form>

            <div className="admin-list">
              <h2>Eventos registrados</h2>
              {sortedEvents.length === 0 && <p>No hay eventos registrados.</p>}
              {sortedEvents.map((eventItem) => (
                <article key={eventItem.id} className="admin-event-item">
                  <h3>{eventItem.title}</h3>
                  <p><strong>Fecha:</strong> {eventItem.date}</p>
                  <p><strong>Sede:</strong> {eventItem.place}</p>
                  <p>{eventItem.details}</p>
                  <div className="admin-item-actions">
                    <button
                      type="button"
                      className="admin-secondary-btn"
                      onClick={() => handleEdit(eventItem)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="admin-danger-btn"
                      onClick={() => handleDelete(eventItem.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" className="admin-secondary-btn logout-btn" onClick={handleLogout}>
              Cerrar sesion
            </button>
          </>
        )}
      </section>
    </main>
  )
}

export default AdminLoginView
