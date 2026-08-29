# SpecOps

Apps for the [Even Realities G2](https://www.evenrealities.com/) smart glasses,
built on the Even Hub SDK.

Offline first. Everything here works with the phone in your pocket and no
network round trip between a gesture and something appearing on the lens.

## Hardware reality check

Worth knowing before designing anything, because it rules out most of what
people assume smart glasses do:

| Property | Value |
|---|---|
| Display | 576 x 288 px, 4-bit greyscale |
| Line height | 27 px fixed, so 10 rows per screen |
| Font control | None. No size, no weight, no family |
| Camera | None |
| Speaker | None |
| Input | Temple touchpads, optional R1 ring |
| Gestures | Press, double press, swipe up, swipe down |
| Link | Bluetooth 5.2 |

No camera and no speaker. These are a heads-up text display with four
gestures, and the app logic runs off-device.

## Architecture

Apps are web applications. The code runs on a server, the phone's Even app
loads it in a WebView, and display output plus input events relay over BLE to
the glasses. A G2 app is a Vite build that talks to
`@evenrealities/even_hub_sdk`, not an embedded binary.

## Layout

```
packages/g2-kit/   shared runtime and screen composition
apps/pickup-lines/ 42 lines across 7 categories, named for the psychology they use
apps/jokes/        36 jokes, tap to reveal the punchline
tools/sim.mjs      launches the simulator against a dev server
```

npm workspaces. The kit is consumed as TypeScript source through its
`exports` field; there is no build step for it.

### The kit

`@specops/g2-kit` owns everything that should be fixed once: the bridge,
page creation, event routing, the exit path, the serialised and coalescing
screen painter, and the dev-time reload retry. An app supplies a `render`
function and reacts to three gestures.

```ts
const app = await startApp({ name: 'My App', render })
app.onGesture((g) => { /* 'up' | 'down' | 'tap' */ app.repaint() })
```

`composeScreen({ header, body, footer })` lays out one screen. `body` is a
list of paragraphs; an empty string is a blank row. It measures each paragraph
with `@evenrealities/pretext`, centres the block in the 8 body rows, and trims
with an ellipsis if something would overflow.

`checkLayout(screens)` is what each app's `npm run check-layout` calls. It
throws if any screen would exceed the body budget, so a bad line fails the
build rather than the moment.

## Apps

| App | What it does | Status |
|---|---|---|
| [pickup-lines](apps/pickup-lines) | Lines organised by the psychological mechanism each one runs on | Verified in simulator, untested on hardware |
| [jokes](apps/jokes) | Setup on screen, tap for the punchline, so you control the timing | Verified in simulator, untested on hardware |
| [mind-reader](apps/mind-reader) | A staged cold reading to perform on someone. Six stages, tap for an alternate line | Verified in simulator, untested on hardware |

## Working on this

```bash
npm install          # once, at the root
npm run typecheck    # every workspace
npm run check-layout # every workspace
npm run build        # every workspace

cd apps/jokes
npm run dev            # Vite on this app's port
npm run simulator      # G2 simulator window
npm run simulator:auto # plus the HTTP automation API
```

Each app has its own Vite port so several can run at once: pickup-lines on
5173, jokes on 5174.

To sideload onto real glasses, put the machine and the glasses on the same
network and run `npx evenhub qr --url http://<your-ip>:<port>`, then scan
from the Even Hub companion app.

### Two toolchain quirks

`npx evenhub-simulator` does not work. The published package declares that
bin but npm does not link it into `node_modules/.bin`, so npx misses locally
and 404s against the registry. `tools/sim.mjs` resolves the binary through the
package instead.

Vite full-reloads an entry module that uses top-level await rather than
hot-swapping it. The previous page's container survives in the host and the
reloaded module's `createStartUpPageContainer` returns `invalid`. The kit
catches that, shuts the stale page down, and retries once.

## Reference material

The SDK, simulator, templates, and community documentation are cloned as
read-only reference one level up, in `D:\claude\EvenG2\sdk` and
`D:\claude\EvenG2\docs`. They are not part of this repository.

The official kit at `sdk/everything-evenhub` ships as a Claude Code plugin
with 13 skills. `plugins/everything-evenhub/skills/sdk-reference/SKILL.md` is
the fastest way into the API, with one caution: it documents SDK 0.0.12 and
the shipped package is 0.0.14. Check `node_modules/@evenrealities/even_hub_sdk/dist/index.d.ts`
when a field looks wrong.
