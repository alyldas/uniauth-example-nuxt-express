import { DefaultAuthService, createDefaultAuthPolicy } from '@alyldas/uniauth-core'
import { createDrizzleAuthStore } from '@alyldas/uniauth-drizzle'
import type { EmailSender, RateLimiter } from '@alyldas/uniauth-core/contracts'
import type { createDatabase } from './database.js'
import { DemoPasswordHasher } from './demo-password-hasher.js'

const emailSender: EmailSender = {
  async sendEmail() {},
}

const rateLimiter: RateLimiter = {
  async consume() {
    return { allowed: true }
  },
}

export function createExampleAuthService(db: ReturnType<typeof createDatabase>['db']): DefaultAuthService {
  const store = createDrizzleAuthStore({ db: db as never })

  return new DefaultAuthService({
    repos: store,
    transaction: store,
    emailSender,
    passwordHasher: new DemoPasswordHasher(),
    rateLimiter,
    policy: createDefaultAuthPolicy({ allowAutoLink: false }),
  })
}

export async function seedDemoAccount(authService: DefaultAuthService): Promise<void> {
  const email = 'demo@example.com'
  const password = 'demo-password-123'
  const result = await authService.public.provider.signIn({
    assertion: {
      provider: 'demo-seed',
      providerUserId: email,
      email,
      emailVerified: true,
      displayName: 'Demo User',
    },
    metadata: { seed: true },
  })

  const existingPassword = await authService.admin.users.credentials(result.user.id)
  if (existingPassword.some((credential) => credential.type === 'password')) {
    return
  }

  await authService.admin.credentials.setPassword({
    userId: result.user.id,
    email,
    password,
    metadata: { seed: true },
  })
}
