/**
 * A cold reading, staged the way a working cold reader stages one.
 *
 * Every line is a Forer statement: it feels personal and fits almost
 * anyone. The craft is in the structure. Name their scepticism first so
 * it stops being a defence. Give two-sided traits so whichever side
 * they identify with counts as a hit. Reference the universal private
 * self. Then one line that sounds specific, and a closer that feels
 * earned.
 *
 * Deliver with certainty. Pause after each line. Let them fill in the
 * details; they will, and they will remember it as you having known.
 *
 * Each stage has alternates. Tap cycles them, so if a line clearly
 * misses the person in front of you, you move to one that will not.
 */

export interface Stage {
  name: string
  why: string
  lines: string[]
}

export const STAGES: Stage[] = [
  {
    name: 'COVER',
    why: 'Explain the glasses inside the bit, so glancing sideways reads as part of the act rather than as reading notes.',
    lines: [
      "I'm going to read you. I have to glance to the side to do it. That's not a tell, it's where I keep the notes.",
      "Give me a second. The glasses are calibrating to you. That's not a real thing, but you looked up, which is.",
      "Fair warning: I'm about to be accurate, and you're going to be irritated about it.",
    ],
  },
  {
    name: 'RAPPORT',
    why: 'Name their scepticism before they can use it. A defence that has been described out loud stops working as a defence.',
    lines: [
      "You don't trust this yet. Good. You've been right not to trust things more often than you've been wrong.",
      "You're already deciding whether this is worth your time. You do that with people too, and you're usually right.",
      "You came in tonight with something on your mind, and you've done a good job of not letting it show.",
      "You read people fast. That's why this is going to be slightly annoying: for once it's going the other way.",
      "You've got a resting expression that people misread. You stopped correcting them a long time ago.",
    ],
  },
  {
    name: 'TWO SIDES',
    why: 'The Forer core. Pair opposing traits so whichever one they identify with lands as a hit. Everyone is both.',
    lines: [
      "You can be the loudest one in the room, and you can go a whole day without a word, and both of those feel like you.",
      "You need people more than you let on, and you need to be alone more than they'd guess. Neither side gets enough.",
      "You're disciplined about the things you care about and completely unreasonable about the rest. You know which is which.",
      "You're generous to a fault with other people and stingy with yourself, and you'd argue that's fair.",
      "You're confident in what you know and quietly unsure about what you are. Most people only ever see the first half.",
    ],
  },
  {
    name: 'HIDDEN',
    why: 'Everyone believes they have an unseen self. Describe it warmly and they will supply the specifics.',
    lines: [
      "There's a version of you that only two or three people have met. The rest get a very good performance.",
      "You've been called intimidating by people who never saw you at your kindest. You're not sure which is the real reputation.",
      "You keep a sense of humour in reserve, because when you use it people are surprised, and you like the surprise.",
      "There's something you're good at that you've never been paid for, and you've thought about it more than you'd admit.",
      "You're softer than your friends think and harder than your family thinks, and you've never bothered to fix either.",
    ],
  },
  {
    name: 'THE HIT',
    why: 'One line that sounds specific. It is not. Unfinished business, a private plan, an old regret: everyone has each of these.',
    lines: [
      "There's a decision you've been circling for a while. You already know what you'll do. You're waiting for permission from someone who isn't going to give it.",
      "Someone owes you an apology you've stopped expecting. You've moved on. You still think about it.",
      "You have a plan for the next year you haven't said out loud, because saying it makes it real, and real can fail.",
      "There's a person you were unfair to, years ago. They've forgotten. You haven't.",
      "You've reinvented yourself at least once. The people who knew the earlier version don't fully believe the new one.",
    ],
  },
  {
    name: 'CLOSER',
    why: 'Land it on a compliment that feels earned rather than given. End on the strongest line and stop talking.',
    lines: [
      "You're harder to read than you think, and easier to like than you believe. That's the whole reading.",
      "Most people underestimate you exactly once.",
      "You're going to be fine. You already know that. It's the 'when' that's been bothering you.",
      "You're the person people describe as 'a lot' and then keep calling.",
      "You've never once been the most interesting person in the room by accident.",
    ],
  },
]

export function totalLines(): number {
  return STAGES.reduce((n, s) => n + s.lines.length, 0)
}
