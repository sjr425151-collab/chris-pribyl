import Link from "next/link";
import { ArrowIcon, buttonVariants } from "@/components/ui/button";
import { business } from "@/content/business";

export default function NotFound() {
  return (
    <section className="blueprint flex min-h-[80svh] items-center bg-charcoal pt-32 pb-20">
      <div className="container-x">
        <p className="eyebrow text-metal">404 · Page not found</p>
        <h1 className="mt-6 max-w-3xl text-display font-[740]" style={{ fontVariationSettings: '"wdth" 112' }}>
          This page isn’t on the plans.
        </h1>
        <p className="mt-6 max-w-xl text-lede text-steel">It may have moved when we rebuilt the site. Try one of these, or call {business.phone.display}.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={buttonVariants({ variant: "light" })}>
            Home
            <ArrowIcon />
          </Link>
          <Link href="/services" className={buttonVariants({ variant: "outline" })}>
            Services
          </Link>
          <Link href="/work" className={buttonVariants({ variant: "outline" })}>
            Our work
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
            Request an estimate
          </Link>
        </div>
      </div>
    </section>
  );
}
