import { checkLayout, type LabelledScreen } from '@specops/g2-kit'
import { STAGES } from '../src/reads'

const FOOTER = 'swipe: next  tap: another  x2: exit'

const screens: LabelledScreen[] = STAGES.flatMap((stage, s) =>
  stage.lines.map((line, i) => ({
    label: `${stage.name} alt ${i + 1}`,
    screen: {
      header: `${stage.name}  ${s + 1}/${STAGES.length}`,
      body: [line],
      footer: FOOTER,
    },
  })),
)

checkLayout(screens)
