import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Photo } from "@/components/brand/photo";
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
      <div className="hidden p-3 lg:sticky lg:top-0 lg:block lg:h-dvh">
        <Photo name="balance" className="h-full" shade sizes="50vw" priority>
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-8 xl:p-12">
            <p className="eyebrow text-lime">Balance · Movement control</p>
            <p className="max-w-md text-balance text-title font-semibold text-bone">
              Your body wasn’t meant to feel restricted.
            </p>
          </div>
        </Photo>
      </div>
    </div>
  );
}
