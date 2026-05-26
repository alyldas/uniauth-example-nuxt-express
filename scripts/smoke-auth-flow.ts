const baseUrl = process.env.NUXT_ORIGIN ?? 'http://127.0.0.1:3000'

let cookie = ''

const signedIn = await request('/api/_uniauth/password-sign-in', {
  method: 'POST',
  body: {
    email: 'demo@example.com',
    password: 'demo-password-123',
  },
})
assertStatus(signedIn, 200)
assertJson(await signedIn.response.text(), 'sign-in')

const session = await request('/api/_uniauth/session')
assertStatus(session, 200)
assertJson(await session.response.text(), 'session')

const refreshed = await request('/api/_uniauth/refresh', { method: 'POST' })
assertStatus(refreshed, 200)
assertJson(await refreshed.response.text(), 'refresh')

const loggedOut = await request('/api/_uniauth/logout', { method: 'POST' })
assertStatus(loggedOut, 204)

const afterLogout = await request('/api/_uniauth/session')
assertStatus(afterLogout, 204)

console.log('Auth smoke flow passed.')

async function request(
  path: string,
  options: {
    readonly method?: 'GET' | 'POST'
    readonly body?: Record<string, unknown>
  } = {},
): Promise<{ response: Response }> {
  const init: RequestInit = {
    method: options.method ?? 'GET',
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...(cookie ? { cookie } : {}),
    },
  }

  if (options.body) {
    init.body = JSON.stringify(options.body)
  }

  const response = await fetch(`${baseUrl}${path}`, init)

  const setCookie = response.headers.get('set-cookie')
  if (setCookie) {
    cookie = setCookie
      .split(',')
      .map((part) => part.split(';')[0])
      .filter(Boolean)
      .join('; ')
  }

  return { response }
}

function assertStatus(result: { readonly response: Response }, expected: number): void {
  if (result.response.status !== expected) {
    throw new Error(`Expected ${expected}, got ${result.response.status} for ${result.response.url}`)
  }
}

function assertJson(body: string, label: string): void {
  try {
    JSON.parse(body)
  } catch (error) {
    throw new Error(`${label} returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`)
  }
}
