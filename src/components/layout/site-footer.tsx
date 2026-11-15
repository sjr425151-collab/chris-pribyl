import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { footerNav, imageryNote, site, wellnessDisclaimer } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="flex flex-col gap-5">
            <Wordmark />
            <p className="max-w-xs text-pretty text-mist">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <p className="eyebrow text-dim">{group.heading}</p>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-mist transition-colors duration-300 hover:text-bone"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-3xl flex-col gap-2 text-xs leading-relaxed text-dim">
            <p>{wellnessDisclaimer}</p>
            <p>{imageryNote}</p>
          </div>
          <p className="shrink-0 font-mono text-xs text-dim">
            © {site.name} · Pre-launch preview
          </p>
        </div>
      </div>
    </footer>
  );
}
