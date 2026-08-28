# Pickup Lines

Five categories, 35 lines, all bundled at build time. No network call sits
between a gesture and a line appearing, which matters when the alternative is
standing in silence in front of someone.

## Controls

| Gesture | Action |
|---|---|
| Swipe down | Next line |
| Swipe up | Previous line |
| Single tap | Next category |
| Double tap | Exit, via the system confirmation dialog |

Lines wrap around within a category, so there is no dead end.

## Categories

`OPENERS`, `NERD`, `GLASSES`, `AWFUL`, `HONEST`.

`GLASSES` is self referential, on the theory that the funniest thing available
is admitting out loud that you are reading a line off a heads-up display.
`AWFUL` is deliberately bad and knows it.

## Layout

The screen is 10 rows of 27px. One row is the header (`CATEGORY  n/total`), one
is the footer with the control hints, and the body sits roughly centred in the
remaining eight.

`npm run check-layout` measures every line with `@evenrealities/pretext` and
fails loudly if any would push past 10 rows. Run it after adding lines.

## Running it

```bash
npm run dev            # Vite on :5173
npm run simulator      # G2 simulator window
npm run simulator:auto # simulator plus HTTP automation on :9898
npm run check-layout
```

`npm run simulator` invokes the binary through its path on purpose. The
published package declares an `evenhub-simulator` bin that npm does not link
into `node_modules/.bin`, so `npx evenhub-simulator` misses locally and tries
the registry, where it 404s.

## Reload handling

Vite full-reloads this entry module rather than hot-swapping it, because of the
top-level await. The previous page's container survives in the host, so the
reloaded module's `createStartUpPageContainer` returns
`StartUpPageCreateResult.invalid` and the app looks hung until you restart the
simulator.

`main.ts` handles that: on `invalid` it shuts the stale page down and retries
once. There is also an `import.meta.hot.dispose` hook for the case where Vite
does hot-swap rather than reload.
