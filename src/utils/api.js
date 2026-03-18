const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const API_ROOT = API_BASE.endsWith('/api') ? API_BASE.slice(0, -4) : API_BASE
let csrfToken = null

function runtimeBasePath() {
  if (typeof window === 'undefined') {
    return ''
  }

  const path = window.location.pathname || ''
  const trimmed = path.replace(/\/$/, '')
  if (!trimmed) {
    return ''
  }

  const lastSlash = trimmed.lastIndexOf('/')
  if (lastSlash <= 0) {
    return trimmed
  }

  return trimmed.slice(0, lastSlash)
}

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

export function resolveAssetUrl(url) {
  const value = String(url || '').trim()
  if (!value) {
    return ''
  }

  if (value.startsWith('data:')) {
    return value
  }

  if (/^(https?:)?\/\//i.test(value)) {
    try {
      const parsed = new URL(value, window.location.origin)
      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        return `${window.location.origin}${parsed.pathname}${parsed.search}${parsed.hash}`
      }
    } catch {
      return value
    }
    return value
  }

  const normalized = value.startsWith('/') ? value : `/${value}`
  const base = API_ROOT || runtimeBasePath()
  return `${base}${normalized}`
}
