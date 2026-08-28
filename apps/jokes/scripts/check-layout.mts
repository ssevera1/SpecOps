import { checkLayout, type LabelledScreen } from '@specops/g2-kit'
import { JOKES } from '../src/jokes'

// Every joke has up to two states on screen. Both must fit.
const screens: LabelledScreen[] = JOKES.flatMap((joke, i) => {
  const header = `JOKES  ${i + 1}/${JOKES.length}`
  const out: LabelledScreen[] = [
    {
      label: `joke ${i + 1} setup`,
      screen: { header, body: [joke.setup], footer: 'tap: punchline  swipe: skip  x2: exit' },
    },
  ]
  if (joke.punch !== undefined) {
    out.push({
      label: `joke ${i + 1} revealed`,
      screen: {
        header,
        body: [joke.setup, '', joke.punch],
        footer: 'tap: next  swipe: back/skip  x2: exit',
      },
    })
  }
  return out
})

checkLayout(screens)
