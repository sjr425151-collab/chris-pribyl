import type { StaticImageData } from "next/image";
import ankleTest from "../../public/images/ankle-test.jpg";
import balance from "../../public/images/balance.jpg";
import deskRotation from "../../public/images/desk-rotation.jpg";
import heroSquat from "../../public/images/hero-squat.jpg";
import hipFlexor from "../../public/images/hip-flexor.jpg";
import shoulderReach from "../../public/images/shoulder-reach.jpg";
import stepDown from "../../public/images/step-down.jpg";
import wideReach from "../../public/images/wide-reach.jpg";

/**
 * Site photography.
 *
 * These images are AI-generated (Higgsfield) and illustrative. They show the
 * kinds of movement KINFORM uses. They do not show customers or results.
 * Replace them with commissioned photography when it's available; keep the
 * keys stable so no component needs to change.
 */
export interface SitePhoto {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
}

const photoMap = {
  heroSquat: {
    src: heroSquat,
    alt: "A woman in her fifties holding a supported deep squat, gripping a pole for balance, in warm studio light.",
    position: "60% 50%",
  },
  hipFlexor: {
    src: hipFlexor,
    alt: "A man in a half-kneeling hip flexor stretch on a mat in a dim living room lit by late-afternoon sun.",
    position: "55% 60%",
  },
  stepDown: {
    src: stepDown,
    alt: "A man in his fifties doing a slow step-down from a low step at home while a propped-up phone records him.",
  },
  balance: {
    src: balance,
    alt: "A woman in her sixties balancing on one leg with her fingertips resting on a kitchen counter.",
    position: "50% 12%",
  },
  deskRotation: {
    src: deskRotation,
    alt: "A man seated beside his desk doing an upper-back rotation stretch with arms crossed over his chest.",
    position: "60% 40%",
  },
  ankleTest: {
    src: ankleTest,
    alt: "An adult performing a knee-to-wall ankle mobility test, hands on the wall and knee driving forward.",
    position: "40% 55%",
  },
  shoulderReach: {
    src: shoulderReach,
    alt: "A woman raising a wooden dowel overhead in a controlled shoulder mobility reach.",
    position: "50% 30%",
  },
  wideReach: {
    src: wideReach,
    alt: "An adult in a wide, dim space reaching both arms overhead in a slow full-body stretch, lit by a shaft of light.",
    position: "80% 50%",
  },
} satisfies Record<string, SitePhoto>;

export type PhotoKey = keyof typeof photoMap;
export const photos: Record<PhotoKey, SitePhoto> = photoMap;
