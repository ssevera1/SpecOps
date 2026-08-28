/**
 * The corpus. Bundled at build time so the app works with no network,
 * no API key, and no latency while you are standing in front of someone.
 *
 * Keep lines short. The G2 renders 27px fixed line height into a 288px
 * display, so roughly 10 lines fit on screen and the body area holds
 * about 6 of them after the header and footer.
 */

export interface Category {
  /** Shown in the header. Keep it under 12 characters so the counter fits. */
  name: string
  lines: string[]
}

export const CATEGORIES: Category[] = [
  {
    name: 'SMOOTH',
    lines: [
      "I was going to wait for a sign. Then you walked in, so I'm calling it.",
      "I have a terrible memory for names, which is a problem, because I'd like to remember yours.",
      "You look like the most interesting conversation in this room. I'd like to test that.",
      "I had a whole plan for tonight. You have made it considerably worse.",
      "Two options: I walk away and regret it, or I say hello badly. Hello.",
      "You seem like someone with good stories. I have time and no dignity.",
    ],
  },
  {
    name: 'NERDY',
    lines: [
      "You must be a rare exception, because you broke my pattern matching.",
      "I'd call you the missing semicolon, but you are clearly the whole function.",
      "My depth perception is fine. My judgment around you is the problem.",
      "If you were a dependency, I would pin your exact version.",
      "I ran the numbers. Talking to you has the highest expected value in the room.",
      "You are statistically significant and I have the sample size to prove it.",
    ],
  },
  {
    name: 'GLASSES',
    lines: [
      "These glasses have no camera, so you will have to describe yourself to me.",
      "I am reading this off a heads-up display. That is how little I trust myself right now.",
      "My glasses suggested this line. Blame the firmware, not me.",
      "I have 16 shades of green and none of them do you justice.",
      "Yes, I am wearing computer glasses. Yes, this is exactly what I am using them for.",
      "Somewhere a developer wrote this line for me. I hope he is proud.",
    ],
  },
  {
    name: 'TERRIBLE',
    lines: [
      "Is your name Wi-Fi? Because I am feeling a connection. I am so sorry.",
      "I would tell you a chemistry joke, but I know I would not get a reaction.",
      "Are you a parking ticket? Because you have got FINE written all over you. I hate myself.",
      "I am not a photographer, but I can picture us arguing about this line later.",
      "Do you have a map? I keep getting lost in this metaphor.",
      "You had me at hello. You lost me at this line. Let me start over.",
    ],
  },
  {
    name: 'SINCERE',
    lines: [
      "No line. I just thought you seemed worth interrupting my evening for.",
      "I do not have anything clever. I would still like to buy you a drink.",
      "This is the part where I would normally overthink it. Hi.",
      "I noticed you, and I decided that was worth telling you.",
      "I am going to regret not saying anything more than saying this. Hello.",
      "You looked like someone I would like to know. That is the whole pitch.",
    ],
  },
]

/** Total lines across every category, for the startup log. */
export function totalLines(): number {
  return CATEGORIES.reduce((sum, c) => sum + c.lines.length, 0)
}
