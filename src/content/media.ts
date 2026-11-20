/**
 * Media catalogue. Every photo here is the company's own project photography,
 * taken from dynamicroofingmi.com galleries. Files were resized and stripped of
 * EXIF/GPS metadata (customer locations) before being added to the repo.
 *
 * Static imports give next/image intrinsic sizes (no layout shift) and blur placeholders.
 * To replace a photo, overwrite the file in src/assets/photos and keep the key.
 */
import type { StaticImageData } from "next/image";

import barnMachineShedSky from "@/assets/photos/barn-machine-shed-sky.webp";
import barnTanThreeBay from "@/assets/photos/barn-tan-three-bay.webp";
import barnBlackPorchFront from "@/assets/photos/barn-black-porch-front.webp";
import barnBlackPorchSide from "@/assets/photos/barn-black-porch-side.webp";
import barnRedTwoDoor from "@/assets/photos/barn-red-two-door.webp";
import barnRedDrive from "@/assets/photos/barn-red-drive.webp";
import barnCupolaPorch from "@/assets/photos/barn-cupola-porch.webp";
import barnCupolaDrive from "@/assets/photos/barn-cupola-drive.webp";
import barnCupolaPorchDetail from "@/assets/photos/barn-cupola-porch-detail.webp";
import residenceStonePorch from "@/assets/photos/residence-stone-porch.webp";
import barnWhiteBlackTallDoor from "@/assets/photos/barn-white-black-tall-door.webp";
import barnWhiteBlackSnow from "@/assets/photos/barn-white-black-snow.webp";
import barnRedFarmstead from "@/assets/photos/barn-red-farmstead.webp";
import barnBlackWide from "@/assets/photos/barn-black-wide.webp";
import barnInteriorFraming from "@/assets/photos/barn-interior-framing.webp";
import barnBrownEarly from "@/assets/photos/barn-brown-early.webp";
import barnGrayPorch from "@/assets/photos/barn-gray-porch.webp";
import barnGraySingle from "@/assets/photos/barn-gray-single.webp";
import barnRedWhiteDoors from "@/assets/photos/barn-red-white-doors.webp";
import barnCreamBlackDoors from "@/assets/photos/barn-cream-black-doors.webp";
import barnGrayBlackDoor from "@/assets/photos/barn-gray-black-door.webp";
import barnCreamSide from "@/assets/photos/barn-cream-side.webp";
import barnCreamLong from "@/assets/photos/barn-cream-long.webp";
import barnRedSky from "@/assets/photos/barn-red-sky.webp";
import barnRedLong from "@/assets/photos/barn-red-long.webp";
import barnRedField from "@/assets/photos/barn-red-field.webp";
import barnWhiteOpenBay from "@/assets/photos/barn-white-open-bay.webp";
import barnWhiteWindows from "@/assets/photos/barn-white-windows.webp";
import barnWhiteThreeBay from "@/assets/photos/barn-white-three-bay.webp";
import barnBrownGarage from "@/assets/photos/barn-brown-garage.webp";
import barnGrayTruck from "@/assets/photos/barn-gray-truck.webp";
import barnGrayLoft from "@/assets/photos/barn-gray-loft.webp";
import barnMaroonTwoDoor from "@/assets/photos/barn-maroon-two-door.webp";
import roofDroneFinished from "@/assets/photos/roof-drone-finished.webp";
import roofDroneWide from "@/assets/photos/roof-drone-wide.webp";
import roofDroneStreet from "@/assets/photos/roof-drone-street.webp";
import roofRidgeVents from "@/assets/photos/roof-ridge-vents.webp";
import roofRidgeClose from "@/assets/photos/roof-ridge-close.webp";
import roofCrewInstall from "@/assets/photos/roof-crew-install.webp";
import roofInstallerHarness from "@/assets/photos/roof-installer-harness.webp";
import roofCrewBrickTearoff from "@/assets/photos/roof-crew-brick-tearoff.webp";
import roofCrewBrickProgress from "@/assets/photos/roof-crew-brick-progress.webp";
import roofBrickRanch from "@/assets/photos/roof-brick-ranch.webp";
import roofBrickRanchWide from "@/assets/photos/roof-brick-ranch-wide.webp";
import roofGrayBalcony from "@/assets/photos/roof-gray-balcony.webp";
import roofWhiteGables from "@/assets/photos/roof-white-gables.webp";
import roofCapeDormer from "@/assets/photos/roof-cape-dormer.webp";
import roofCapeProgress from "@/assets/photos/roof-cape-progress.webp";
import roofUnderlaymentDrone from "@/assets/photos/roof-underlayment-drone.webp";
import roofBlueTwoStoryProgress from "@/assets/photos/roof-blue-two-story-progress.webp";
import roofTearoffBoarded from "@/assets/photos/roof-tearoff-boarded.webp";
import roofCrewBrickLadder from "@/assets/photos/roof-crew-brick-ladder.webp";
import roofRepairLadder from "@/assets/photos/roof-repair-ladder.webp";
import roofTwoStoryYard from "@/assets/photos/roof-two-story-yard.webp";
import roofSuburbanSplit from "@/assets/photos/roof-suburban-split.webp";

export type PhotoCategory = "pole-barns" | "roofing" | "process";

export interface PhotoAsset {
  src: StaticImageData;
  alt: string;
  /** CSS object-position focal point */
  position: string;
  category: PhotoCategory;
}

export const photos = {
  "barn-machine-shed-sky": { src: barnMachineShedSky, alt: "Long charcoal post-frame building with two open equipment bays under a dramatic evening sky", position: "50% 55%", category: "pole-barns" },
  "barn-tan-three-bay": { src: barnTanThreeBay, alt: "Tan pole barn with three black carriage-style overhead doors in golden evening light", position: "50% 60%", category: "pole-barns" },
  "barn-black-porch-front": { src: barnBlackPorchFront, alt: "Black pole barn with a wraparound covered porch on timber posts", position: "50% 55%", category: "pole-barns" },
  "barn-black-porch-side": { src: barnBlackPorchSide, alt: "Side view of a black pole barn with two overhead doors and a covered porch", position: "50% 55%", category: "pole-barns" },
  "barn-red-two-door": { src: barnRedTwoDoor, alt: "Red pole barn with white overhead doors and charcoal wainscot at the end of a gravel drive", position: "50% 45%", category: "pole-barns" },
  "barn-red-drive": { src: barnRedDrive, alt: "Red two-door pole barn framed by autumn trees at the end of a long drive", position: "50% 40%", category: "pole-barns" },
  "barn-cupola-porch": { src: barnCupolaPorch, alt: "Light gray post-frame building with cupolas, a covered porch and a large overhead door", position: "50% 55%", category: "pole-barns" },
  "barn-cupola-drive": { src: barnCupolaDrive, alt: "Gray pole barn with covered porch and cupola beside tall spruce trees", position: "50% 55%", category: "pole-barns" },
  "barn-cupola-porch-detail": { src: barnCupolaPorchDetail, alt: "Covered porch with timber posts and a cupola on a gray post-frame building", position: "50% 50%", category: "pole-barns" },
  "residence-stone-porch": { src: residenceStonePorch, alt: "Two-story home with metal roof, board-and-batten siding, stone wainscot and timber front porch", position: "50% 50%", category: "pole-barns" },
  "barn-white-black-tall-door": { src: barnWhiteBlackTallDoor, alt: "White pole barn with black wainscot and a tall overhead door in winter", position: "50% 50%", category: "pole-barns" },
  "barn-white-black-snow": { src: barnWhiteBlackSnow, alt: "White and black pole barn with a tall door, snow on the ground", position: "50% 50%", category: "pole-barns" },
  "barn-red-farmstead": { src: barnRedFarmstead, alt: "Red pole barn with three white overhead doors and an open lean-to on a farm property", position: "50% 50%", category: "pole-barns" },
  "barn-black-wide": { src: barnBlackWide, alt: "Black steel-sided pole barn with a single overhead door against a clear blue sky", position: "50% 45%", category: "pole-barns" },
  "barn-interior-framing": { src: barnInteriorFraming, alt: "Interior of a large post-frame building: wood trusses, wrapped walls and a poured concrete floor", position: "50% 50%", category: "pole-barns" },
  "barn-brown-early": { src: barnBrownEarly, alt: "Brown pole barn shortly after completion, framed by autumn trees", position: "50% 50%", category: "pole-barns" },
  "barn-gray-porch": { src: barnGrayPorch, alt: "Gray pole barn with a long covered porch on timber posts", position: "50% 55%", category: "pole-barns" },
  "barn-gray-single": { src: barnGraySingle, alt: "Gray pole barn with a large white overhead door and side lean-to", position: "50% 50%", category: "pole-barns" },
  "barn-red-white-doors": { src: barnRedWhiteDoors, alt: "Red pole barn with two white overhead doors and a walk door", position: "50% 50%", category: "pole-barns" },
  "barn-cream-black-doors": { src: barnCreamBlackDoors, alt: "Cream pole barn with two black overhead doors on a new gravel pad", position: "50% 45%", category: "pole-barns" },
  "barn-gray-black-door": { src: barnGrayBlackDoor, alt: "Gray pole barn with a wide black overhead door and black wainscot", position: "50% 45%", category: "pole-barns" },
  "barn-cream-side": { src: barnCreamSide, alt: "Cream pole barn with black wainscot, windows and a new concrete apron", position: "50% 45%", category: "pole-barns" },
  "barn-cream-long": { src: barnCreamLong, alt: "Long cream pole barn with black trim seen across a lawn", position: "50% 55%", category: "pole-barns" },
  "barn-red-sky": { src: barnRedSky, alt: "Red pole barn with two white overhead doors under a deep blue sky", position: "50% 50%", category: "pole-barns" },
  "barn-red-long": { src: barnRedLong, alt: "Long red pole barn with a row of windows beside a mowed field", position: "50% 50%", category: "pole-barns" },
  "barn-red-field": { src: barnRedField, alt: "Red pole barn with a dark overhead door at the edge of a tree line", position: "50% 50%", category: "pole-barns" },
  "barn-white-open-bay": { src: barnWhiteOpenBay, alt: "White pole barn with black wainscot and an open bay, framed by evergreens", position: "50% 50%", category: "pole-barns" },
  "barn-white-windows": { src: barnWhiteWindows, alt: "White pole barn with black wainscot and three windows on a raised base", position: "50% 55%", category: "pole-barns" },
  "barn-white-three-bay": { src: barnWhiteThreeBay, alt: "Long white pole barn with three open bays under an overcast sky", position: "50% 55%", category: "pole-barns" },
  "barn-brown-garage": { src: barnBrownGarage, alt: "Dark brown pole barn garage with a black overhead door", position: "50% 55%", category: "pole-barns" },
  "barn-gray-truck": { src: barnGrayTruck, alt: "Gray pole barn with two white overhead doors and a pickup on a new asphalt drive", position: "50% 50%", category: "pole-barns" },
  "barn-gray-loft": { src: barnGrayLoft, alt: "Two-story cream pole barn with an overhead door and upper windows", position: "50% 50%", category: "pole-barns" },
  "barn-maroon-two-door": { src: barnMaroonTwoDoor, alt: "Maroon pole barn with two overhead doors on a gravel pad", position: "50% 50%", category: "pole-barns" },
  "roof-drone-finished": { src: roofDroneFinished, alt: "Aerial view of a finished charcoal architectural shingle roof on a white home with gables", position: "50% 50%", category: "roofing" },
  "roof-drone-wide": { src: roofDroneWide, alt: "Aerial view of a completed shingle roof with the neighborhood behind", position: "50% 50%", category: "roofing" },
  "roof-drone-street": { src: roofDroneStreet, alt: "Aerial view of a new dark shingle roof over a home and attached garage", position: "50% 50%", category: "roofing" },
  "roof-ridge-vents": { src: roofRidgeVents, alt: "Close aerial view of new shingles with ridge cap and roof vents in neat rows", position: "50% 50%", category: "roofing" },
  "roof-ridge-close": { src: roofRidgeClose, alt: "Ridge line of a newly installed architectural shingle roof", position: "50% 50%", category: "roofing" },
  "roof-crew-install": { src: roofCrewInstall, alt: "Roofing crew installing underlayment and shingles on a residential roof", position: "50% 50%", category: "process" },
  "roof-installer-harness": { src: roofInstallerHarness, alt: "Roofer in a safety harness installing shingles near a chimney", position: "50% 40%", category: "process" },
  "roof-crew-brick-tearoff": { src: roofCrewBrickTearoff, alt: "Crew working across a brick home’s roof during a replacement, with tarps protecting the yard", position: "50% 50%", category: "process" },
  "roof-crew-brick-progress": { src: roofCrewBrickProgress, alt: "Roof replacement in progress on a brick home with a tall chimney", position: "50% 50%", category: "process" },
  "roof-brick-ranch": { src: roofBrickRanch, alt: "Brick ranch home with a newly installed charcoal shingle roof", position: "50% 50%", category: "roofing" },
  "roof-brick-ranch-wide": { src: roofBrickRanchWide, alt: "Brick ranch home with a new shingle roof and landscaped front yard", position: "50% 55%", category: "roofing" },
  "roof-gray-balcony": { src: roofGrayBalcony, alt: "Gray two-story home with a new roof and upper balcony", position: "50% 50%", category: "roofing" },
  "roof-white-gables": { src: roofWhiteGables, alt: "Aerial view of a new roof over a white home with multiple gables", position: "50% 50%", category: "roofing" },
  "roof-cape-dormer": { src: roofCapeDormer, alt: "Cape-style home with a new charcoal shingle roof and dormer", position: "50% 45%", category: "roofing" },
  "roof-cape-progress": { src: roofCapeProgress, alt: "Cape-style home mid-replacement with new decking and a dormer", position: "50% 45%", category: "process" },
  "roof-underlayment-drone": { src: roofUnderlaymentDrone, alt: "Synthetic underlayment installed across a roof before shingles", position: "50% 50%", category: "process" },
  "roof-blue-two-story-progress": { src: roofBlueTwoStoryProgress, alt: "Two-story blue home during a roof replacement", position: "50% 50%", category: "process" },
  "roof-tearoff-boarded": { src: roofTearoffBoarded, alt: "Garage roof during replacement with new decking and underlayment going on", position: "50% 50%", category: "process" },
  "roof-crew-brick-ladder": { src: roofCrewBrickLadder, alt: "Crew on the roof of a brick home during installation, ladder against the eave", position: "50% 50%", category: "process" },
  "roof-repair-ladder": { src: roofRepairLadder, alt: "Roofer on a ladder working at the eave of a home during roof work", position: "50% 45%", category: "process" },
  "roof-two-story-yard": { src: roofTwoStoryYard, alt: "Two-story home during roof work, seen from a wide lawn", position: "50% 50%", category: "process" },
  "roof-suburban-split": { src: roofSuburbanSplit, alt: "Split-level home with a newly installed shingle roof", position: "50% 45%", category: "roofing" },
} satisfies Record<string, PhotoAsset>;

export type PhotoKey = keyof typeof photos;

export function photo(key: PhotoKey): PhotoAsset {
  return photos[key];
}
