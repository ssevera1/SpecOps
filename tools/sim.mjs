// Launches the G2 simulator against a dev server.
//
// The published simulator package declares an `evenhub-simulator` bin that
// npm does not link into node_modules/.bin, so `npx evenhub-simulator`
// misses locally and 404s against the registry. This resolves the binary
// through the package instead, which works regardless of hoisting.
//
//   node tools/sim.mjs <port> [--auto <automationPort>] [--glow]
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { spawn } from 'node:child_process'

const require = createRequire(import.meta.url)
const pkg = require.resolve('@evenrealities/evenhub-simulator/package.json')
const bin = join(dirname(pkg), 'bin', 'index.js')

const [port = '5173', ...rest] = process.argv.slice(2)
const args = [bin, `http://localhost:${port}`]
for (let i = 0; i < rest.length; i++) {
  if (rest[i] === '--auto') args.push('--automation-port', rest[++i] ?? '9898')
  else args.push(rest[i])
}
spawn(process.execPath, args, { stdio: 'inherit' }).on('exit', (c) => process.exit(c ?? 0))
