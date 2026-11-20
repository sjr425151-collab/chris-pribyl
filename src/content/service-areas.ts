/**
 * Service area. Counties and communities are the ones named on the
 * company's current website (footer "Serving Area", Roofing, Gutters and FAQ
 * pages). One page covers them all — no thin per-city doorway pages.
 */
export const counties = ["Monroe County", "Wayne County", "Lenawee County", "Oakland County"] as const;

export interface Community {
  name: string;
  county: string;
  note: string;
  slug: string;
}

export const communities: Community[] = [
  {
    name: "Carleton",
    slug: "carleton",
    county: "Monroe County",
    note: "Home base. We’re on W Labo Rd in Carleton, so estimates here are close to home.",
  },
  {
    name: "New Boston",
    slug: "new-boston",
    county: "Wayne County",
    note: "Roof replacement, repairs and gutters for New Boston and Huron Township homes, plus pole barns on larger lots.",
  },
  {
    name: "Monroe",
    slug: "monroe",
    county: "Monroe County",
    note: "Roofing, gutters and post-frame buildings across the city of Monroe and surrounding townships.",
  },
  {
    name: "Newport",
    slug: "newport",
    county: "Monroe County",
    note: "Roof replacement and gutter work for Newport homeowners, with free inspections.",
  },
  {
    name: "Maybee",
    slug: "maybee",
    county: "Monroe County",
    note: "Pole barns, garages and roofing for Maybee-area homes, farms and acreage.",
  },
  {
    name: "Ida",
    slug: "ida",
    county: "Monroe County",
    note: "Roofing and pole barn construction for Ida and the surrounding countryside.",
  },
  {
    name: "Dundee",
    slug: "dundee",
    county: "Monroe County",
    note: "Roof inspections, replacements and gutters for Dundee homeowners.",
  },
  {
    name: "Temperance",
    slug: "temperance",
    county: "Monroe County",
    note: "Roof replacement for Temperance and Bedford Township homes, usually completed in a day.",
  },
  {
    name: "Milan",
    slug: "milan",
    county: "Monroe & Washtenaw Counties",
    note: "Roofing, gutters and post-frame buildings for the Milan area.",
  },
];
