/**
 * PROPOSED INTRODUCTORY PRICING — not established offers.
 * Edit amounts and features here; every pricing surface reads from this file.
 * No payment processing exists in milestone 1.
 */

export interface Plan {
  id: "assessment" | "monthly" | "premium";
  name: string;
  price: number;
  cadence: "one-time" | "month";
  description: string;
  features: string[];
  /** Requires a completed initial assessment before purchase. */
  requiresAssessment: boolean;
  highlighted?: boolean;
}

export const pricingStatus = {
  label: "Proposed introductory pricing",
  note: "These prices are proposals for launch and may change. Nothing can be purchased yet.",
} as const;

export const plans: Plan[] = [
  {
    id: "assessment",
    name: "Initial assessment",
    price: 59,
    cadence: "one-time",
    description: "The starting point. Understand how you move and where to focus first.",
    features: [
      "Safety screening and personal questionnaire",
      "Guided photo and movement video capture",
      "Strength and balance self-tests",
      "Written assessment of movement observations and training priorities",
      "Your first four-week program",
    ],
    requiresAssessment: false,
    highlighted: true,
  },
  {
    id: "monthly",
    name: "Monthly membership",
    price: 39,
    cadence: "month",
    description: "Keep your plan moving with tracking and regular reassessment.",
    features: [
      "A new personalized four-week block every month",
      "Reassessment every four weeks",
      "Daily Movement Moments",
      "Exercise demonstrations and simpler options",
      "Weekly check-ins and progress tracking",
    ],
    requiresAssessment: true,
  },
  {
    id: "premium",
    name: "Premium membership",
    price: 79,
    cadence: "month",
    description: "Everything in Monthly, with closer review of your progress.",
    features: [
      "Everything in Monthly membership",
      "More detailed review of each reassessment",
      "Priority responses to check-in questions",
      "Program adjustments between reassessments",
    ],
    requiresAssessment: true,
  },
];
