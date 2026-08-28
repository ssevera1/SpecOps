# Pickup Lines

Five categories, 30 lines, all bundled at build time. No network call sits
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

`SMOOTH`, `NERDY`, `GLASSES`, `TERRIBLE`, `SINCERE`.

The `GLASSES` set is self referential, on the theory that the funniest thing
available is admitting you are reading a line off a heads-up display.

## Layout

The screen is 10 rows of 27px. One row is the header (`CATEGORY  n/total`), one
is the footer with the control hints, and the body sits roughly centred in the
remaining eight.

`npm run check-layout` measures every line with `@evenrealities/pretext` and
fails loudly if any of them would push past 10 rows. Run it after adding lines.
