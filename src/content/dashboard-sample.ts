/**
 * SAMPLE DATA for the dashboard design concept.
 * This is illustrative content only — not a real user's plan or results.
 * Replace with data from the shared backend once accounts exist.
 */

export const sampleUser = { firstName: "Alex" };

export const sampleToday = {
  week: 1,
  day: 2,
  title: "Hips & ankles: comfortable depth",
  minutes: 25,
  blocks: [
    { label: "Prepare", items: ["Breathing & rib-cage reset"] },
    { label: "Mobility", items: ["Half-kneeling hip flexor rock", "Knee-to-wall ankle drive", "90/90 hip transitions"] },
    { label: "Control", items: ["Supported single-leg balance", "Slow step-down"] },
    { label: "Strength", items: ["Box sit-to-stand", "Incline push-up"] },
  ],
};

export const sampleWeek = [
  { day: "Mon", focus: "Mobility & control", type: "session" },
  { day: "Tue", focus: "Hips & ankles", type: "session", today: true },
  { day: "Wed", focus: "Moments only", type: "moments" },
  { day: "Thu", focus: "Upper back & shoulders", type: "session" },
  { day: "Fri", focus: "Moments only", type: "moments" },
  { day: "Sat", focus: "Balance & strength", type: "session" },
  { day: "Sun", focus: "Rest", type: "rest" },
] as const;

export const sampleMoments = [
  { time: "08:00", title: "Ankle & calf wake-up", minutes: 3 },
  { time: "11:30", title: "Desk-break hip opener", minutes: 4 },
  { time: "15:00", title: "Upper-back rotation reset", minutes: 3 },
  { time: "21:00", title: "Wind-down breathing & stretch", minutes: 5 },
];

export const samplePriorities = [
  { area: "Hip mobility", level: "Primary", note: "Comfortable depth when squatting and getting up from low seats." },
  { area: "Ankle mobility", level: "Secondary", note: "Forward knee travel for stairs and squatting." },
  { area: "Balance", level: "Secondary", note: "Steadiness on one leg, with support at first." },
];
