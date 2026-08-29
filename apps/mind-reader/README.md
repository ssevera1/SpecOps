# Mind Reader

A cold reading you perform on someone, staged the way a working cold reader
stages one. 28 lines across 6 stages.

Say "let me read you," glance at the glasses, and deliver each line with
certainty. Pause. Let them fill in the details. They will, and they will
remember it as you having known.

## Controls

| Gesture | Action |
|---|---|
| Swipe down | Next stage |
| Swipe up | Previous stage |
| Single tap | A different line at this stage |
| Double tap | Exit, via the system confirmation dialog |

Swiping past the closer wraps to the cover, which is the start of the next
reading. Each stage remembers which alternate you last used.

## The stages

| Stage | What it does |
|---|---|
| `COVER` | Explains the glasses inside the bit, so glancing sideways reads as part of the act. |
| `RAPPORT` | Names their scepticism before they can use it. A defence described out loud stops working as one. |
| `TWO SIDES` | The Forer core. Opposing traits paired, so whichever side they identify with lands as a hit. |
| `HIDDEN` | Everyone believes they have an unseen self. Describe it warmly and they supply the specifics. |
| `THE HIT` | One line that sounds specific. It is not. Unfinished business, a private plan, an old regret. |
| `CLOSER` | A compliment that feels earned rather than given. End on it and stop talking. |

Every line is a Barnum statement (Forer, 1949): it feels personal and fits
almost anyone. The effect is strongest when the subject believes the reading
was produced for them, which is what the glasses are for.

## Running it

```bash
npm run dev            # Vite on :5175
npm run simulator      # G2 simulator window
npm run simulator:auto # plus HTTP automation on :9900
npm run check-layout
```

Worst case in the current corpus is 3 body rows, for the longest line in
`THE HIT`.
