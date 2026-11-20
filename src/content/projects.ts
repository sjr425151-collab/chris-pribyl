import type { PhotoKey } from "./media";

/**
 * Portfolio projects.
 *
 * All photos are the company's own. Project names describe what is visible
 * in the photos; locations, sizes, clients and dates are left empty until the
 * owner confirms them. The UI only renders fields that are filled in.
 *
 * To add a project: drop photos in src/assets/photos, register them in
 * media.ts, then add an entry here. No layout changes are required.
 */

export type ProjectCategory = "pole-barns" | "agricultural" | "garages" | "roofing" | "custom";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "pole-barns", label: "Pole Barns" },
  { id: "garages", label: "Garages" },
  { id: "agricultural", label: "Agricultural & Equipment" },
  { id: "custom", label: "Custom Builds" },
  { id: "roofing", label: "Roofing" },
];

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Confirmed location only (e.g. "Carleton, MI"). Leave undefined if unknown. */
  location?: string;
  /** Confirmed dimensions only (e.g. "30×40"). */
  size?: string;
  /** Short line under the title */
  summary: string;
  /** What is visible / documented in the photos */
  description: string;
  scope: string[];
  cover: PhotoKey;
  gallery: PhotoKey[];
  services: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "charcoal-equipment-building",
    title: "Charcoal Equipment Building",
    category: "agricultural",
    summary: "A long post-frame building with open equipment bays.",
    description:
      "A long charcoal post-frame building with a lighter base course, two open bays for equipment, and a row of high windows that bring daylight inside.",
    scope: ["Post-frame construction", "Open equipment bays", "Steel siding and roof", "Clerestory windows"],
    cover: "barn-machine-shed-sky",
    gallery: ["barn-machine-shed-sky"],
    services: ["pole-barns"],
    featured: true,
  },
  {
    slug: "black-barn-with-wraparound-porch",
    title: "Black Barn with Covered Porch",
    category: "custom",
    summary: "Two overhead doors and a timber-post porch.",
    description:
      "A black steel pole barn with two overhead doors, white-trimmed windows and a covered porch on natural timber posts across the front and side.",
    scope: ["Pole barn construction", "Covered porch", "Overhead and walk doors", "Windows"],
    cover: "barn-black-porch-front",
    gallery: ["barn-black-porch-front", "barn-black-porch-side"],
    services: ["pole-barns"],
    featured: true,
  },
  {
    slug: "tan-three-bay-garage",
    title: "Three-Bay Garage Barn",
    category: "garages",
    summary: "Tan siding, black carriage-style doors.",
    description:
      "A tan garage-style pole barn with three black carriage-style overhead doors, dark trim and a walk door, set at the edge of a wooded lot.",
    scope: ["Garage-style pole barn", "Three overhead doors", "Walk door", "Concrete apron"],
    cover: "barn-tan-three-bay",
    gallery: ["barn-tan-three-bay"],
    services: ["garages", "pole-barns"],
    featured: true,
  },
  {
    slug: "porch-and-cupola-barn",
    title: "Porch & Cupola Barn",
    category: "custom",
    summary: "Covered porch, cupolas and a tall overhead door.",
    description:
      "A light gray post-frame building with roof cupolas, a covered front porch on timber posts and a tall overhead door at the gable end.",
    scope: ["Post-frame construction", "Covered porch", "Cupolas", "Tall overhead door"],
    cover: "barn-cupola-porch",
    gallery: ["barn-cupola-porch", "barn-cupola-drive", "barn-cupola-porch-detail"],
    services: ["pole-barns"],
    featured: true,
  },
  {
    slug: "two-story-residence",
    title: "Two-Story Residence",
    category: "custom",
    summary: "Metal roof, board-and-batten and stone.",
    description:
      "A two-story residence with a dark metal roof, board-and-batten siding, stone wainscot and a timber-framed front porch.",
    scope: ["Metal roofing", "Board-and-batten siding", "Stone wainscot", "Covered porch"],
    cover: "residence-stone-porch",
    gallery: ["residence-stone-porch"],
    services: [],
    featured: true,
  },
  {
    slug: "red-two-door-barn",
    title: "Red Two-Door Barn",
    category: "garages",
    summary: "Classic red with white doors.",
    description:
      "A red pole barn with two white overhead doors and charcoal wainscot, at the end of a long gravel drive.",
    scope: ["Garage-style pole barn", "Two overhead doors", "Wainscot"],
    cover: "barn-red-two-door",
    gallery: ["barn-red-two-door", "barn-red-drive"],
    services: ["garages", "pole-barns"],
  },
  {
    slug: "red-farmstead-barn",
    title: "Red Farmstead Barn",
    category: "agricultural",
    summary: "Three overhead doors and an open lean-to.",
    description:
      "A red pole barn with three white overhead doors, a walk door and an open lean-to along the side.",
    scope: ["Pole barn construction", "Lean-to", "Three overhead doors"],
    cover: "barn-red-farmstead",
    gallery: ["barn-red-farmstead"],
    services: ["pole-barns"],
  },
  {
    slug: "white-and-black-tall-door-barn",
    title: "White & Black Tall-Door Barn",
    category: "pole-barns",
    summary: "A tall overhead door for larger equipment.",
    description:
      "A white pole barn with black wainscot and trim and a tall overhead door, photographed after completion in winter.",
    scope: ["Pole barn construction", "Tall overhead door", "Wainscot"],
    cover: "barn-white-black-tall-door",
    gallery: ["barn-white-black-tall-door", "barn-white-black-snow"],
    services: ["pole-barns"],
  },
  {
    slug: "black-steel-barn",
    title: "Black Steel Barn",
    category: "pole-barns",
    summary: "Monochrome steel with a single overhead door.",
    description: "A black steel-sided pole barn with a single overhead door.",
    scope: ["Pole barn construction", "Overhead door"],
    cover: "barn-black-wide",
    gallery: ["barn-black-wide"],
    services: ["pole-barns"],
  },
  {
    slug: "white-and-black-barns",
    title: "White & Black Barns",
    category: "agricultural",
    summary: "Crisp white steel with black wainscot and trim.",
    description: "A collection of white pole barns with black trim, including a long building with three open bays.",
    scope: ["Pole barn construction", "Open bays"],
    cover: "barn-white-three-bay",
    gallery: ["barn-white-three-bay", "barn-white-windows", "barn-white-open-bay"],
    services: ["pole-barns"],
  },
  {
    slug: "gray-garage-barns",
    title: "Gray Garage Barns",
    category: "garages",
    summary: "Clean gray siding with white or black doors.",
    description: "Gray garage-style pole barns with overhead doors, shown on new gravel and asphalt drives.",
    scope: ["Garage-style pole barn", "Overhead doors"],
    cover: "barn-gray-truck",
    gallery: ["barn-gray-truck", "barn-gray-black-door", "barn-gray-single", "barn-gray-porch"],
    services: ["garages"],
  },
  {
    slug: "cream-and-black-garages",
    title: "Cream & Black Garages",
    category: "garages",
    summary: "Cream siding, black doors and wainscot.",
    description: "Cream pole barns with black overhead doors, wainscot and trim.",
    scope: ["Garage-style pole barn", "Black overhead doors", "Wainscot"],
    cover: "barn-cream-black-doors",
    gallery: ["barn-cream-black-doors", "barn-cream-side", "barn-cream-long"],
    services: ["garages"],
  },
  {
    slug: "architectural-shingle-replacement",
    title: "Architectural Shingle Replacement",
    category: "roofing",
    summary: "Charcoal shingles over a gabled white home.",
    description:
      "A complete roof replacement with charcoal architectural shingles over a white home with multiple gables, shown from the air after completion.",
    scope: ["Roof replacement", "Architectural shingles", "Ridge and vents"],
    cover: "roof-drone-finished",
    gallery: ["roof-drone-finished", "roof-drone-street", "roof-drone-wide"],
    services: ["roof-replacement", "residential-roofing"],
    featured: true,
  },
  {
    slug: "brick-ranch-roof",
    title: "Brick Ranch Roof",
    category: "roofing",
    summary: "A clean new roofline on a classic ranch.",
    description: "A brick ranch home with a newly installed charcoal shingle roof.",
    scope: ["Roof replacement", "Shingle installation"],
    cover: "roof-brick-ranch",
    gallery: ["roof-brick-ranch", "roof-brick-ranch-wide"],
    services: ["roof-replacement"],
  },
  {
    slug: "brick-home-tear-off",
    title: "Brick Home Tear-Off",
    category: "roofing",
    summary: "Full crew, tarps down, in a single push.",
    description:
      "A roof replacement in progress on a brick home: the crew working across the roof with tarps protecting the yard and patio below.",
    scope: ["Tear-off", "Decking", "Underlayment", "Shingle installation"],
    cover: "roof-crew-brick-tearoff",
    gallery: ["roof-crew-brick-tearoff", "roof-crew-brick-progress"],
    services: ["roof-replacement"],
  },
  {
    slug: "new-roofs-around-monroe-county",
    title: "Residential Roofs",
    category: "roofing",
    summary: "A selection of completed shingle roofs.",
    description: "Completed residential shingle roofs on a range of home styles.",
    scope: ["Roof replacement", "Shingle installation"],
    cover: "roof-white-gables",
    gallery: ["roof-white-gables", "roof-gray-balcony", "roof-cape-dormer", "roof-suburban-split", "roof-ridge-vents"],
    services: ["residential-roofing"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

export function projectsFor(categories: ProjectCategory[], limit = 3): Project[] {
  return projects.filter((p) => categories.includes(p.category)).slice(0, limit);
}

export function categoryLabel(id: ProjectCategory): string {
  return projectCategories.find((c) => c.id === id)?.label ?? id;
}
