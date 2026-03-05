const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
let csrfToken = null

export function setCsrfToken(token) {
  if (typeof token === 'string' && token.length > 0) {
    csrfToken = token
  }
}

async function parseJson(response) {
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error('Respuesta no valida del servidor')
  }

  return response.json()
}

export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData
  const headers = isFormData
    ? { ...(options.headers || {}) }
    : {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      }

  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  })

  const data = await parseJson(response)
  if (data?.csrfToken) {
    setCsrfToken(data.csrfToken)
  }
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || 'Error en la solicitud')
  }

  return data
}
