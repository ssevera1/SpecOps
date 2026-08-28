/**
 * Pickup Lines for the Even Realities G2.
 *
 *   swipe down / up   next / previous line
 *   tap               next category
 *   double tap        exit
 */

import { startApp, composeScreen } from '@specops/g2-kit'
import { CATEGORIES, totalLines } from './lines'

const FOOTER = 'swipe: next  tap: category  x2: exit'

let categoryIndex = 0
let lineIndex = 0

function render(): string {
  const cat = CATEGORIES[categoryIndex]
  return composeScreen({
    header: `${cat.name}  ${lineIndex + 1}/${cat.lines.length}`,
    body: [cat.lines[lineIndex]],
    footer: FOOTER,
  })
}

const app = await startApp({ name: 'Pickup Lines', render })
console.log(`${CATEGORIES.length} categories, ${totalLines()} lines`)

app.onGesture((g) => {
  const lines = CATEGORIES[categoryIndex].lines
  if (g === 'down') {
    lineIndex = (lineIndex + 1) % lines.length
  } else if (g === 'up') {
    lineIndex = (lineIndex - 1 + lines.length) % lines.length
  } else {
    categoryIndex = (categoryIndex + 1) % CATEGORIES.length
    lineIndex = 0
  }
  app.repaint()
})
