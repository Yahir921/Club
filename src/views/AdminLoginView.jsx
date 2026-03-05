import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, resolveAssetUrl, setCsrfToken } from '../utils/api'

const emptyForm = {
  title: '',
  date: '',
  time: '',
  place: '',
  placeUrl: '',
  image: '',
}

const emptyTimeFields = {
  hour: '',
  minute: '',
  period: 'AM',
}

function normalizeTimeValue(value) {
  const trimmed = String(value || '').trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/)
  if (!match) {
    return ''
  }

  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return ''
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function splitTimeValue(value) {
  const normalized = normalizeTimeValue(value)
  if (!normalized) {
    return { ...emptyTimeFields }
  }

  const [hoursStr, minute] = normalized.split(':')
  const hours = Number(hoursStr)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12

  return { hour: String(hour12), minute, period }
}

function timeFieldsToNormalized(fields) {
  const hourNumber = Number(fields.hour)
  const minuteNumber = Number(fields.minute)
  const period = String(fields.period || '').toUpperCase()

  if (
    Number.isNaN(hourNumber) ||
    Number.isNaN(minuteNumber) ||
    hourNumber < 1 ||
    hourNumber > 12 ||
    minuteNumber < 0 ||
    minuteNumber > 59 ||
    (period !== 'AM' && period !== 'PM')
  ) {
    return ''
  }

  let hour24 = hourNumber % 12
  if (period === 'PM') {
    hour24 += 12
  }

  return `${String(hour24).padStart(2, '0')}:${String(minuteNumber).padStart(2, '0')}`
}

function formatDisplayTime(value) {
  const normalized = normalizeTimeValue(value)
  if (!normalized) {
    return value || '-'
  }

  const [hoursStr, minutes] = normalized.split(':')
  const hours = Number(hoursStr)
  const suffix = hours >= 12 ? 'pm' : 'am'
  const twelveHour = hours % 12 === 0 ? 12 : hours % 12
  return `${twelveHour}:${minutes} ${suffix}`
}

function AdminLoginView() {
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [events, setEvents] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [timeFields, setTimeFields] = useState(emptyTimeFields)
  const [editingId, setEditingId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)

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
          if (authData.csrfToken) {
            setCsrfToken(authData.csrfToken)
          }
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

  useEffect(() => {
    if (!message) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setMessage('')
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [message])

  const logoutSession = useCallback(async (reasonMessage = 'Sesion cerrada.') => {
    await apiRequest('/auth.php', {
      method: 'POST',
      body: JSON.stringify({ action: 'logout' }),
    })
    setIsLoggedIn(false)
    setEditingId(null)
    setForm(emptyForm)
    setTimeFields(emptyTimeFields)
    setMessage(reasonMessage)
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      return undefined
    }

    let timeoutId
    const inactivityMs = 5 * 60 * 1000
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']

    const resetInactivityTimer = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(async () => {
        try {
          await logoutSession('Sesion cerrada por inactividad (5 minutos).')
        } catch {
          setMessage('No se pudo cerrar sesion automaticamente.')
        }
      }, inactivityMs)
    }

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimer, { passive: true })
    })

    resetInactivityTimer()

    return () => {
      window.clearTimeout(timeoutId)
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimer)
      })
    }
  }, [isLoggedIn, logoutSession])

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
      await logoutSession('Sesion cerrada.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleTimePartChange = (part, value) => {
    setTimeFields((prev) => ({ ...prev, [part]: value }))
  }

  const handleEventSubmit = async (event) => {
    event.preventDefault()
    setBusy(true)
    setMessage('')

    try {
      const normalizedTime = timeFieldsToNormalized(timeFields)
      if (!normalizedTime) {
        throw new Error('Hora invalida. Usa hora, minuto y AM/PM.')
      }

      const payload = { ...form, time: normalizedTime }

      if (editingId) {
        await apiRequest('/events.php', {
          method: 'PUT',
          body: JSON.stringify({ id: editingId, ...payload }),
        })
        setMessage('Evento actualizado.')
      } else {
        await apiRequest('/events.php', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        setMessage('Evento creado.')
      }

      setForm(emptyForm)
      setTimeFields(emptyTimeFields)
      setEditingId(null)
      await loadEvents()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  const handleEdit = (eventItem) => {
    const parsedTime = splitTimeValue(eventItem.time || eventItem.details || '')
    setEditingId(eventItem.id)
    setForm({
      title: eventItem.title || '',
      date: eventItem.date || '',
      time: normalizeTimeValue(eventItem.time || eventItem.details || ''),
      place: eventItem.place || '',
      placeUrl: eventItem.placeUrl || '',
      image: eventItem.image || '',
    })
    setTimeFields(parsedTime)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setUploading(true)
    setMessage('')
    try {
      const payload = new FormData()
      payload.append('photo', file)

      const data = await apiRequest('/upload.php', {
        method: 'POST',
        body: payload,
      })

      setForm((prev) => ({ ...prev, image: data.url }))
      setMessage('Foto subida correctamente.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
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
    <main className={`admin-login-page ${isLoggedIn ? 'admin-dashboard-page' : ''}`}>
      <section
        className={`admin-login-card ${isLoggedIn ? 'admin-dashboard-card' : ''}`}
        aria-label="Acceso administrador"
      >
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
            <div className="admin-dashboard-top">
              <button type="button" className="admin-secondary-btn logout-btn" onClick={handleLogout}>
                Cerrar sesion
              </button>
            </div>

            <div className="admin-dashboard-layout">
              <section className="admin-panel admin-panel-form">
                <h2>Agregar o editar evento</h2>
                <form className="admin-login-form" onSubmit={handleEventSubmit}>
                  <label htmlFor="event-title">Nombre del evento</label>
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
                    type="date"
                    value={form.date}
                    onChange={(event) => handleFormChange('date', event.target.value)}
                    required
                  />

                  <label htmlFor="event-time">Hora</label>
                  <div id="event-time" className="admin-time-fields">
                    <input
                      aria-label="Hora"
                      type="text"
                      inputMode="numeric"
                      placeholder="Hr"
                      maxLength={2}
                      value={timeFields.hour}
                      onChange={(event) =>
                        handleTimePartChange('hour', event.target.value.replace(/\D/g, '').slice(0, 2))
                      }
                      required
                    />
                    <input
                      aria-label="Minuto"
                      type="text"
                      inputMode="numeric"
                      placeholder="Min"
                      maxLength={2}
                      value={timeFields.minute}
                      onChange={(event) =>
                        handleTimePartChange('minute', event.target.value.replace(/\D/g, '').slice(0, 2))
                      }
                      required
                    />
                    <select
                      aria-label="Periodo"
                      value={timeFields.period}
                      onChange={(event) => handleTimePartChange('period', event.target.value)}
                      required
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>

                  <label htmlFor="event-place">Lugar</label>
                  <input
                    id="event-place"
                    type="text"
                    value={form.place}
                    onChange={(event) => handleFormChange('place', event.target.value)}
                    required
                  />

                  <label htmlFor="event-place-url">URL del lugar</label>
                  <input
                    id="event-place-url"
                    type="url"
                    placeholder="https://maps.google.com/..."
                    value={form.placeUrl}
                    onChange={(event) => handleFormChange('placeUrl', event.target.value)}
                  />

                  <label htmlFor="event-photo">Fotos del evento</label>
                  <input
                    id="event-photo"
                    className="admin-file-input"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handlePhotoUpload}
                  />
                  <p className="admin-help-line">
                    {uploading
                      ? 'Subiendo foto...'
                      : form.image
                        ? `Foto lista: ${form.image}`
                        : 'Sube una foto para el evento.'}
                  </p>

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
                          setTimeFields(emptyTimeFields)
                        }}
                      >
                        Cancelar edicion
                      </button>
                    )}
                  </div>
                </form>
              </section>

              <section className="admin-panel admin-list">
                <h2>Eventos registrados</h2>
                {sortedEvents.length === 0 && <p>No hay eventos registrados.</p>}
                {sortedEvents.length > 0 && (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Evento</th>
                          <th>Fecha</th>
                          <th>Hora</th>
                          <th>Lugar</th>
                          <th>Foto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedEvents.map((eventItem) => (
                          <tr key={eventItem.id}>
                            <td>{eventItem.title}</td>
                            <td>{eventItem.date}</td>
                            <td>{formatDisplayTime(eventItem.time || eventItem.details)}</td>
                            <td>
                              {eventItem.placeUrl ? (
                                <a href={eventItem.placeUrl} target="_blank" rel="noopener noreferrer">
                                  {eventItem.place}
                                </a>
                              ) : (
                                eventItem.place
                              )}
                            </td>
                            <td>
                              {eventItem.image ? (
                                <img
                                  className="admin-table-image"
                                  src={resolveAssetUrl(eventItem.image)}
                                  alt={eventItem.title}
                                />
                              ) : (
                                'Sin foto'
                              )}
                            </td>
                            <td>
                              <div className="admin-table-actions">
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
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default AdminLoginView
