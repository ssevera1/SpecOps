# Jokes

36 jokes, bundled. Two-part jokes show the setup and reveal the punchline on
a tap. That is the one thing a heads-up display can do that a joke book
cannot: you hold the beat as long as the room needs.

## Controls

| Gesture | Action |
|---|---|
| Single tap | Reveal the punchline. If already revealed, or a one-liner, next joke |
| Swipe down | Skip to the next joke, unrevealed |
| Swipe up | Back to the previous joke, unrevealed |
| Double tap | Exit, via the system confirmation dialog |

So the normal rhythm is tap, tap, tap: setup, punchline, next setup. Swipes
are for skipping past one that will not land in this room.

## Corpus

`src/jokes.ts`. Each entry is `{ setup, punch? }`. Omit `punch` for a
one-liner, which shows whole.

Keep setups under two rows and punchlines under three, so the revealed state
fits with a blank row between them. `npm run check-layout` tests both states
of every two-part joke and both must fit. Worst case in the current corpus is
4 body rows.

## Running it

```bash
npm run dev            # Vite on :5174
npm run simulator      # G2 simulator window
npm run simulator:auto # plus HTTP automation on :9899
npm run check-layout
```

The runtime, screen composition, reload handling, and painter all live in
`@specops/g2-kit`. This app is the corpus, a render function with two states,
and a gesture handler.
