/**
 * Customer testimonials.
 *
 * Intentionally empty. Only add reviews whose exact text, reviewer name and
 * source you can link to (Google, Facebook, Yelp). Do not paraphrase.
 * The homepage and /reviews render these automatically once present.
 *
 * Example:
 * {
 *   quote: "Exact review text…",
 *   author: "First name + last initial as shown on the platform",
 *   source: "Google",
 *   url: "https://g.co/…",
 *   project: "Barndominium",          // optional, only if stated in the review
 *   date: "2026-10",                  // optional, as shown on the platform
 * }
 */
export interface Testimonial {
  quote: string;
  author: string;
  source: "Google" | "Facebook" | "Yelp" | "Website";
  url?: string;
  project?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [];
