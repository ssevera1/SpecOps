/**
 * The corpus, organised by the psychological mechanism each line runs
 * on. The category name is the mechanism, so the header teaches you why
 * the line works while you are using it.
 *
 * Every line is bundled at build time. No network call sits between a
 * gesture and the line appearing.
 *
 * Keep lines under roughly 200 characters. The body area is 8 rows and
 * `npm run check-layout` fails if anything would overflow.
 */

export interface Category {
  /** Shown in the header. Keep it short so the counter fits. */
  name: string
  /** One sentence on the mechanism, for the README and the curious. */
  why: string
  lines: string[]
}

export const CATEGORIES: Category[] = [
  {
    name: 'PRATFALL',
    why: 'Aronson, 1966. A visible flaw makes a competent person more likeable, not less. Admit the nerves first and there is nothing left to catch you on.',
    lines: [
      "I rehearsed an opener for six minutes and lost all of it on the walk over. So this is the opener now.",
      "My hands are doing a thing. I'd like to blame the cold. It is not the cold.",
      "There's a confident version of this in my head. You're getting the live broadcast.",
      "I'm going to say something clever in about ninety seconds. Until then, hi.",
      "I was told to act natural. This is natural. I'm sorry.",
      "I've got nothing. I walked over here on the strength of nothing. That's how sure I was.",
    ],
  },
  {
    name: 'CURIOSITY',
    why: 'Loewenstein\'s information gap. Open a loop and people need to close it. The line is not the hook; the unanswered question is.',
    lines: [
      "I have a theory about you. It takes one drink to test and I'm right about sixty percent of the time.",
      "I noticed something about you that nobody else in here would. I'll tell you if you ask.",
      "You remind me of someone, and it's going to bother me until you tell me your name.",
      "I've got a question I've only ever asked two people. Both said it was a weird question. I'm asking anyway.",
      "There's a reason I came over and it's not the obvious one.",
      "I've been trying to work out what you do for a living. I have three guesses. One of them is insulting.",
    ],
  },
  {
    name: 'THE OUT',
    why: 'Reactance theory, and Gueguen\'s "but you are free" studies. Hand someone a clean exit and they are far more likely not to take it.',
    lines: [
      "You can tell me to get lost. I'd just prefer to hear it from you specifically.",
      "This has a ten-second exit clause. Say the word and I evaporate. Otherwise, hi.",
      "If this is a no, I'll be completely fine, and also go home and write a short poem about it.",
      "I'm going to ask you something, and 'no' is a perfectly good answer that I will take beautifully.",
      "You're free to ignore me. I've been ignored by professionals. You'd be in good company.",
      "Feel free to say you're waiting for someone. I'll nod like I believe it. I'm very good at that.",
    ],
  },
  {
    name: 'COLD READ',
    why: 'The Forer effect. Statements that feel personal but fit almost anyone. Say it with certainty and watch them fill in the details for you.',
    lines: [
      "You look like the friend who plans everything and gets thanked for none of it.",
      "I'm guessing you're the one people call at two in the morning, and somehow you're the difficult one.",
      "You have the face of someone who's been called 'a lot' by people who weren't enough.",
      "You seem like you have a strong opinion about a very specific thing and nobody's asked you about it tonight.",
      "You look smarter than the last three people who talked to you, and like you were nice about it.",
      "I'd guess you're the person who says 'I'm fine' and then quietly rebuilds the whole thing yourself.",
    ],
  },
  {
    name: 'MISDIRECT',
    why: 'Benign violation. Set up the cliche they are braced for, then break it. The laugh is the relief of not getting the line they expected.',
    lines: [
      "Do you believe in love at first sight? Me neither. I've been staring for ten minutes to be thorough.",
      "Is it hot in here or... no, it's just hot in here. I checked. Separate question: hi.",
      "I'd say heaven's missing an angel, but I don't need to invent a whole situation. You're right there.",
      "Did it hurt when you... no. Nope. Not doing that one. I'm better than that. I'm not, but I'd like to be.",
      "Are you from Tennessee? Because I have no idea what comes next. Are you, though?",
      "If I said you had a beautiful body, would you hold it against me? It's a yes or no. I'm being polite.",
    ],
  },
  {
    name: 'RECIPROCITY',
    why: 'Cialdini. Give first and people feel the pull to give back. Offer a secret, a drink, or a story before you ask for anything.',
    lines: [
      "I'll tell you my most embarrassing story, then it's your turn. That's the deal. No backing out.",
      "First drink's on me and the second one's your decision. I think that's fair.",
      "We're going to argue about pineapple on pizza eventually. I'd like to get it out of the way now.",
      "I already know how this ends. You tell it at a dinner party in 2031. I'm hoping I'm at the table.",
      "I'll go first: my worst quality is I talk to strangers in bars. Your turn.",
      "Here's a secret, so now you owe me one: I have no idea what I'm doing. What's yours?",
    ],
  },
  {
    name: 'GLASSES',
    why: 'The pratfall only this hardware can perform. Admitting you are reading the line off your own face is the most honest thing in the room.',
    lines: [
      "I have no camera. For all I know you're a lamp. I'm committed now.",
      "There's a man in my glasses telling me what to say. He is not good at it. I'm still here.",
      "I paid several hundred dollars to have worse ideas closer to my eyes.",
      "My glasses just said the battery's at twelve percent. Same, honestly.",
      "I'm reading this off a heads-up display, so you're not being hit on by me. You're being hit on by a committee.",
      "Sixteen shades of green and not one of them is doing you justice.",
    ],
  },
]

export function totalLines(): number {
  return CATEGORIES.reduce((sum, c) => sum + c.lines.length, 0)
}
