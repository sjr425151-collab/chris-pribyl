export const site = {
  name: "KINFORM",
  description:
    "Personalized mobility, movement assessment and strength development. Understand how you move and build a personalized approach to mobility, flexibility and strength.",
  headline: "Your body wasn’t meant to feel restricted.",
  supporting:
    "Understand how you move and build a personalized approach to mobility, flexibility, and strength.",
  tagline: "Your body. Your movement. Your plan.",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Assessment", href: "/assessment" },
  { label: "Pricing", href: "/pricing" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Platform",
    items: [
      { label: "How it works", href: "/how-it-works" },
      { label: "The assessment", href: "/assessment" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard preview", href: "/dashboard" },
    ],
  },
  {
    heading: "Assessment",
    items: [
      { label: "What you’ll complete", href: "/assessment#what-you-complete" },
      { label: "Limitations", href: "/assessment#limitations" },
      { label: "Privacy & media", href: "/assessment#privacy" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Log in", href: "/login" },
      { label: "Create account", href: "/signup" },
    ],
  },
];

/** Shared wellness disclaimer shown in the footer and on assessment pages. */
export const wellnessDisclaimer =
  "KINFORM is a fitness and wellness service. It does not diagnose, treat or provide medical advice, and it is not a substitute for care from a qualified healthcare professional. If you have pain, a medical condition or concerning symptoms, consult a healthcare professional before starting any exercise program.";
