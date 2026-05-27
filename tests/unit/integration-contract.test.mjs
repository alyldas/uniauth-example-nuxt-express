import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { describe, it } from 'node:test'

const files = {
  backend: new URL('../../backend/index.ts', import.meta.url),
  nuxtConfig: new URL('../../nuxt.config.ts', import.meta.url),
  smoke: new URL('../smoke/auth-flow.ts', import.meta.url),
}

describe('example integration contract', () => {
  it('keeps the Nuxt proxy aligned with the Express auth router', async () => {
    const [backend, nuxtConfig, smoke] = await Promise.all([
      readFile(files.backend, 'utf8'),
      readFile(files.nuxtConfig, 'utf8'),
      readFile(files.smoke, 'utf8'),
    ])

    assert.match(backend, /app\.use\(\s*['"]\/auth['"]/)
    assert.match(
      nuxtConfig,
      /apiBase:\s*process\.env\.NUXT_AUTH_BACKEND_ORIGIN/,
    )
    assert.match(smoke, /\/api\/_uniauth\/password-sign-in/)
    assert.match(smoke, /\/api\/_uniauth\/session/)
    assert.match(smoke, /\/api\/_uniauth\/refresh/)
    assert.match(smoke, /\/api\/_uniauth\/logout/)
  })

  it('keeps browser session transport cookie-only in the example', async () => {
    const [backend, nuxtConfig] = await Promise.all([
      readFile(files.backend, 'utf8'),
      readFile(files.nuxtConfig, 'utf8'),
    ])

    assert.match(backend, /name:\s*['"]uniauth_example_session['"]/)
    assert.match(backend, /bearer:\s*false/)
    assert.match(
      nuxtConfig,
      /sessionCookieNames:\s*\[\s*['"]uniauth_example_session['"]\s*\]/,
    )
  })
})
