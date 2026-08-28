/**
 * Layout verification for a corpus. Each app enumerates every screen it
 * can show and hands them here. Fails the process if any would overflow
 * the display, so a bad line is caught at build time rather than on
 * someone's face.
 */

import { BODY_ROWS, bodyRows, composeScreen, type Screen } from './screen'

export interface LabelledScreen {
  label: string
  screen: Screen
}

export function checkLayout(screens: LabelledScreen[]): void {
  let worst = 0
  const overflow: string[] = []

  for (const { label, screen } of screens) {
    const rows = bodyRows(screen.body)
    worst = Math.max(worst, rows)
    if (rows > BODY_ROWS) overflow.push(`${label}: ${rows} body rows`)
  }

  console.log(`screens checked:      ${screens.length}`)
  console.log(`worst-case body rows: ${worst} (budget ${BODY_ROWS})`)
  console.log(`overflowing:          ${overflow.length}`)
  for (const o of overflow) console.log(`  ${o}`)

  if (screens.length > 0) {
    const sample = screens[0]
    console.log(`\n--- sample: ${sample.label} ---`)
    console.log(
      composeScreen(sample.screen)
        .split('\n')
        .map((l, i) => `${String(i + 1).padStart(2)}| ${l}`)
        .join('\n'),
    )
  }

  // Throw rather than process.exit so this module stays free of Node
  // globals. It is exported from the same index as the browser runtime.
  // The tsx script wrapper turns an uncaught throw into a non-zero exit.
  if (overflow.length > 0) {
    throw new Error(`${overflow.length} screen(s) overflow the ${BODY_ROWS}-row body`)
  }
}
