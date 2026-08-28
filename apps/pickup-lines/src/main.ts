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

/** StartUpPageCreateResult.invalid */
const PAGE_CREATE_INVALID = 1

let categoryIndex = 0
let lineIndex = 0

const bridge = await waitForEvenAppBridge()

let painting = false
let repaintQueued = false

/**
 * Pushes the current selection to the glasses without a full redraw.
 *
 * Serialised and coalescing, for two reasons. Content is snapshotted
 * synchronously and then awaited, so two updates in flight can resolve
 * out of order and leave the display showing the older line. And a fast
 * thumb on the touchpad would otherwise queue one BLE write per gesture
 * when only the final state matters.
 *
 * While a write is in flight, further requests just set a flag. When it
 * settles we repaint once from whatever the state is by then.
 */
async function paint(): Promise<void> {
  if (painting) {
    repaintQueued = true
    return
  }
  painting = true
  try {
    do {
      repaintQueued = false
      const content = composeScreen(CATEGORIES[categoryIndex], lineIndex)
      const ok = await bridge.textContainerUpgrade(
        new TextContainerUpgrade({
          containerID: CONTAINER_ID,
          containerName: CONTAINER_NAME,
          contentOffset: 0,
          contentLength: 0, // 0 with offset 0 replaces the whole content
          content,
        }),
      )
      if (!ok) {
        console.error('textContainerUpgrade rejected the update')
      }
    } while (repaintQueued)
  } catch (err) {
    // Without this the screen silently stops updating and the app looks
    // frozen, with nothing in the console to explain why.
    console.error('paint failed:', err)
  } finally {
    painting = false
  }
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

function buildPage(): CreateStartUpPageContainer {
  return new CreateStartUpPageContainer({
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
  })
}

let result = await bridge.createStartUpPageContainer(buildPage())

// StartUpPageCreateResult.invalid. In development this almost always
// means a container from the previous page load is still alive in the
// host: Vite full-reloads this entry module rather than hot-swapping it,
// so the dispose hook below never runs. Tear the stale page down and
// try once more rather than leaving a dead app on screen.
if (result === PAGE_CREATE_INVALID) {
  await bridge.shutDownPageContainer(0)
  result = await bridge.createStartUpPageContainer(buildPage())
}

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

// Vite replaces this module on every edit, which re-runs the code above
// and calls createStartUpPageContainer while container 1 still exists.
// The host rejects that with StartUpPageCreateResult.invalid (1) and the
// app appears to hang until the simulator is restarted. Tear down the
// old container first so the reloaded module starts from a clean page.
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    unsubscribe()
    // Mode 0 exits immediately. Mode 1 would prompt the user, which is
    // wrong for a reload they did not ask for.
    void bridge.shutDownPageContainer(0)
  })
}
