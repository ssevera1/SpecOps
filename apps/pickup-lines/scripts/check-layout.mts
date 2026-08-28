import { CATEGORIES, totalLines } from '../src/lines'
import { composeScreen, CONTENT_WIDTH } from '../src/render'
import { measureTextWrap } from '@evenrealities/pretext'

let worst = 0, overflow = 0
const offenders: string[] = []
for (const cat of CATEGORIES) {
  for (let i = 0; i < cat.lines.length; i++) {
    const rows = composeScreen(cat, i).split('\n')
    const bodyRows = measureTextWrap(cat.lines[i], CONTENT_WIDTH).lineCount
    // rows array holds header + pads + 1 body string + footer.
    // Real rendered height expands the body string to bodyRows.
    const rendered = rows.length - 1 + bodyRows
    worst = Math.max(worst, rendered)
    if (rendered > 10) { overflow++; offenders.push(`${cat.name}/${i+1}: ${rendered} rows`) }
  }
}
console.log(`categories: ${CATEGORIES.length}, lines: ${totalLines()}`)
console.log(`worst-case rendered rows: ${worst} (screen holds 10)`)
console.log(`overflowing lines: ${overflow}`)
offenders.slice(0,8).forEach(o => console.log('  ' + o))
console.log('\n--- sample: GLASSES line 1 ---')
console.log(composeScreen(CATEGORIES[2], 0).split('\n').map((l,i)=>`${String(i+1).padStart(2)}| ${l}`).join('\n'))
