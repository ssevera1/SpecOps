/**
 * App runtime for a single full-screen text container on the G2.
 *
 * Owns the bridge, page creation, event routing, the exit path, and the
 * dev-time reload problem. An app supplies a render function and reacts
 * to gestures. Everything else is here so it is fixed once.
 */

import {
  waitForEvenAppBridge,
  TextContainerProperty,
  TextContainerUpgrade,
  CreateStartUpPageContainer,
} from '@evenrealities/even_hub_sdk'

import { SCREEN_WIDTH, SCREEN_HEIGHT, PADDING, BORDER_WIDTH } from './screen'

export type Gesture = 'up' | 'down' | 'tap'

export interface AppOptions {
  /** Used in the startup log line. */
  name: string
  /** Returns the full screen text for the current state. */
  render: () => string
}

export interface G2App {
  /** Schedules a repaint. Coalesces while a write is in flight. */
  repaint(): void
  /** Subscribes to gestures. Returns an unsubscribe function. */
  onGesture(handler: (gesture: Gesture) => void): () => void
}

const CONTAINER_ID = 1
const CONTAINER_NAME = 'main'

// Event type values arrive as plain numbers, and zero is omitted by
// protobuf, so we compare against literals after a nullish coalesce.
const SCROLL_UP = 1
const SCROLL_DOWN = 2
const SINGLE_TAP = 0
const DOUBLE_TAP = 3
const FOREGROUND_ENTER = 4
const ABNORMAL_EXIT = 6
const SYSTEM_EXIT = 7

/** StartUpPageCreateResult.invalid */
const PAGE_CREATE_INVALID = 1

export async function startApp(opts: AppOptions): Promise<G2App> {
  const bridge = await waitForEvenAppBridge()
  const handlers = new Set<(g: Gesture) => void>()

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
          content: opts.render(),
          isEventCapture: 1,
        }),
      ],
    })
  }

  let result = await bridge.createStartUpPageContainer(buildPage())

  // In development this almost always means a container from the
  // previous page load is still alive in the host. Vite full-reloads an
  // entry module with top-level await rather than hot-swapping it, so
  // the dispose hook below never runs. Tear the stale page down and try
  // once more rather than leaving a dead app on screen.
  if (result === PAGE_CREATE_INVALID) {
    await bridge.shutDownPageContainer(0)
    result = await bridge.createStartUpPageContainer(buildPage())
  }

  if (result !== 0) {
    console.error(`${opts.name}: failed to create page container, result ${result}`)
  } else {
    console.log(`${opts.name} ready`)
  }

  // Serialised and coalescing. Content is snapshotted synchronously and
  // then awaited, so two writes in flight can resolve out of order and
  // leave the older one on screen. Local latency in the simulator never
  // shows this. BLE to real glasses will.
  let painting = false
  let queued = false

  async function paint(): Promise<void> {
    if (painting) {
      queued = true
      return
    }
    painting = true
    try {
      do {
        queued = false
        const ok = await bridge.textContainerUpgrade(
          new TextContainerUpgrade({
            containerID: CONTAINER_ID,
            containerName: CONTAINER_NAME,
            contentOffset: 0,
            contentLength: 0,
            content: opts.render(),
          }),
        )
        if (!ok) console.error(`${opts.name}: textContainerUpgrade rejected the update`)
      } while (queued)
    } catch (err) {
      // Without this the screen silently stops updating and nothing in
      // the console explains why.
      console.error(`${opts.name}: paint failed`, err)
    } finally {
      painting = false
    }
  }

  function emit(g: Gesture): void {
    for (const h of handlers) h(g)
  }

  const unsubscribe = bridge.onEvenHubEvent((event) => {
    // Scroll gestures arrive as textEvent. Taps do not.
    if (event.textEvent) {
      const type = event.textEvent.eventType ?? 0
      if (type === SCROLL_UP) emit('up')
      else if (type === SCROLL_DOWN) emit('down')
      return
    }

    if (event.sysEvent) {
      const type = event.sysEvent.eventType ?? 0
      if (type === SINGLE_TAP) {
        emit('tap')
      } else if (type === DOUBLE_TAP) {
        // Show the system dialog. Do not tear down here: the user can
        // still cancel, and an unsubscribed app left on screen is dead.
        bridge.shutDownPageContainer(1)
      } else if (type === FOREGROUND_ENTER) {
        void paint()
      } else if (type === SYSTEM_EXIT || type === ABNORMAL_EXIT) {
        unsubscribe()
      }
    }
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      unsubscribe()
      void bridge.shutDownPageContainer(0)
    })
  }

  return {
    repaint: () => void paint(),
    onGesture(handler) {
      handlers.add(handler)
      return () => handlers.delete(handler)
    },
  }
}
