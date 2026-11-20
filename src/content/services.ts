import type { ClaimId } from "./business";
import type { PhotoKey } from "./media";
import type { ProjectCategory } from "./projects";

/**
 * Service pages. Scope lists come from the company's current site; the
 * explanatory copy is written for this site and avoids promises the company
 * hasn't made (no prices, timelines, or guarantees beyond the claims registry).
 */

export type ServiceGroup = "buildings" | "roofing" | "exterior";
export type ServiceDrawing = "gutter" | "coating";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Short label for menus and cards */
  short: string;
  group: ServiceGroup;
  /**
   * false → page is not generated, linked, or listed in the sitemap.
   * Used for services that have not been confirmed by the owner.
   */
  enabled: boolean;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  summary: string;
  intro: string[];
  /** Hero photo, or a technical drawing where no project photography exists yet */
  hero: { photo: PhotoKey } | { drawing: ServiceDrawing };
  gallery: PhotoKey[];
  scopeTitle: string;
  scope: string[];
  benefits: { title: string; body: string }[];
  process: { title: string; body: string }[];
  claims: ClaimId[];
  faqs: ServiceFaq[];
  projectCategories: ProjectCategory[];
  related: string[];
}

export const services: Service[] = [
  {
    slug: "pole-barns",
    name: "Pole Barn Construction",
    short: "Pole Barns",
    group: "buildings",
    enabled: true,
    metaTitle: "Pole Barn Builders in Monroe County, MI",
    metaDescription:
      "Custom pole barns for storage, equipment, agriculture and workshops, built by Dynamic Construction MI in Carleton and across Monroe County, Michigan.",
    eyebrow: "Post-frame buildings",
    headline: "Pole barns built right, and built for the way you use them.",
    summary: "Custom post-frame buildings for storage, equipment, agriculture and work.",
    intro: [
      "A pole barn is a long-term part of your property. Its size, door placement, and how it sits on the land decide how useful it is for the next few decades.",
      "Dynamic Construction MI builds pole barns for residential and commercial properties throughout Monroe County and the surrounding area, planned around your needs, your property layout, and your budget.",
    ],
    hero: { photo: "barn-machine-shed-sky" },
    gallery: ["barn-tan-three-bay", "barn-interior-framing", "barn-red-farmstead", "barn-cupola-porch", "barn-white-three-bay", "barn-black-porch-front"],
    scopeTitle: "Pole barn services",
    scope: [
      "Pole barn construction",
      "Agricultural pole barns",
      "Storage and equipment buildings",
      "Garage-style pole barns",
      "Custom pole barn layouts",
    ],
    benefits: [
      {
        title: "Planned around your property",
        body: "Footprint, door sizes and placement are worked out for how you'll actually drive in, park, store and work, not from a one-size kit.",
      },
      {
        title: "Open, adaptable space",
        body: "Post-frame construction carries the roof on its posts and trusses, which leaves wide interiors that adapt as your needs change.",
      },
      {
        title: "Finished to suit the property",
        body: "Siding and trim colors, wainscot, covered porches, windows and walk doors are chosen to match your home and land.",
      },
    ],
    process: [
      { title: "Free estimate", body: "We visit the site, talk through how you'll use the building, and look at layout and access." },
      { title: "Plan & pricing", body: "You get a clear plan and written pricing, with financing options if you'd like them." },
      { title: "Build", body: "Our crew builds on the schedule we agree, with clear communication along the way." },
      { title: "Finished building", body: "Doors, trim and details are completed and the site is left clean." },
    ],
    claims: ["experience20", "licensedInsured", "familyOwned", "freeEstimates", "financing"],
    faqs: [
      {
        q: "Do you build pole barns for both homes and businesses?",
        a: "Yes. Dynamic Construction MI builds pole barns for residential and commercial properties in Monroe County and the surrounding area.",
      },
      {
        q: "Can the layout be customized?",
        a: "Yes. Custom layouts are part of the service. Size, door placement, porches, windows and colors are planned around your property and how you'll use the building.",
      },
      {
        q: "What are pole barns typically used for?",
        a: "Equipment and vehicle storage, agricultural use, garages, workshops and multi-use buildings. Tell us what you need the space to do and we'll plan around it.",
      },
      {
        q: "Is financing available?",
        a: "Financing options are available. We can review them with you during your free estimate.",
      },
    ],
    projectCategories: ["pole-barns", "agricultural", "garages"],
    related: ["garages", "residential-roofing", "gutters"],
  },
  {
    slug: "garages",
    name: "Garage Construction",
    short: "Garages",
    group: "buildings",
    enabled: true,
    metaTitle: "Garage Builders in Monroe County, MI | Post-Frame Garages",
    metaDescription:
      "Detached post-frame garages and workshops built by Dynamic Construction MI for homes in Carleton, New Boston, Monroe and surrounding Michigan communities.",
    eyebrow: "Garages & workshops",
    headline: "A garage that looks like it belongs on the property.",
    summary: "Detached, garage-style post-frame buildings for vehicles, tools and projects.",
    intro: [
      "A detached garage has to do practical work: park the truck, hold the mower and the tools, maybe house a workbench. It also sits in plain view of your home.",
      "We build garage-style pole barns with overhead doors, walk doors, windows and color choices planned so the building works hard and looks finished.",
    ],
    hero: { photo: "barn-tan-three-bay" },
    gallery: ["barn-red-two-door", "barn-cream-black-doors", "barn-gray-black-door", "barn-red-sky", "barn-gray-truck", "barn-brown-garage"],
    scopeTitle: "Garage options we build",
    scope: [
      "Detached garage-style pole barns",
      "Single, double and multi-bay layouts",
      "Overhead and walk door configurations",
      "Windows, wainscot and trim colors",
      "Workshop and storage space",
    ],
    benefits: [
      {
        title: "Room for what you actually own",
        body: "Bay widths and door heights are sized for your vehicles, trailers and equipment, with space left to move around them.",
      },
      {
        title: "A clean, matched exterior",
        body: "Siding, wainscot and trim colors are chosen to complement your house, from crisp white-and-black to classic red.",
      },
      {
        title: "Built to work in",
        body: "Plan the walk door, windows and open floor space now so the garage can double as a workshop later.",
      },
    ],
    process: [
      { title: "Free estimate", body: "We look at the site, the approach from your drive, and what the garage needs to hold." },
      { title: "Layout & finishes", body: "Choose bay count, doors, windows and colors, with written pricing." },
      { title: "Build", body: "Our crew builds and keeps you updated on progress." },
      { title: "Ready to use", body: "Doors are installed and adjusted, details finished, and the site cleaned up." },
    ],
    claims: ["experience20", "licensedInsured", "familyOwned", "freeEstimates", "financing"],
    faqs: [
      {
        q: "How many bays can a garage have?",
        a: "Layouts range from a single overhead door to multi-bay buildings. The right size depends on your property and what you plan to store.",
      },
      {
        q: "Can the garage match my house?",
        a: "Siding, trim and wainscot colors can be selected to complement your home. Our project photos show a range of combinations.",
      },
      {
        q: "Do you offer financing for garages?",
        a: "Financing options are available. Ask during your free estimate.",
      },
    ],
    projectCategories: ["garages", "pole-barns"],
    related: ["pole-barns", "gutters", "residential-roofing"],
  },
  {
    slug: "barndominiums",
    name: "Barndominiums",
    short: "Barndominiums",
    group: "buildings",
    // Not listed on the company's current site. Enable after the owner confirms.
    enabled: false,
    metaTitle: "Barndominium Builders in Southeast Michigan",
    metaDescription:
      "Barndominiums and combined living-and-shop buildings from Dynamic Construction MI, serving Monroe County and Southeast Michigan.",
    eyebrow: "Live & work buildings",
    headline: "Living space and shop space, under one well-built roof.",
    summary: "Combined home-and-barn buildings planned around how you live and work.",
    intro: [
      "A barndominium joins a home with the open space of a pole barn, giving you a garage, shop or storage area under the same roofline as your living space.",
      "Talk with us about your plans for a home-and-barn building in Monroe County or nearby.",
    ],
    hero: { photo: "residence-stone-porch" },
    gallery: ["barn-cupola-porch", "barn-black-porch-front", "barn-gray-porch"],
    scopeTitle: "What we can plan with you",
    scope: ["Combined living and shop layouts", "Covered porches", "Custom exterior finishes"],
    benefits: [
      { title: "One roofline", body: "Living and working space under one roof." },
      { title: "Open interiors", body: "Wide post-frame spans leave flexible floor plans." },
      { title: "Personal finishes", body: "Porches, stone and color choices that suit your land." },
    ],
    process: [
      { title: "Free estimate", body: "Discuss the site and how you'll use the building." },
      { title: "Plan", body: "Agree on layout, finishes and written pricing." },
      { title: "Build", body: "Construction with clear communication throughout." },
      { title: "Finish", body: "Details completed and the site left clean." },
    ],
    claims: ["licensedInsured", "familyOwned", "freeEstimates"],
    faqs: [],
    projectCategories: ["custom"],
    related: ["pole-barns", "garages"],
  },
  {
    slug: "residential-roofing",
    name: "Residential Roofing",
    short: "Roofing",
    group: "roofing",
    enabled: true,
    metaTitle: "Roofing Contractor in Monroe County, MI | Residential Roofing",
    metaDescription:
      "Residential and commercial roofing from Dynamic Construction MI, an Owens Corning Preferred Contractor serving New Boston, Monroe, Carleton and Monroe County.",
    eyebrow: "Roofing",
    headline: "The roof is the shield over everything you own.",
    summary: "Shingle, metal and steel roofing for homes and businesses across Monroe County.",
    intro: [
      "Roofing is the cornerstone of Dynamic Construction MI. From minor repairs to complete replacements, the work is done by a crew with more than two decades of experience on Michigan homes.",
      "We serve New Boston, Monroe, Maybee, Ida, Newport and communities throughout Monroe County, installing Owens Corning shingle systems and metal and steel roofing.",
    ],
    hero: { photo: "roof-drone-finished" },
    gallery: ["roof-brick-ranch", "roof-white-gables", "roof-gray-balcony", "roof-cape-dormer", "roof-ridge-vents", "roof-suburban-split"],
    scopeTitle: "Roofing services",
    scope: ["Roof replacement", "Roof repair", "Metal & steel roofing", "Residential roofing", "Commercial roofing"],
    benefits: [
      {
        title: "Owens Corning systems",
        body: "Shingles, underlayment and ridge components from one manufacturer, installed as a system, with styles and colors to suit your home.",
      },
      {
        title: "Ventilation done properly",
        body: "Intake and exhaust are checked as part of the roof, because attic ventilation affects how long shingles last.",
      },
      {
        title: "A crew that respects your property",
        body: "Tarps protect landscaping during tear-off, and magnetic sweepers collect nails before we leave.",
      },
    ],
    process: [
      { title: "Free inspection", body: "We inspect the roof, decking, flashing and ventilation, and explain what we find." },
      { title: "Written estimate", body: "A detailed estimate shows what's included, with color samples and design tools to help you choose." },
      { title: "Installation", body: "Permits are handled. Most replacements are completed in one day, weather permitting." },
      { title: "Clean-up", body: "Debris hauled away and the yard swept with magnets." },
    ],
    claims: ["owensCorning", "warranty50", "oneDay", "licensedInsured", "freeEstimates", "financing"],
    faqs: [
      {
        q: "What roofing materials do you install?",
        a: "For shingle roofs, the company installs Owens Corning roofing products. Metal and steel roofing are also available.",
      },
      {
        q: "Do you work on commercial roofs?",
        a: "Yes. Roofing services cover both residential and commercial properties. For coating and restoration on flat, metal and rubber roofs, see Roof Restoration.",
      },
      {
        q: "How long does a new roof last?",
        a: "It depends on the material. Asphalt shingle roofs typically last 20 to 25 years, and metal roofs can last 50 years or more. Regular inspections and timely repairs help any roof reach its full lifespan.",
      },
      {
        q: "How do I choose a shingle color?",
        a: "We use samples and design tools to help you choose a color that complements your home.",
      },
    ],
    projectCategories: ["roofing"],
    related: ["roof-replacement", "roof-repair", "gutters"],
  },
  {
    slug: "roof-replacement",
    name: "Roof Replacement",
    short: "Roof Replacement",
    group: "roofing",
    enabled: true,
    metaTitle: "Roof Replacement in New Boston & Monroe, MI",
    metaDescription:
      "Complete roof replacement from Dynamic Construction MI. Most replacements finished in one day, Owens Corning systems, free inspections and financing. Serving Monroe County.",
    eyebrow: "Roof replacement",
    headline: "One day on your roof. Decades over your head.",
    summary: "Complete tear-off and replacement, usually finished in a single day.",
    intro: [
      "Aging materials, storm damage and repeated leaks eventually make repairs a poor investment. A full replacement resets the clock with new decking where needed, fresh underlayment, proper ventilation and a new shingle system.",
      "Most of our roof replacements in Monroe, Newport, Temperance and the surrounding area are completed in a single day, weather permitting, so your household is disrupted as little as possible.",
    ],
    hero: { photo: "roof-crew-brick-tearoff" },
    gallery: ["roof-crew-install", "roof-underlayment-drone", "roof-installer-harness", "roof-drone-street", "roof-ridge-close", "roof-brick-ranch-wide"],
    scopeTitle: "What a replacement includes",
    scope: [
      "Inspection of decking, flashing and ventilation",
      "Tear-off with yard and landscaping protected by tarps",
      "Decking repairs where needed",
      "Synthetic underlayment and new Owens Corning shingle system",
      "Ridge, vents and flashing details",
      "Clean-up with magnetic nail sweep",
    ],
    benefits: [
      {
        title: "Minimal disruption",
        body: "Most replacements are completed in one day. Larger or more complex roofs may take longer, and you get a clear timeline before work begins.",
      },
      {
        title: "Backed by the manufacturer",
        body: "Qualifying Owens Corning roofs carry a 50-year manufacturer material warranty, plus our own workmanship warranty.",
      },
      {
        title: "Value you can see",
        body: "A new roof improves curb appeal and is a major selling point for buyers in Monroe County.",
      },
    ],
    process: [
      { title: "Inspection", body: "We confirm whether replacement is the right call, or whether a repair will do." },
      { title: "Estimate & color", body: "A detailed written estimate, plus help choosing a shingle color." },
      { title: "Replacement day", body: "Permits handled, tear-off, decking, underlayment, shingles, ridge and vents." },
      { title: "Clean yard", body: "Tarps removed, debris hauled away and magnetic sweepers run across the property." },
    ],
    claims: ["oneDay", "warranty50", "owensCorning", "permits", "cleanup", "financing", "freeEstimates"],
    faqs: [
      {
        q: "How do I know if my roof needs replacing or just repairing?",
        a: "Missing or curled shingles, leaks, water stains inside, or shingle granules in the gutters are common warning signs. A free inspection tells you whether a repair will solve the problem or whether replacement is the smarter investment.",
      },
      {
        q: "How long does a roof replacement take?",
        a: "Most roof replacements are completed in one day, weather permitting. Larger or more complex projects may take longer, and you'll get a clear timeline before work begins.",
      },
      {
        q: "How much will my new roof cost?",
        a: "Cost depends on roof size, pitch, materials and any repairs to the structure underneath. You'll receive a detailed written estimate so you know exactly what to expect.",
      },
      {
        q: "What warranty comes with a new roof?",
        a: "Qualifying installations include the Owens Corning 50-year manufacturer material warranty, plus the company's own workmanship warranty. Ask for the specific terms that apply to your roof.",
      },
      {
        q: "Will replacing my roof make a mess of my yard?",
        a: "Tarps protect your property during tear-off, and magnetic sweepers collect nails and debris before the crew leaves.",
      },
      {
        q: "Do you handle permits?",
        a: "Yes. Permits and required inspections are handled for you according to local building codes.",
      },
      {
        q: "Do you offer financing?",
        a: "Yes, financing options are available and can be reviewed during your estimate.",
      },
    ],
    projectCategories: ["roofing"],
    related: ["roof-repair", "residential-roofing", "gutters"],
  },
  {
    slug: "roof-repair",
    name: "Roof Repair",
    short: "Roof Repair",
    group: "roofing",
    enabled: true,
    metaTitle: "Roof Repair & Emergency Roofing in Monroe County, MI",
    metaDescription:
      "Leak, storm and flashing repairs from Dynamic Construction MI. Emergency service available and free inspections across Monroe County, Michigan.",
    eyebrow: "Roof repair",
    headline: "Small leaks don't stay small. Let's find the source.",
    summary: "Leak, storm-damage and flashing repairs, with emergency service available.",
    intro: [
      "A small leak can quietly cause rot, mold, and damage to ceilings and walls. Catching it early is almost always cheaper than waiting.",
      "We inspect, find where the water is actually getting in, and recommend an honest fix, whether that's a targeted repair or, when it makes more sense, a replacement.",
    ],
    hero: { photo: "roof-installer-harness" },
    gallery: ["roof-repair-ladder", "roof-tearoff-boarded", "roof-cape-progress", "roof-ridge-close"],
    scopeTitle: "Common repairs",
    scope: [
      "Leak detection and repair",
      "Missing, lifted or damaged shingles",
      "Flashing around chimneys, vents and skylights",
      "Storm and wind damage",
      "Emergency service for urgent damage",
    ],
    benefits: [
      {
        title: "Know the warning signs",
        body: "Missing shingles, ceiling stains, sagging areas and damaged flashing all point to problems worth inspecting now.",
      },
      {
        title: "Repair or replace, honestly",
        body: "We'll tell you whether a repair will last or whether the money is better put toward a new roof.",
      },
      {
        title: "Skip the ladder",
        body: "Roof work is dangerous, and DIY mistakes with sealing or flashing often cause bigger leaks later.",
      },
    ],
    process: [
      { title: "Call or request", body: "Tell us what you're seeing. For urgent damage, call for emergency service." },
      { title: "Inspection", body: "We find the source of the problem, not just the stain." },
      { title: "Recommendation", body: "Clear options and a written estimate." },
      { title: "Repair", body: "The fix is completed and the area cleaned up." },
    ],
    claims: ["emergency", "freeEstimates", "licensedInsured", "financing"],
    faqs: [
      {
        q: "What are the signs I need a roof repair?",
        a: "Water stains on ceilings, missing or curled shingles, sagging areas, damaged flashing, and shingle granules collecting in gutters are the most common signs.",
      },
      {
        q: "Do you offer emergency roof service?",
        a: "Emergency service is available. If water is coming in, call (734) 636-3736.",
      },
      {
        q: "Should I repair or replace my roof?",
        a: "It depends on the roof's age, the extent of the damage, and whether problems keep recurring. A free inspection gives you an honest answer.",
      },
    ],
    projectCategories: ["roofing"],
    related: ["roof-replacement", "roof-restoration", "gutters"],
  },
  {
    slug: "roof-restoration",
    name: "Roof Restoration & Coatings",
    short: "Roof Restoration",
    group: "roofing",
    enabled: true,
    metaTitle: "GACO Roof Coatings & Restoration in Michigan",
    metaDescription:
      "GACO Certified Installer offering silicone roof coatings and restoration for flat, metal and rubber roofs on homes and commercial buildings across Michigan.",
    eyebrow: "GACO silicone restoration",
    headline: "Restore the roof you have. Seal it in one seamless layer.",
    summary: "GACO silicone coatings that waterproof and extend the life of existing roofs.",
    intro: [
      "When a flat, metal or rubber roof is aging but still structurally sound, replacement isn't always the only answer. A silicone coating system can restore and protect it, often delaying the cost of a full replacement.",
      "As a GACO Certified Installer, our team has completed manufacturer training and is approved to install GACO roofing systems to manufacturer standards.",
    ],
    hero: { drawing: "coating" },
    gallery: [],
    scopeTitle: "GACO coatings are commonly used on",
    scope: ["Flat roofs", "Metal roofs", "Rubber roofs", "Commercial buildings", "Industrial facilities"],
    benefits: [
      {
        title: "Seamless leak protection",
        body: "Silicone coatings create a continuous waterproof membrane designed to protect against leaks and weather damage.",
      },
      {
        title: "Performs in standing water",
        body: "Unlike many traditional coatings, GACO silicone systems are designed to keep their adhesion and performance where water sits on the roof.",
      },
      {
        title: "Manufacturer-backed options",
        body: "Certified installers may offer access to manufacturer-supported warranty programs on qualifying projects.",
      },
    ],
    process: [
      { title: "Roof inspection", body: "We evaluate the existing roof to confirm it's a good candidate for coating." },
      { title: "Recommendation", body: "Coating, repair or replacement: the right fit for your building and budget." },
      { title: "Preparation", body: "The surface is prepared to manufacturer requirements." },
      { title: "Application", body: "The GACO system is applied by trained, certified installers." },
    ],
    claims: ["gaco", "freeEstimates", "financing", "licensedInsured"],
    faqs: [
      {
        q: "Is a roof coating right for my building?",
        a: "If your roof is aging, leaking or worn but still structurally sound, a coating system may be a cost-effective alternative to replacement. An inspection will confirm whether it's a good fit.",
      },
      {
        q: "What types of roofs can be coated?",
        a: "GACO products are commonly used on flat, metal and rubber roofs, including commercial and industrial buildings.",
      },
      {
        q: "Why does GACO certification matter?",
        a: "Certified installers have received manufacturer-approved training and support, which helps ensure the system is installed correctly and performs as intended.",
      },
    ],
    projectCategories: [],
    related: ["roof-repair", "residential-roofing", "roof-replacement"],
  },
  {
    slug: "gutters",
    name: "Gutter Installation & Replacement",
    short: "Gutters",
    group: "exterior",
    enabled: true,
    metaTitle: "Seamless Gutters in Monroe County, MI | Installation & Guards",
    metaDescription:
      "Seamless gutter installation, replacement and gutter guards for homes and businesses in New Boston, Monroe, Maybee, Ida, Newport and Monroe County, MI.",
    eyebrow: "Gutters & drainage",
    headline: "Move water where it belongs: away from your foundation.",
    summary: "Seamless gutters, replacements and leaf protection, planned with your roof.",
    intro: [
      "Your gutter system directs water away from the house. When it fails or is missing, water causes foundation problems, basement leaks, soil erosion and damage to siding and trim.",
      "Dynamic Construction MI installs and replaces gutters for homes and businesses throughout Monroe County, and plans them together with your roof's ventilation as one system.",
    ],
    hero: { drawing: "gutter" },
    gallery: [],
    scopeTitle: "Gutter services",
    scope: [
      "Residential gutters",
      "Commercial gutters",
      "Seamless gutters",
      "Gutter installation",
      "Gutter replacement",
      "Gutter guards & leaf protection",
    ],
    benefits: [
      {
        title: "Protect the foundation",
        body: "Properly sized and pitched gutters carry water off the roof and away from the foundation, basement and landscaping.",
      },
      {
        title: "Roof and gutters as one system",
        body: "As Lomanco Ventilation certified professionals, we make sure gutters work with your roof's ventilation.",
      },
      {
        title: "Less maintenance",
        body: "Seamless runs and leaf protection reduce clogs and the yearly ladder routine.",
      },
    ],
    process: [
      { title: "Free inspection", body: "We look at your roof edges, downspout locations and where water ends up." },
      { title: "Estimate", body: "A written estimate covering gutter type, guards and downspouts." },
      { title: "Installation", body: "Permits handled where required, then installation." },
      { title: "Clean finish", body: "Downspouts directed and the site cleaned up." },
    ],
    claims: ["lomanco", "experience20", "licensedInsured", "permits", "freeEstimates", "financing"],
    faqs: [
      {
        q: "Why are seamless gutters worth it?",
        a: "Seamless gutters are formed in continuous lengths, so there are fewer joints where leaks and clogs usually start.",
      },
      {
        q: "Do you install gutter guards?",
        a: "Yes. Gutter guards and leaf protection are available with new installations and replacements.",
      },
      {
        q: "Do you work on commercial buildings?",
        a: "Yes, both residential and commercial gutter work is available.",
      },
    ],
    projectCategories: [],
    related: ["residential-roofing", "roof-replacement", "pole-barns"],
  },
];

export const enabledServices = services.filter((s) => s.enabled);

export function getService(slug: string): Service | undefined {
  return enabledServices.find((s) => s.slug === slug);
}

export const serviceGroups: { id: ServiceGroup; label: string; description: string }[] = [
  {
    id: "buildings",
    label: "Buildings",
    description: "Post-frame pole barns, garages and workshops planned around your property.",
  },
  {
    id: "roofing",
    label: "Roofing",
    description: "Replacement, repair and restoration from an Owens Corning Preferred Contractor.",
  },
  {
    id: "exterior",
    label: "Exterior",
    description: "Seamless gutters and drainage that protect what's below the roofline.",
  },
];
