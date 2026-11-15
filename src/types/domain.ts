/**
 * KINFORM domain model.
 *
 * These types describe the shared backend contract used by the website now
 * and by the future iOS/Android apps later. Keep them free of UI concerns.
 * They are intentionally ahead of the implementation: milestone 1 renders
 * no real user data.
 */

export type ID = string;
export type ISODateString = string;

/* ---------- Assessment areas (ordered by product priority) ---------- */

export type AssessmentAreaId =
  | "hip_mobility"
  | "ankle_mobility"
  | "shoulder_mobility"
  | "thoracic_mobility"
  | "balance"
  | "movement_control"
  | "core_stability"
  | "foundational_strength"
  | "reported_limitations";

export type AssessmentAreaCategory =
  | "mobility"
  | "movement_quality"
  | "balance_stability"
  | "strength"
  | "self_report";

/* ---------- Users and accounts ---------- */

export interface UserProfile {
  id: ID;
  displayName: string;
  createdAt: ISODateString;
  /** Self-described training background — never inferred. */
  experienceLevel?: "new" | "returning" | "regular";
  goals: string[];
}

export type SubscriptionTier = "assessment_only" | "monthly" | "premium";

export interface Subscription {
  id: ID;
  userId: ID;
  tier: SubscriptionTier;
  status: "active" | "past_due" | "canceled" | "trialing";
  currentPeriodEnd?: ISODateString;
}

/* ---------- Safety screening ---------- */

/**
 * Pre-participation screening. If any red flag is present, automatic
 * exercise recommendations must be withheld and the user referred to a
 * qualified healthcare professional.
 */
export interface SafetyScreening {
  id: ID;
  userId: ID;
  completedAt: ISODateString;
  redFlags: SafetyFlag[];
  /** Derived: true when redFlags is non-empty. Blocks auto-programming. */
  referralRecommended: boolean;
}

export type SafetyFlag =
  | "chest_pain_or_cardiac_history"
  | "unexplained_dizziness_or_fainting"
  | "recent_surgery_or_injury"
  | "pain_at_rest_or_worsening_pain"
  | "numbness_tingling_or_weakness"
  | "pregnancy_or_postpartum"
  | "clinician_advised_restrictions"
  | "other_medical_concern";

/* ---------- Assessment ---------- */

export type AssessmentStatus =
  | "purchased"
  | "screening"
  | "in_progress"
  | "submitted"
  | "under_review"
  | "complete"
  | "referred";

export interface Assessment {
  id: ID;
  userId: ID;
  status: AssessmentStatus;
  /** 0 for the initial assessment, then 1, 2, … for each 4-week reassessment. */
  sequence: number;
  screeningId?: ID;
  questionnaire?: QuestionnaireResponse;
  media: MediaAsset[];
  tests: MovementTestResult[];
  findings: Finding[];
  createdAt: ISODateString;
  completedAt?: ISODateString;
}

export interface QuestionnaireResponse {
  submittedAt: ISODateString;
  answers: Record<string, string | number | boolean | string[]>;
}

/**
 * Photos and videos. Stored in private storage; only signed, short-lived
 * URLs are ever issued to the owning user (and authorized reviewers).
 */
export interface MediaAsset {
  id: ID;
  assessmentId: ID;
  kind: "photo" | "video";
  /** Storage object path in a private bucket — never a public URL. */
  storagePath: string;
  captureProtocol: string;
  uploadedAt: ISODateString;
}

export interface MovementTestResult {
  id: ID;
  area: AssessmentAreaId;
  protocol: string;
  /** e.g. seconds held, repetitions, or a categorical rating. */
  value: number | string;
  unit?: "seconds" | "reps" | "cm" | "rating";
  /** Who recorded the value. */
  recordedBy: "user" | "reviewer";
}

/**
 * A single assessment finding. `source` keeps user-reported symptoms
 * strictly separate from observed movement patterns. Findings are movement
 * observations and training priorities — never diagnoses.
 */
export interface Finding {
  id: ID;
  area: AssessmentAreaId;
  source: "self_reported" | "observed";
  summary: string;
  trainingPriority: "primary" | "secondary" | "maintain";
  /** Set when the finding warrants professional follow-up. */
  referralNote?: string;
}

/* ---------- Programming ---------- */

export interface Program {
  id: ID;
  userId: ID;
  assessmentId: ID;
  /** Programs run in 4-week blocks followed by reassessment. */
  weeks: ProgramWeek[];
  priorities: AssessmentAreaId[];
  startsOn: ISODateString;
}

export interface ProgramWeek {
  index: 1 | 2 | 3 | 4;
  focus: string;
  sessions: Session[];
}

export interface Session {
  id: ID;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  estimatedMinutes: number;
  blocks: SessionBlock[];
}

export interface SessionBlock {
  label: "prepare" | "mobility" | "control" | "strength" | "cooldown";
  items: PrescribedExercise[];
}

export interface Exercise {
  id: ID;
  name: string;
  areas: AssessmentAreaId[];
  demoVideoPath?: string;
  cues: string[];
  /** Screening flags for which this exercise must not be auto-prescribed. */
  contraindicatedFlags: SafetyFlag[];
}

export interface PrescribedExercise {
  exerciseId: ID;
  sets?: number;
  reps?: number;
  holdSeconds?: number;
  sides?: "each" | "both";
  notes?: string;
}

/* ---------- Daily Movement Moments ---------- */

/** A short (2–5 minute) mobility or movement break, scheduled through the day. */
export interface MovementMoment {
  id: ID;
  title: string;
  durationMinutes: number;
  area: AssessmentAreaId;
  exerciseIds: ID[];
  context: "morning" | "desk_break" | "post_walk" | "evening";
}

/* ---------- Tracking ---------- */

export interface CheckIn {
  id: ID;
  userId: ID;
  weekOf: ISODateString;
  /** Self-reported 1–5 scales. */
  stiffness: number;
  energy: number;
  sessionsCompleted: number;
  notes?: string;
}
