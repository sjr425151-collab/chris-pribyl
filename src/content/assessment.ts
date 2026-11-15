import type { AssessmentAreaCategory, AssessmentAreaId } from "@/types/domain";

export interface AssessmentArea {
  id: AssessmentAreaId;
  name: string;
  category: AssessmentAreaCategory;
  summary: string;
  /** Example of how this area is looked at. Illustrative, not a final protocol. */
  example: string;
}

/** Ordered by product priority: mobility first, performance last. */
export const assessmentAreas: AssessmentArea[] = [
  {
    id: "hip_mobility",
    name: "Hip mobility",
    category: "mobility",
    summary:
      "How freely your hips rotate, flex and extend — often the first place long hours of sitting show up.",
    example: "Guided 90/90 transitions and a deep-squat hold, filmed from the side.",
  },
  {
    id: "ankle_mobility",
    name: "Ankle mobility",
    category: "mobility",
    summary:
      "Forward knee travel over the foot, which shapes how you squat, climb stairs and walk.",
    example: "Knee-to-wall test on each side.",
  },
  {
    id: "shoulder_mobility",
    name: "Shoulder mobility",
    category: "mobility",
    summary:
      "Comfortable overhead reach and rotation for everyday tasks like reaching a high shelf.",
    example: "Standing overhead reach and back-of-shoulder reach, filmed front and side.",
  },
  {
    id: "thoracic_mobility",
    name: "Thoracic mobility",
    category: "mobility",
    summary:
      "Rotation and extension through the upper back, which supports shoulder and neck comfort.",
    example: "Seated rotation with a dowel or broomstick.",
  },
  {
    id: "balance",
    name: "Balance",
    category: "balance_stability",
    summary: "Steadiness on one leg and while shifting your weight.",
    example: "Timed single-leg stance, eyes open, next to a wall for support.",
  },
  {
    id: "movement_control",
    name: "Movement control & coordination",
    category: "movement_quality",
    summary:
      "How smoothly and evenly you move through common patterns like squatting, hinging and stepping.",
    example: "Slow bodyweight squat and step-down, filmed from front and side.",
  },
  {
    id: "core_stability",
    name: "Core stability",
    category: "balance_stability",
    summary: "Your ability to keep the trunk steady while your arms and legs move.",
    example: "Dead bug and side-plank holds.",
  },
  {
    id: "foundational_strength",
    name: "Foundational strength",
    category: "strength",
    summary:
      "Practical strength for getting up from the floor, carrying and pushing — scaled to you.",
    example: "Sit-to-stand repetitions and an incline push-up test.",
  },
  {
    id: "reported_limitations",
    name: "Your reported limitations",
    category: "self_report",
    summary:
      "What you tell us — where you feel stiff, what movements feel difficult, and what you want to do more comfortably.",
    example: "Questionnaire on daily activities, stiffness and goals.",
  },
];

/** Steps of the full assessment, used on /how-it-works and /assessment. */
export const assessmentJourney = [
  {
    id: "questionnaire",
    title: "Personal questionnaire",
    duration: "About 10 minutes",
    body: "Your daily routine, how much you sit, where you feel stiff or restricted, past injuries, and what you want to be able to do. It begins with a short safety screening.",
  },
  {
    id: "photos",
    title: "Photo submission",
    duration: "About 5 minutes",
    body: "A few standing photos from set angles, taken with your phone against a plain wall. They help us note general alignment and give you a visual baseline to compare against later.",
  },
  {
    id: "videos",
    title: "Guided movement videos",
    duration: "About 15 minutes",
    body: "Short clips of simple movements — a squat, a reach, a step-down — with on-screen guidance for camera placement. No equipment beyond a wall and a chair.",
  },
  {
    id: "tests",
    title: "Strength and balance tests",
    duration: "About 10 minutes",
    body: "Timed holds and repetition counts you record yourself, like a single-leg stance or sit-to-stand. Each is scaled so you can stop at any point.",
  },
  {
    id: "review",
    title: "Your personalized assessment",
    duration: "Delivered after review",
    body: "A clear summary of movement observations and training priorities, with what you reported kept separate from what we observed. No diagnoses — just where to focus first.",
  },
  {
    id: "program",
    title: "Your four-week program",
    duration: "4 weeks",
    body: "Sessions built around your priorities, starting with mobility and range of motion, then movement control, balance and strength. Each exercise has demonstrations and simpler options.",
  },
  {
    id: "tracking",
    title: "Tracking and reassessment",
    duration: "Ongoing",
    body: "Weekly check-ins on how you feel, daily Movement Moments, and a reassessment every four weeks so your plan adjusts as you change.",
  },
] as const;

/** What the assessment is not. Displayed verbatim on /assessment. */
export const assessmentLimitations = [
  "It is not a medical examination and cannot diagnose injuries, posture-related disorders, muscle dysfunction or any medical condition.",
  "Photos and videos show how you moved on one day, under home conditions. They are a starting point for training, not a measurement of structure.",
  "It does not aim to correct structural or anatomical differences. It identifies training priorities for comfort, range of motion and capability.",
  "Results depend on following the guidance for camera placement and test setup. We will ask you to re-record if a clip is unclear.",
  "Progress varies from person to person. We do not guarantee specific outcomes.",
];

/** Reasons to pause and speak to a professional first. */
export const referralSignals = [
  "Pain at rest, pain that is worsening, or pain that wakes you at night",
  "Numbness, tingling, or unexplained weakness",
  "Dizziness, fainting, chest pain or shortness of breath with mild effort",
  "A recent injury, fracture or surgery",
  "Pregnancy or recent childbirth",
  "Any restriction a clinician has advised",
];
