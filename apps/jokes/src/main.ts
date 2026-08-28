/**
 * Jokes for the Even Realities G2.
 *
 *   tap               reveal the punchline, or advance if already shown
 *   swipe down / up   next / previous joke, unrevealed
 *   double tap        exit
 *
 * The whole point is the tap. Setup on screen, hold the beat as long as
 * you like, tap for the punchline. No joke book lets you time it.
 */

import { startApp, composeScreen } from '@specops/g2-kit'
import { JOKES } from './jokes'

let index = 0
let revealed = false

function render(): string {
  const joke = JOKES[index]
  const twoPart = joke.punch !== undefined

  let body: string[]
  let footer: string
  if (twoPart && !revealed) {
    body = [joke.setup]
    footer = 'tap: punchline  swipe: skip  x2: exit'
  } else if (twoPart) {
    body = [joke.setup, '', joke.punch as string]
    footer = 'tap: next  swipe: back/skip  x2: exit'
  } else {
    body = [joke.setup]
    footer = 'tap: next  swipe: back/skip  x2: exit'
  }

  return composeScreen({
    header: `JOKES  ${index + 1}/${JOKES.length}`,
    body,
    footer,
  })
}

function go(delta: number): void {
  index = (index + delta + JOKES.length) % JOKES.length
  revealed = false
}

const app = await startApp({ name: 'Jokes', render })
console.log(`${JOKES.length} jokes loaded`)

app.onGesture((g) => {
  if (g === 'down') {
    go(1)
  } else if (g === 'up') {
    go(-1)
  } else if (JOKES[index].punch !== undefined && !revealed) {
    revealed = true
  } else {
    go(1)
  }
  app.repaint()
})
