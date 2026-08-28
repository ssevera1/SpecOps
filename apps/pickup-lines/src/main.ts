/**
 * Pickup Lines for the Even Realities G2.
 *
 * Controls:
 *   swipe up / down   previous / next line
 *   single tap        next category
 *   double tap        exit (system confirmation dialog)
 *
 * Everything ships in the bundle, so there is no network call between
 * a gesture and the line appearing.
 */

import {
  waitForEvenAppBridge,
  TextContainerProperty,
  TextContainerUpgrade,
  CreateStartUpPageContainer,
} from '@evenrealities/even_hub_sdk'

import { CATEGORIES, totalLines } from './lines'
import {
  composeScreen,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  PADDING,
  BORDER_WIDTH,
} from './render'

const CONTAINER_ID = 1
const CONTAINER_NAME = 'main'

// Event type constants. The SDK exports OsEventTypeList, but the values
// arrive as plain numbers and zero is omitted by protobuf, so we compare
// against literals after a nullish coalesce.
const SCROLL_UP = 1
const SCROLL_DOWN = 2
const SINGLE_TAP = 0
const DOUBLE_TAP = 3
const FOREGROUND_ENTER = 4
const SYSTEM_EXIT = 7
const ABNORMAL_EXIT = 6

let categoryIndex = 0
let lineIndex = 0

const bridge = await waitForEvenAppBridge()

/** Pushes the current selection to the glasses without a full redraw. */
async function paint(): Promise<void> {
  const content = composeScreen(CATEGORIES[categoryIndex], lineIndex)
  await bridge.textContainerUpgrade(
    new TextContainerUpgrade({
      containerID: CONTAINER_ID,
      containerName: CONTAINER_NAME,
      contentOffset: 0,
      contentLength: 0, // 0 with offset 0 replaces the whole content
      content,
    }),
  )
}

function step(delta: number): void {
  const lines = CATEGORIES[categoryIndex].lines
  // Wrap around so you never hit a dead end mid-conversation.
  lineIndex = (lineIndex + delta + lines.length) % lines.length
}

function nextCategory(): void {
  categoryIndex = (categoryIndex + 1) % CATEGORIES.length
  lineIndex = 0
}

const result = await bridge.createStartUpPageContainer(
  new CreateStartUpPageContainer({
    containerTotalNum: 1,
    textObject: [
      new TextContainerProperty({
        xPosition: 0,
        yPosition: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        borderWidth: BORDER_WIDTH,
        borderColor: 0,
        paddingLength: PADDING,
        containerID: CONTAINER_ID,
        containerName: CONTAINER_NAME,
        content: composeScreen(CATEGORIES[categoryIndex], lineIndex),
        isEventCapture: 1,
      }),
    ],
  }),
)

if (result !== 0) {
  console.error('Failed to create page container, result:', result)
} else {
  console.log(
    `Pickup Lines ready: ${CATEGORIES.length} categories, ${totalLines()} lines`,
  )
}

const unsubscribe = bridge.onEvenHubEvent((event) => {
  // Scroll gestures arrive as textEvent. Taps do not.
  if (event.textEvent) {
    const type = event.textEvent.eventType ?? 0
    if (type === SCROLL_UP) {
      step(-1)
      void paint()
    } else if (type === SCROLL_DOWN) {
      step(1)
      void paint()
    }
    return
  }

  if (event.sysEvent) {
    const type = event.sysEvent.eventType ?? 0

    if (type === SINGLE_TAP) {
      nextCategory()
      void paint()
      return
    }

    if (type === DOUBLE_TAP) {
      // Show the system dialog. Do not tear down here: the user can
      // still cancel, and an unsubscribed app left on screen is dead.
      bridge.shutDownPageContainer(1)
      return
    }

    if (type === FOREGROUND_ENTER) {
      // Re-render, since the display may have been handed to another app.
      void paint()
      return
    }

    if (type === SYSTEM_EXIT || type === ABNORMAL_EXIT) {
      unsubscribe()
      return
    }
  }
})
