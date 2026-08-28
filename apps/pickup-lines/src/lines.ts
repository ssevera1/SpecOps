/**
 * The corpus. Bundled at build time so the app works with no network,
 * no API key, and no latency while you are standing in front of someone.
 *
 * Keep lines short. The G2 renders 27px fixed line height into a 288px
 * display, so roughly 10 rows fit and the body area holds about 8 of
 * them after the header and footer. Run `npm run check-layout` after
 * editing; it fails if anything would overflow.
 */

export interface Category {
  /** Shown in the header. Keep it under 12 characters so the counter fits. */
  name: string
  lines: string[]
}

export const CATEGORIES: Category[] = [
  {
    name: 'OPENERS',
    lines: [
      "I practiced this in the mirror and the mirror advised against it.",
      "I'm not going to pretend this is going well. I am going to keep going.",
      "I had one good line and I used it on the bartender. You get the runner-up.",
      "I've been building up to this for eleven minutes. That's the whole pitch.",
      "My friends bet I wouldn't come over here. We're all learning something tonight.",
      "I'm told confidence is attractive. I'm hoping the impression counts.",
      "You looked approachable, which was your first mistake.",
    ],
  },
  {
    name: 'NERD',
    lines: [
      "I would let you deploy to production on a Friday.",
      "You're the only thing in this room with no documented edge cases.",
      "My whole personality is a cached response. You just caused a cache miss.",
      "I'd call you one in a million, but I've seen the population data and it's worse.",
      "You're statistically significant and I have not adjusted for multiple comparisons.",
      "I have excellent error handling everywhere except this exact situation.",
      "If you were a dependency I would pin your exact version and never upgrade.",
    ],
  },
  {
    name: 'GLASSES',
    lines: [
      "I have no camera. For all I know you're a lamp. I'm committed now.",
      "These glasses cost more than my car and they are currently displaying this.",
      "There's a man in my glasses telling me what to say. He is not good at it.",
      "I paid several hundred dollars to have worse ideas closer to my eyes.",
      "I'm reading this off a heads-up display, so somebody thought this was worth building.",
      "I have sixteen shades of green and not one of them is doing you justice.",
      "My glasses wrote this. I'm just the delivery mechanism and I'm underperforming.",
    ],
  },
  {
    name: 'AWFUL',
    lines: [
      "Are you a parking ticket? I'm told there's more to it but I've lost the thread.",
      "If you were a vegetable you'd be a cute-cumber. I heard it as I said it.",
      "Is your dad a boxer? Because... look, I did not write these.",
      "Do you have a map? Because I've committed to this metaphor and I regret it.",
      "You must be tired, because you've been running through my... no. Nope.",
      "Are you French? Because Eiffel for you. I'd like the last four seconds back.",
      "I'd tell you a chemistry joke but the good ones argon.",
    ],
  },
  {
    name: 'HONEST',
    lines: [
      "I had a whole strategy. I've abandoned it. Hi.",
      "I'll level with you: the other four categories are considerably worse.",
      "This is the part where I'd normally overthink it for another twenty minutes.",
      "Statistically this ends badly, but I've never been good at reading a room.",
      "No line. You just seemed worth interrupting my evening for.",
      "I'm going to regret saying nothing more than I'll regret saying this.",
      "I noticed you and decided that was worth telling you out loud. That's it.",
    ],
  },
]

/** Total lines across every category, for the startup log. */
export function totalLines(): number {
  return CATEGORIES.reduce((sum, c) => sum + c.lines.length, 0)
}
