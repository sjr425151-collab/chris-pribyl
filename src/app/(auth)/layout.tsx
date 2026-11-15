import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PhotoFrame } from "@/components/brand/photo-frame";
import { Wordmark } from "@/components/brand/wordmark";
import { site } from "@/content/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh flex-1 lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-5 py-6 md:px-10 md:py-8">
        <div className="flex items-center justify-between">
          <Wordmark />
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-bone">
            <ArrowLeft aria-hidden className="size-4" /> Back to site
          </Link>
        </div>
        <main id="main" className="flex flex-1 items-center justify-center py-14">
          <div className="w-full max-w-sm">{children}</div>
        </main>
        <p className="text-xs text-dim">{site.tagline}</p>
      </div>
      <div className="hidden p-3 lg:block">
        <PhotoFrame
          aspect="h-full"
          label="Supported single-leg balance"
          shot="Adult in their 60s balancing on one leg with fingertips on a kitchen counter, focused and relaxed. Warm morning light, shallow depth of field."
        />
      </div>
    </div>
  );
}
