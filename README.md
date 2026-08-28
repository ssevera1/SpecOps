# SpecOps

Apps for the [Even Realities G2](https://www.evenrealities.com/) smart glasses,
built on the Even Hub SDK.

Offline first. Everything here is designed to work with the phone in your pocket
and no network round trip between a gesture and something appearing on the lens.

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

There is no camera and no speaker. These are a heads-up text display with four
gestures, and the app logic runs off-device.

## Architecture

Apps are web applications. The code runs on a server, the phone's Even app loads
it in a WebView, and display output plus input events relay over BLE to the
glasses. So a G2 app is a Vite build that talks to `@evenrealities/even_hub_sdk`,
not an embedded binary.

## Apps

| App | What it does | Status |
|---|---|---|
| [pickup-lines](apps/pickup-lines) |  35 bundled lines across five categories, cycled by gesture | Verified in simulator, untested on hardware |

## Working on this

Each app is self contained under `apps/`.

```bash
cd apps/pickup-lines
npm install
npm run dev          # Vite on :5173
npm run simulator    # renders the G2 display on the desktop
npm run check-layout # verifies no screen overflows 10 rows
```

To sideload onto real glasses, put the machine and the glasses on the same
network and run `npx evenhub qr --url http://<your-ip>:5173`, then scan from the
Even Hub companion app.

## Reference material

The SDK, simulator, templates, and community documentation are cloned as
read-only reference one level up, in `D:\claude\EvenG2\sdk` and
`D:\claude\EvenG2\docs`. They are not part of this repository.

The official kit at `sdk/everything-evenhub` ships as a Claude Code plugin with
13 skills covering the SDK reference, UI, input handling, font measurement, and
the simulator. Reading `plugins/everything-evenhub/skills/sdk-reference/SKILL.md`
is the fastest way into the API.
