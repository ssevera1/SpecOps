# Pickup Lines

42 lines across 7 categories, all bundled at build time. No network call sits
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

## The categories are the mechanisms

Each category is named for the psychological effect its lines run on. The
header teaches you why the line works while you are using it.

| Category | Mechanism |
|---|---|
| `PRATFALL` | Aronson, 1966. A visible flaw makes a competent person more likeable. Admit the nerves first and there is nothing left to catch you on. |
| `CURIOSITY` | Loewenstein's information gap. Open a loop and people need to close it. The unanswered question is the hook. |
| `THE OUT` | Reactance theory, and Gueguen's "but you are free" studies. Hand someone a clean exit and they are more likely not to take it. |
| `COLD READ` | The Forer effect. Statements that feel personal but fit almost anyone. Say it with certainty and they fill in the details. |
| `MISDIRECT` | Benign violation. Set up the cliche they are braced for, then break it. The laugh is relief. |
| `RECIPROCITY` | Cialdini. Give first and people feel the pull to give back. A secret, a drink, or a story before you ask for anything. |
| `GLASSES` | The pratfall only this hardware can perform. Admitting you are reading the line off your own face is the most honest thing in the room. |

The `why` field on each category in `src/lines.ts` carries the one-sentence
version.

## Layout

The screen is 10 rows of 27px. One row is the header (`CATEGORY  n/total`),
one is the footer with the control hints, and the body sits centred in the
remaining eight.

`npm run check-layout` measures every line with `@evenrealities/pretext` and
fails if any would push past the budget. Run it after adding lines. Worst case
in the current corpus is 2 body rows.

## Running it

```bash
npm run dev            # Vite on :5173
npm run simulator      # G2 simulator window
npm run simulator:auto # plus HTTP automation on :9898
npm run check-layout
```

The runtime, screen composition, reload handling, and painter all live in
`@specops/g2-kit`. This app is the corpus, a render function, and a gesture
handler.
