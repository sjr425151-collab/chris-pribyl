import Link from "next/link";
import { ClassicWordmark } from "@/components/brand/wordmark";
import { PhoneIcon } from "@/components/ui/button";
import { business } from "@/content/business";
import { footerNav } from "@/content/navigation";
import { enabledServices } from "@/content/services";
import { counties } from "@/content/service-areas";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line-dark bg-charcoal pt-20 pb-8 text-paper">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-metal">Dynamic Construction MI</p>
            <address className="mt-5 text-lede not-italic leading-relaxed text-paper/90">
              {business.address.street}
              <br />
              {business.address.city}, {business.address.region} {business.address.postalCode}
            </address>
            <a
              href={business.phone.href}
              data-track-location="footer"
              className="mt-5 inline-flex items-center gap-3 font-display text-title font-[650] text-paper transition-colors hover:text-sky"
            >
              <PhoneIcon className="size-5 text-metal" />
              {business.phone.display}
            </a>
            <dl className="mt-6 space-y-1 text-sm text-steel">
              {business.hours.map((h) => (
                <div key={h.days} className="flex gap-3">
                  <dt className="w-36">{h.days}</dt>
                  <dd>{h.open ? `${h.open} – ${h.close}` : "Closed"}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-steel">Emergency service available.</p>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <p className="eyebrow mb-5 text-metal">Services</p>
            <ul className="space-y-2.5">
              {enabledServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-paper/80 transition-colors hover:text-paper">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <p className="eyebrow mb-5 text-metal">{group.title}</p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-paper/80 transition-colors hover:text-paper">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <p className="eyebrow mb-5 text-metal">Serving</p>
            <p className="text-paper/80">{counties.join(", ")}, Michigan, and surrounding communities.</p>
            <p className="eyebrow mt-8 mb-4 text-metal">Follow</p>
            <ul className="flex flex-wrap gap-2">
              {(
                [
                  ["Facebook", business.social.facebook],
                  ["Instagram", business.social.instagram],
                  ["Yelp", business.social.yelp],
                ] as const
              ).map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center rounded-full border border-line-dark-strong px-4 text-sm text-paper/85 transition-colors hover:border-paper/50 hover:text-paper"
                  >
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 select-none" aria-hidden>
          <ClassicWordmark className="text-[clamp(3.5rem,17vw,15rem)]" />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line-dark pt-6 text-sm text-steel md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Family-owned in Carleton, Michigan since {business.founded}.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/service-areas" className="hover:text-paper">
                Service Areas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

