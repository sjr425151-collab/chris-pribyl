export const processSteps = [
  {
    step: "01",
    title: "Assess",
    body: "Complete a questionnaire, a few photos, short guided movement videos and simple strength and balance tests — all at home, with your phone.",
  },
  {
    step: "02",
    title: "Personalize",
    body: "Receive clear movement observations and training priorities, and a four-week program that starts with where you feel most restricted.",
  },
  {
    step: "03",
    title: "Progress",
    body: "Train with guided sessions and short daily Movement Moments, check in weekly, and reassess every four weeks so your plan keeps up with you.",
  },
] as const;

export const programmingPrinciples = [
  {
    title: "Mobility first",
    body: "Sessions open with work for the joints where you feel most restricted — hips, ankles, shoulders or upper back — so everyday movement feels easier.",
  },
  {
    title: "Control before load",
    body: "Coordination, balance and core stability are built before intensity, so strength sits on a steady foundation.",
  },
  {
    title: "Scaled to you",
    body: "Every exercise has simpler and harder options. Your program adapts to your check-ins rather than a fixed template.",
  },
  {
    title: "Strength that carries over",
    body: "Getting up from the floor, carrying groceries, climbing stairs — strength work is chosen for the life you actually live.",
  },
] as const;

/** Illustrative examples only — not real user content. */
export const sampleMoments = [
  { time: "Morning", title: "Ankle & calf wake-up", minutes: 3 },
  { time: "Midday", title: "Desk-break hip opener", minutes: 4 },
  { time: "Afternoon", title: "Upper-back rotation reset", minutes: 3 },
  { time: "Evening", title: "Wind-down breathing & stretch", minutes: 5 },
] as const;
