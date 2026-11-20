"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowIcon, PhoneIcon, buttonVariants } from "@/components/ui/button";
import { CONTACT_METHODS, PHOTO_LIMITS, estimateSchema, type EstimateField, type EstimateState } from "@/lib/leads/schema";
import { publicEnv } from "@/lib/env";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface Props {
  services: { value: string; label: string }[];
  defaultService?: string;
  phone: { display: string; href: string };
  schedulingUrl?: string;
  /** Visual context: dark sections or paper sections */
  tone?: "dark" | "light";
  idPrefix?: string;
}

const initialState: EstimateState = { status: "idle" };

/**
 * Client-side submission. Validates with the shared schema; if a lead endpoint
 * is configured the form is POSTed there (multipart, photos included) and is
 * reported as sent only on a 2xx response. Without an endpoint (preview builds)
 * the visitor is told plainly that nothing was sent.
 */
async function submitClient(formData: FormData, serviceValues: string[]): Promise<EstimateState> {
  const str = (k: string) => (typeof formData.get(k) === "string" ? (formData.get(k) as string) : "");
  const values = {
    name: str("name"),
    phone: str("phone"),
    email: str("email"),
    service: str("service"),
    location: str("location"),
    description: str("description"),
    contactMethod: str("contactMethod") || "phone",
  };
  if (str("company_website")) return { status: "error", message: "We couldn't send your request.", values };
  const parsed = estimateSchema.safeParse(values);
  const fieldErrors: Partial<Record<EstimateField, string>> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as EstimateField;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
  }
  if (values.service && values.service !== "other" && !serviceValues.includes(values.service)) fieldErrors.service = "Choose the type of project.";
  if (Object.keys(fieldErrors).length) return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };

  if (!publicEnv.leadEndpoint) {
    return { status: "preview", firstName: values.name.trim().split(" ")[0], values };
  }
  try {
    formData.delete("company_website");
    const res = await fetch(publicEnv.leadEndpoint, { method: "POST", body: formData, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(String(res.status));
    return { status: "success", firstName: values.name.trim().split(" ")[0] };
  } catch {
    return { status: "error", message: "Something went wrong, so your request was not sent.", values };
  }
}

/** Downscale a photo in the browser so uploads are fast on mobile data. */
async function downscale(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/heic" || file.type === "image/heif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const max = 1600;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function EstimateForm({ services, defaultService, phone, schedulingUrl, tone = "dark", idPrefix = "est" }: Props) {
  const [state, setState] = useState<EstimateState>(initialState);
  const [pending, setPending] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const next = await submitClient(new FormData(e.currentTarget), services.map((s) => s.value));
    setPending(false);
    setState(next);
  };
  const [photoNote, setPhotoNote] = useState<string>("");
  const [photoError, setPhotoError] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const started = useRef(false);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (k: string) => `${idPrefix}-${uid}-${k}`;

  const light = tone === "light";
  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    if (pageRef.current) pageRef.current.value = window.location.pathname;
    if (!defaultService && serviceRef.current) {
      const s = new URLSearchParams(window.location.search).get("service");
      if (s && services.some((o) => o.value === s)) serviceRef.current.value = s;
    }
  }, [defaultService, services]);

  useEffect(() => {
    // React resets the form after each submission; restore the hidden context fields.
    if (startedAtRef.current && !startedAtRef.current.value) startedAtRef.current.value = String(Date.now() - 60_000);
    if (pageRef.current) pageRef.current.value = window.location.pathname;
    if (state.status === "success" || state.status === "preview") {
      track("form_submit_success", { service: serviceRef.current?.value ?? "" });
      statusRef.current?.focus();
    } else if (state.status === "error") {
      track("form_submit_error", { fields: Object.keys(state.fieldErrors ?? {}).join(",") });
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      (firstInvalid ?? statusRef.current)?.focus();
    }
  }, [state]);

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: idPrefix });
  };

  async function onPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const files = Array.from(input.files ?? []);
    setPhotoError("");
    setPhotoNote("");
    if (!files.length) return;
    if (files.length > PHOTO_LIMITS.maxFiles) {
      setPhotoError(`Choose up to ${PHOTO_LIMITS.maxFiles} photos.`);
      input.value = "";
      return;
    }
    setProcessing(true);
    const processed = await Promise.all(files.map(downscale));
    setProcessing(false);
    const total = processed.reduce((n, f) => n + f.size, 0);
    if (total > PHOTO_LIMITS.maxTotalBytes || processed.some((f) => f.size > PHOTO_LIMITS.maxFileBytes)) {
      setPhotoError("Those photos are too large together. Try fewer photos — you can always share more later.");
      input.value = "";
      return;
    }
    try {
      const dt = new DataTransfer();
      processed.forEach((f) => dt.items.add(f));
      input.files = dt.files;
    } catch {
      /* Older browsers: originals are sent and validated server-side */
    }
    setPhotoNote(`${processed.length} photo${processed.length > 1 ? "s" : ""} ready (${(total / 1024 / 1024).toFixed(1)} MB)`);
  }

  if (state.status === "preview") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-2xl border p-8 outline-none md:p-10", light ? "border-line-light bg-white" : "border-line-dark-strong bg-graphite")}
      >
        <p className={cn("eyebrow", light ? "text-bronze" : "text-metal")}>Website preview</p>
        <h3 className="mt-4 text-headline font-[680]">Thanks, {state.firstName}. Your details check out.</h3>
        <p className={cn("mt-4 text-lede", light ? "text-slate" : "text-steel")}>
          This is a preview of the new website, so online requests aren&apos;t connected yet and nothing was sent. To request your estimate now, please call the office.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={phone.href} data-track-location="form-preview" className={buttonVariants({})}>
            <PhoneIcon />
            Call {phone.display}
          </a>
          <button type="button" onClick={() => setState({ status: "idle" })} className={buttonVariants({ variant: light ? "outline-ink" : "outline" })}>
            Back to the form
          </button>
        </div>
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn("rounded-2xl border p-8 outline-none md:p-10", light ? "border-line-light bg-white" : "border-line-dark-strong bg-graphite")}
      >
        <p className={cn("eyebrow", light ? "text-bronze" : "text-metal")}>Request received</p>
        <h3 className="mt-4 text-headline font-[680]">Thanks, {state.firstName}. We have your request.</h3>
        <p className={cn("mt-4 text-lede", light ? "text-slate" : "text-steel")}>
          A member of the Dynamic Construction team will contact you to talk through your project and set up a free estimate. Office hours are Monday to Friday, 8
          am to 4 pm.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={phone.href} data-track-location="form-success" className={buttonVariants({ variant: light ? "outline-ink" : "outline" })}>
            <PhoneIcon />
            Need us sooner? {phone.display}
          </a>
          {schedulingUrl ? (
            <a href={schedulingUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({})}>
              Pick a time for your estimate
              <ArrowIcon />
            </a>
          ) : null}
          <Link href="/work" className={buttonVariants({ variant: "ghost" })}>
            Browse our work
          </Link>
        </div>
      </div>
    );
  }

  const field = cn(
    "block w-full rounded-xl border px-4 text-base transition-[border-color,box-shadow] outline-none focus:ring-4",
    light
      ? "border-line-light-strong bg-white text-charcoal placeholder:text-slate/70 focus:border-blue focus:ring-blue/15 aria-invalid:border-danger-ink"
      : "border-line-dark-strong bg-charcoal/60 text-paper placeholder:text-steel/60 focus:border-sky focus:ring-sky/15 aria-invalid:border-danger",
  );
  const labelCls = cn("mb-2 block text-sm font-medium", light ? "text-charcoal" : "text-paper");
  const hint = cn("mt-2 text-sm", light ? "text-slate" : "text-steel");
  const errCls = cn("mt-2 text-sm font-medium", light ? "text-danger-ink" : "text-danger");

  const Err = ({ k }: { k: EstimateField }) =>
    errors[k] ? (
      <p id={id(`${k}-err`)} className={errCls}>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: EstimateField, extra?: string) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [errors[k] ? id(`${k}-err`) : "", extra ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} key={state.status === "error" ? JSON.stringify(state.values) : "form"} noValidate onFocus={onFirstInteraction} className="relative" aria-describedby={id("req")}>
      <div
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        className={cn("outline-none", state.status === "error" && state.message ? "mb-6" : "")}
      >
        {state.status === "error" && state.message ? (
          <p className={cn("rounded-xl border px-4 py-3 text-sm font-medium", light ? "border-danger-ink/30 bg-danger-ink/5 text-danger-ink" : "border-danger/30 bg-danger/10 text-danger")}>
            {state.message}{" "}
            {!state.fieldErrors ? (
              <a href={phone.href} className="underline underline-offset-2">
                {phone.display}
              </a>
            ) : null}
          </p>
        ) : null}
      </div>

      <p id={id("req")} className={cn("mb-6 text-sm", light ? "text-slate" : "text-steel")}>
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">with an asterisk</span> are required. Add a phone number or an email.
      </p>

      {/* Bot traps: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("hp")}>Leave this field empty</label>
        <input id={id("hp")} name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedAtRef} type="hidden" name="started_at" defaultValue="" />
      <input ref={pageRef} type="hidden" name="page" defaultValue="" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("name")} className={labelCls}>
            Full name <span aria-hidden>*</span>
          </label>
          <input id={id("name")} name="name" required autoComplete="name" defaultValue={v.name} className={cn(field, "h-13")} {...a11y("name")} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelCls}>
            Phone
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            className={cn(field, "h-13")}
            {...a11y("phone")}
          />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelCls}>
            Email
          </label>
          <input id={id("email")} name="email" type="email" autoComplete="email" defaultValue={v.email} className={cn(field, "h-13")} {...a11y("email")} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor={id("service")} className={labelCls}>
            Project type <span aria-hidden>*</span>
          </label>
          <select
            ref={serviceRef}
            id={id("service")}
            name="service"
            required
            defaultValue={v.service ?? defaultService ?? ""}
            className={cn(field, "h-13 appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='m2 4 4 4 4-4' fill='none' stroke='%23${light ? "101317" : "a5abb5"}' stroke-width='1.5'/%3E%3C/svg%3E")`,
            }}
            {...a11y("service")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
            <option value="other">Not sure / other</option>
          </select>
          <Err k="service" />
        </div>
        <div>
          <label htmlFor={id("location")} className={labelCls}>
            Project ZIP code or address <span aria-hidden>*</span>
          </label>
          <input
            id={id("location")}
            name="location"
            required
            autoComplete="postal-code"
            defaultValue={v.location}
            className={cn(field, "h-13")}
            {...a11y("location")}
          />
          <Err k="location" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("description")} className={labelCls}>
            Tell us about the project <span className={cn("font-normal", light ? "text-slate" : "text-steel")}>(optional)</span>
          </label>
          <textarea
            id={id("description")}
            name="description"
            rows={4}
            maxLength={2000}
            defaultValue={v.description}
            placeholder="For example: 30×40 pole barn with two overhead doors, or a leak near the chimney."
            className={cn(field, "resize-y py-3")}
            {...a11y("description")}
          />
          <Err k="description" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("photos")} className={labelCls}>
            Photos <span className={cn("font-normal", light ? "text-slate" : "text-steel")}>(optional, up to {PHOTO_LIMITS.maxFiles})</span>
          </label>
          <input
            id={id("photos")}
            name="photos"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            multiple
            onChange={onPhotos}
            className={cn(
              "block w-full rounded-xl border border-dashed p-3 text-sm file:mr-4 file:h-10 file:rounded-full file:border-0 file:px-4 file:font-medium",
              light ? "border-line-light-strong text-slate file:bg-charcoal file:text-paper" : "border-line-dark-strong text-steel file:bg-paper file:text-charcoal",
            )}
            {...a11y("photos", id("photos-hint"))}
          />
          <p id={id("photos-hint")} className={hint} aria-live="polite">
            {processing ? "Preparing photos…" : photoError || photoNote || "A photo of the roof, site or existing building helps us prepare."}
          </p>
          <Err k="photos" />
        </div>
        <fieldset className="sm:col-span-2">
          <legend className={labelCls}>Best way to reach you</legend>
          <div className="flex flex-wrap gap-2">
            {CONTACT_METHODS.map((m) => (
              <label
                key={m.value}
                className={cn(
                  "flex h-11 cursor-pointer items-center gap-2.5 rounded-full border px-4 text-sm transition-colors has-[:checked]:border-transparent has-[:focus-visible]:ring-4",
                  light
                    ? "border-line-light-strong has-[:checked]:bg-charcoal has-[:checked]:text-paper has-[:focus-visible]:ring-blue/25"
                    : "border-line-dark-strong has-[:checked]:bg-paper has-[:checked]:text-charcoal has-[:focus-visible]:ring-sky/30",
                )}
              >
                <input type="radio" name="contactMethod" value={m.value} defaultChecked={(v.contactMethod ?? "phone") === m.value} className="size-4 accent-blue" />
                {m.label}
              </label>
            ))}
          </div>
          <Err k="contactMethod" />
        </fieldset>
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending || processing} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
          {pending ? "Sending…" : "Request my free estimate"}
          {!pending ? <ArrowIcon /> : null}
        </button>
        <p className={cn("text-sm", light ? "text-slate" : "text-steel")}>
          Prefer to talk?{" "}
          <a href={phone.href} data-track-location="form" className={cn("font-medium underline underline-offset-2", light ? "text-charcoal" : "text-paper")}>
            {phone.display}
          </a>
        </p>
      </div>
      <p className={cn("mt-6 text-xs", light ? "text-slate" : "text-steel")}>
        We use your details only to respond to this request. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
