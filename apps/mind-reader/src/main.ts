/**
 * Mind Reader for the Even Realities G2.
 *
 *   swipe down / up   next / previous stage of the reading
 *   tap               a different line at this stage
 *   double tap        exit
 *
 * A reading runs COVER through CLOSER. Swiping past the closer wraps to
 * the cover, which is the start of the next person's reading. Each
 * stage remembers which alternate you last used, so tapping past a line
 * that missed someone stays skipped for the next reading too.
 */

import { startApp, composeScreen } from '@specops/g2-kit'
import { STAGES, totalLines } from './reads'

const FOOTER = 'swipe: next  tap: another  x2: exit'

let stageIndex = 0
const pick: number[] = STAGES.map(() => 0)

function render(): string {
  const stage = STAGES[stageIndex]
  return composeScreen({
    header: `${stage.name}  ${stageIndex + 1}/${STAGES.length}`,
    body: [stage.lines[pick[stageIndex]]],
    footer: FOOTER,
  })
}

const app = await startApp({ name: 'Mind Reader', render })
console.log(`${STAGES.length} stages, ${totalLines()} lines`)

app.onGesture((g) => {
  if (g === 'down') {
    stageIndex = (stageIndex + 1) % STAGES.length
  } else if (g === 'up') {
    stageIndex = (stageIndex - 1 + STAGES.length) % STAGES.length
  } else {
    const n = STAGES[stageIndex].lines.length
    pick[stageIndex] = (pick[stageIndex] + 1) % n
  }
  app.repaint()
})
