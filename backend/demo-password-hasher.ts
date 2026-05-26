import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { PasswordHasher } from '@alyldas/uniauth-core/contracts'

const scryptAsync = promisify(scrypt)

export class DemoPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('base64url')
    const key = (await scryptAsync(password, salt, 64)) as Buffer
    return `scrypt:${salt}:${key.toString('base64url')}`
  }

  async verify(password: string, passwordHash: string): Promise<boolean> {
    const [algorithm, salt, expected] = passwordHash.split(':')

    if (algorithm !== 'scrypt' || !salt || !expected) {
      return false
    }

    const expectedKey = Buffer.from(expected, 'base64url')
    const actualKey = (await scryptAsync(password, salt, expectedKey.length)) as Buffer

    return actualKey.length === expectedKey.length && timingSafeEqual(actualKey, expectedKey)
  }
}
