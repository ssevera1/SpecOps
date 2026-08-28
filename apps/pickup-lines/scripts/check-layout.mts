import { checkLayout, type LabelledScreen } from '@specops/g2-kit'
import { CATEGORIES } from '../src/lines'

const FOOTER = 'swipe: next  tap: category  x2: exit'

const screens: LabelledScreen[] = CATEGORIES.flatMap((cat) =>
  cat.lines.map((line, i) => ({
    label: `${cat.name} ${i + 1}`,
    screen: {
      header: `${cat.name}  ${i + 1}/${cat.lines.length}`,
      body: [line],
      footer: FOOTER,
    },
  })),
)

checkLayout(screens)
