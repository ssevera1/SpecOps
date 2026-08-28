/**
 * Screen composition for the G2.
 *
 * The display is 576x288 with a fixed 27px line height, so the whole
 * screen is 10 rows. We spend one on the header, one on the footer, and
 * leave the rest for the line itself.
 *
 * The text container wraps long content on its own, so we do not wrap
 * here. We only measure, to learn how many rows the wrapped line will
 * occupy, and pad above and below it to sit roughly centred.
 */

import { measureTextWrap } from '@evenrealities/pretext'
import type { Category } from './lines'

export const SCREEN_WIDTH = 576
export const SCREEN_HEIGHT = 288
export const LINE_HEIGHT = 27
export const PADDING = 4
export const BORDER_WIDTH = 0

/** Usable width once padding and border are removed from both sides. */
export const CONTENT_WIDTH = SCREEN_WIDTH - PADDING * 2 - BORDER_WIDTH * 2

const TOTAL_ROWS = Math.floor(SCREEN_HEIGHT / LINE_HEIGHT)
const BODY_ROWS = TOTAL_ROWS - 2

const FOOTER = 'swipe: next  tap: category  x2: exit'

/** Builds the full screen contents for one line. */
export function composeScreen(category: Category, lineIndex: number): string {
  const line = category.lines[lineIndex]
  const header = `${category.name}  ${lineIndex + 1}/${category.lines.length}`

  // How many rows will the body occupy once the container wraps it?
  const bodyRows = Math.max(1, measureTextWrap(line, CONTENT_WIDTH).lineCount)

  // If a line somehow overflows the body area, trim it rather than let
  // it push the footer off screen. check-layout is the real guard; this
  // is just so a bad line degrades visibly instead of breaking layout.
  const body = bodyRows > BODY_ROWS ? trimToRows(line, BODY_ROWS) : line

  const used = Math.min(bodyRows, BODY_ROWS)
  const spare = BODY_ROWS - used
  const padTop = Math.floor(spare / 2)
  const padBottom = spare - padTop

  return [
    header,
    ...blank(padTop),
    body,
    ...blank(padBottom),
    FOOTER,
  ].join('\n')
}

function blank(n: number): string[] {
  return Array.from({ length: n }, () => '')
}

/**
 * Trims text until it wraps into at most `rows` rows, appending an
 * ellipsis. Binary search on length, measuring each candidate the same
 * way the firmware will wrap it.
 *
 * `pxTruncate` from pretext is not usable here: it fits a string to a
 * single-line pixel budget, and there is no meaningful pixel budget for
 * a multi-row block.
 */
function trimToRows(text: string, rows: number): string {
  const fits = (s: string) =>
    measureTextWrap(s + '...', CONTENT_WIDTH).lineCount <= rows

  if (measureTextWrap(text, CONTENT_WIDTH).lineCount <= rows) return text

  let lo = 0
  let hi = text.length
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2)
    if (fits(text.slice(0, mid))) lo = mid
    else hi = mid - 1
  }
  return text.slice(0, lo).trimEnd() + '...'
}
