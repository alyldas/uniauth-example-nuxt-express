import express from 'express'
import { createUniAuthExpressRouter } from '@alyldas/uniauth-express'
import { createExampleAuthService, seedDemoAccount } from './auth-service.js'
import { createDatabase } from './database.js'

const host = process.env.EXPRESS_HOST ?? '127.0.0.1'
const port = Number(process.env.EXPRESS_PORT ?? '4000')
const { pool, db } = createDatabase()
const authService = createExampleAuthService(db)
const app = express()

app.use(express.json())
app.get('/health', (_request, response) => {
  response.status(200).json({ ok: true, stack: ['nuxt', 'express', 'drizzle', 'postgres'] })
})
app.use(
  '/auth',
  createUniAuthExpressRouter({
    auth: authService,
    session: {
      cookie: {
        name: 'uniauth_example_session',
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
        },
      },
      bearer: false,
    },
  }),
)

await seedDemoAccount(authService)

const server = app.listen(port, host, () => {
  console.log(
    JSON.stringify(
      {
        type: 'example-backend',
        host,
        port,
        demoAccount: {
          email: 'demo@example.com',
          password: '[redacted]',
        },
        stack: ['express', 'drizzle', 'postgres'],
      },
      null,
      2,
    ),
  )
})

async function shutdown(): Promise<void> {
  server.close()
  await pool.end()
}

process.once('SIGINT', () => {
  void shutdown().finally(() => process.exit(0))
})

process.once('SIGTERM', () => {
  void shutdown().finally(() => process.exit(0))
})
