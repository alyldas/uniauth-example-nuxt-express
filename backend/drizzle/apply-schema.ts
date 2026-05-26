import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Pool } from 'pg'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const schemaPath = resolve(root, 'backend/drizzle/migrations/0000_uniauth.sql')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgres://uniauth:uniauth@127.0.0.1:5432/uniauth_example',
})

try {
  await pool.query(await readFile(schemaPath, 'utf8'))
  console.log('Applied UniAuth example schema.')
} finally {
  await pool.end()
}
