import { z } from "zod";

export const CONTACT_METHODS = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
] as const;

export const PHOTO_LIMITS = {
  maxFiles: 5,
  /** Per file, after in-browser downscaling */
  maxFileBytes: 3 * 1024 * 1024,
  /** Whole request must stay under the 4.5 MB server action limit */
  maxTotalBytes: 4 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
} as const;

const phoneDigits = (v: string) => v.replace(/\D/g, "");

export const estimateSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(80, "Please shorten your name."),
    phone: z
      .string()
      .trim()
      .max(30)
      .refine((v) => v === "" || [10, 11].includes(phoneDigits(v).length), "Enter a 10-digit phone number, like (734) 555-0123."),
    email: z
      .string()
      .trim()
      .max(120)
      .refine((v) => v === "" || z.email().safeParse(v).success, "Enter an email address like name@example.com."),
    service: z.string().trim().min(1, "Choose the type of project."),
    location: z.string().trim().min(5, "Enter the project ZIP code or address.").max(160),
    description: z.string().trim().max(2000, "Please keep the description under 2,000 characters.").default(""),
    contactMethod: z.enum(["phone", "text", "email"], { message: "Choose how you'd like us to reach you." }),
  })
  .superRefine((v, ctx) => {
    if (!v.phone && !v.email) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Add a phone number or an email so we can reach you." });
    }
    if ((v.contactMethod === "phone" || v.contactMethod === "text") && !v.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Add a phone number, or choose email as your contact method." });
    }
    if (v.contactMethod === "email" && !v.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Add an email address, or choose phone as your contact method." });
    }
  });

export type EstimateInput = z.infer<typeof estimateSchema>;
export type EstimateField = keyof EstimateInput | "photos";

export interface EstimateState {
  status: "idle" | "success" | "error" | "preview";
  message?: string;
  fieldErrors?: Partial<Record<EstimateField, string>>;
  /** Echoed back so the form can keep what the visitor typed after an error */
  values?: Partial<Record<keyof EstimateInput, string>>;
  firstName?: string;
  reference?: string;
}
