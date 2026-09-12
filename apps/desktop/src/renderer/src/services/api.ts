const API_URL = import.meta.env.RENDERER_VITE_API_URL ?? 'http://127.0.0.1:3333'

console.log('[API] URL configurada:', API_URL)

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`

  console.log('[API] Requisição:', {
    url,
    method: options?.method ?? 'GET'
  })

  try {
    const headers = new Headers(options?.headers || {})

    if (options?.body) {
      headers.set('Content-Type', 'application/json')
    }

    const response = await fetch(url, {
      ...options,

      headers
    })

    console.log('[API] Resposta:', {
      url,
      status: response.status,
      ok: response.ok
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)

      console.error('[API] Erro retornado pelo servidor:', error)

      throw new Error(error?.message ?? `Erro HTTP ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('[API] Falha na comunicação:', error)

    throw error
  }
}
