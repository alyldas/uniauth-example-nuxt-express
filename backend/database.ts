import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { uniauthDrizzleSchema } from '@alyldas/uniauth-drizzle'

export function createDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgres://uniauth:uniauth@127.0.0.1:5432/uniauth_example',
  })

  return {
    pool,
    db: drizzle(pool, { schema: uniauthDrizzleSchema }),
  }
}
