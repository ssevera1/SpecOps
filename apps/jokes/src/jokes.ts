/**
 * The corpus. Two-part jokes show the setup and reveal the punchline on
 * a tap, which is the one thing a heads-up display can do that a joke
 * book cannot: control the timing.
 *
 * One-liners have no punchline field and show whole.
 *
 * Keep the setup under two rows and the punchline under three, so the
 * revealed state fits with a blank row between. check-layout tests both
 * states of every joke.
 */

export interface Joke {
  setup: string
  punch?: string
}

export const JOKES: Joke[] = [
  { setup: "I told my therapist I have trouble finishing things.", punch: "She said we'd pick it up next week. That was in March." },
  { setup: "My doctor told me to cut back on salt.", punch: "So now I only cry once a day." },
  { setup: "I bought a book about procrastination.", punch: "It's been on the shelf for two years. I consider that a strong start." },
  { setup: "I have a friend who's a mime.", punch: "We don't talk much. That's not the joke. It's a real problem in the friendship." },
  { setup: "I asked the gym if they had a beginner class.", punch: "They said it's called 'coming back a second time.'" },
  { setup: "I tried to organise a hide-and-seek tournament.", punch: "Attendance was impossible to verify." },
  { setup: "My smartwatch says I stood up eleven times today.", punch: "It's counting the panic." },
  { setup: "I put my phone in airplane mode and threw it.", punch: "Nothing. Worst airplane I've ever seen." },
  { setup: "I finally hit inbox zero.", punch: "It turns out that's just what getting fired feels like." },
  { setup: "My fitness tracker congratulated me on a new record.", punch: "Most consecutive hours horizontal." },
  { setup: "I bought noise-cancelling headphones.", punch: "I can still hear my own thoughts. Returning them." },
  { setup: "I told the barista my name was 'Order Ready.'", punch: "I haven't waited for a coffee in a year." },
  { setup: "My smoke detector only chirps at three in the morning.", punch: "I respect it. That's the only time I'm listening." },
  { setup: "I tried intermittent fasting.", punch: "Turns out I was already doing it. Between meals." },
  { setup: "Someone said I have commitment issues.", punch: "I didn't stay for the end of the sentence." },
  { setup: "I set a goal to read more this year.", punch: "I've read the goal four times. It's pretty good." },
  { setup: "I keep a jar for every time I say 'I'll start Monday.'", punch: "I'm saving up for a bigger jar." },
  { setup: "I told my doctor that crowds make me anxious.", punch: "He prescribed fewer crowds. The man's a genius. I also owe him four hundred dollars." },
  { setup: "The box said 'some assembly required.'", punch: "I required it. Loudly. For three hours. It's still a box." },
  { setup: "I finally understand cryptocurrency.", punch: "You give someone money, and then you don't have it, but it's exciting." },
  { setup: "I asked an AI to write my eulogy.", punch: "It was fine. Balanced. I'd have liked a stronger take." },
  { setup: "My smart glasses have a low-battery warning.", punch: "So did my last relationship. Nobody told me about that one either." },
  { setup: "I bought a treadmill for the garage.", punch: "The garage now has a very expensive place to dry towels." },
  { setup: "I named my Wi-Fi 'Loading...'", punch: "My neighbours think their phones are broken. I've never been happier." },
  { setup: "I asked my glasses for directions.", punch: "They said 'you'll know it when you see it.' I've been here forty minutes." },
  { setup: "I bought a plant to prove I could keep something alive.", punch: "It's a metaphor now. Metaphors are lower maintenance." },
  { setup: "I told my boss I work best under pressure.", punch: "That was a mistake. It's been pressure ever since." },
  { setup: "My password is the name of my first pet.", punch: "His name was Password1! and I miss him every day." },
  { setup: "I got a fitness ring.", punch: "It knows I'm asleep before I do. Which is somehow rude." },
  { setup: "Every time I say 'I'll be there in five minutes,'", punch: "I'm making a small contribution to the field of fiction." },
  { setup: "I asked my glasses to tell me a joke.", punch: "They showed me my step count." },
  { setup: "I'm not lazy. My Roomba just has a more ambitious schedule than I do." },
  { setup: "I've reached the age where 'let's do this' means standing up." },
  { setup: "I'm on a seafood diet. I see food and I calculate whether it's worth the dishes." },
  { setup: "My love language is 'I saw this and thought of you,' followed by never mentioning it again." },
  { setup: "I don't procrastinate. I let ideas marinate until they're technically overdue." },
]
