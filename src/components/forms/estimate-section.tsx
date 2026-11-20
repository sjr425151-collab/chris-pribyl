import { EstimateForm } from "./estimate-form";
import { business } from "@/content/business";
import { enabledServices } from "@/content/services";
import { publicEnv } from "@/lib/env";

export function serviceOptions() {
  return enabledServices.map((s) => ({ value: s.slug, label: s.name }));
}

/** Server wrapper: supplies service options and contact details to the client form. */
export function Estimate({ defaultService, tone, idPrefix }: { defaultService?: string; tone?: "dark" | "light"; idPrefix?: string }) {
  return (
    <EstimateForm
      services={serviceOptions()}
      defaultService={defaultService}
      phone={{ display: business.phone.display, href: business.phone.href }}
      schedulingUrl={publicEnv.schedulingUrl || undefined}
      tone={tone}
      idPrefix={idPrefix}
    />
  );
}
