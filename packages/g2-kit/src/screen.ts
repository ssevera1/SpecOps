/**
 * Screen composition for the G2.
 *
 * The display is 576x288 with a fixed 27px line height, so the whole
 * screen is 10 rows. Apps spend one on a header, one on a footer, and
 * get 8 for the body.
 *
 * The text container wraps long content on its own, so nothing here
 * wraps. We only measure, to learn how many rows each paragraph will
 * take, and pad above and below so the body sits roughly centred.
 */

import { measureTextWrap } from '@evenrealities/pretext'

export const SCREEN_WIDTH = 576
export const SCREEN_HEIGHT = 288
export const LINE_HEIGHT = 27
export const PADDING = 4
export const BORDER_WIDTH = 0

/** Usable width once padding and border are removed from both sides. */
export const CONTENT_WIDTH = SCREEN_WIDTH - PADDING * 2 - BORDER_WIDTH * 2

export const TOTAL_ROWS = Math.floor(SCREEN_HEIGHT / LINE_HEIGHT)
export const BODY_ROWS = TOTAL_ROWS - 2

/** How many rows a paragraph occupies once the firmware wraps it. */
export function rowsFor(text: string): number {
  if (text === '') return 1
  return Math.max(1, measureTextWrap(text, CONTENT_WIDTH).lineCount)
}

export interface Screen {
  header: string
  /** Paragraphs. An empty string is a deliberate blank row. */
  body: string[]
  footer: string
}

/** Rows the body will occupy, before any trimming. */
export function bodyRows(body: string[]): number {
  return body.reduce((n, p) => n + rowsFor(p), 0)
}

/** Builds the full text for one screen. */
export function composeScreen(screen: Screen): string {
  let body = screen.body
  let used = bodyRows(body)

  // check-layout is the real guard against overflow. This exists so a
  // bad line degrades visibly rather than pushing the footer off screen.
  if (used > BODY_ROWS) {
    body = trimBody(body)
    used = bodyRows(body)
  }

  const spare = Math.max(0, BODY_ROWS - used)
  const padTop = Math.floor(spare / 2)
  const padBottom = spare - padTop

  return [
    screen.header,
    ...blank(padTop),
    ...body,
    ...blank(padBottom),
    screen.footer,
  ].join('\n')
}

function blank(n: number): string[] {
  return Array.from({ length: n }, () => '')
}

/**
 * Trims the last paragraph until the whole body fits the row budget,
 * appending an ellipsis. Drops paragraphs from the end if even an empty
 * final paragraph would not fit.
 */
function trimBody(body: string[]): string[] {
  const out = [...body]
  while (out.length > 0) {
    const head = out.slice(0, -1)
    const headRows = bodyRows(head)
    const budget = BODY_ROWS - headRows
    if (budget >= 1) {
      out[out.length - 1] = trimToRows(out[out.length - 1], budget)
      return out
    }
    out.pop()
  }
  return out
}

/**
 * Binary search on length, measuring each candidate the way the firmware
 * wraps it. pretext's pxTruncate is single-line only, so it does not
 * apply to a multi-row block.
 */
export function trimToRows(text: string, rows: number): string {
  if (rowsFor(text) <= rows) return text
  const fits = (s: string) => rowsFor(s + '...') <= rows
  let lo = 0
  let hi = text.length
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2)
    if (fits(text.slice(0, mid))) lo = mid
    else hi = mid - 1
  }
  return text.slice(0, lo).trimEnd() + '...'
}
