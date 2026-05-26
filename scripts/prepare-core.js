import { execFile } from 'node:child_process'
import { access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const esbuildBin = resolve(root, 'node_modules/.bin/esbuild')

await access(esbuildBin)

await execFileAsync(esbuildBin, [
  '../uniauth-core/src/entrypoints/root.ts',
  '--bundle',
  '--platform=node',
  '--format=esm',
  '--target=node22',
  '--define:__UNIAUTH_PACKAGE_AUTHOR_EMAIL__="alyldas@ya.ru"',
  '--define:__UNIAUTH_PACKAGE_AUTHOR_NAME__="alyldas"',
  '--define:__UNIAUTH_PACKAGE_LICENSE__="PolyForm-Strict-1.0.0"',
  '--define:__UNIAUTH_PACKAGE_NAME__="@alyldas/uniauth-core"',
  '--define:__UNIAUTH_PACKAGE_REPOSITORY_URL__="git+https://github.com/alyldas/uniauth-core.git"',
  '--outfile=../uniauth-core/dist/index.js',
])

console.log('Prepared local @alyldas/uniauth-core build for the example.')
