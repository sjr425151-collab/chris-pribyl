import Link from "next/link";
import { Activity, CalendarDays, Home, Sparkles, Target } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Badge } from "@/components/ui/badge";

/**
 * Application shell for signed-in areas.
 *
 * PROTECTED LAYOUT CONCEPT — there is no authentication yet, so this route is
 * publicly viewable and renders sample content only. In the auth milestone,
 * add a session check here (inside a <Suspense> boundary, per Cache
 * Components) and redirect signed-out visitors to /login. See
 * docs/ARCHITECTURE.md.
 */
const appNav = [
  { label: "Today", href: "/dashboard#today", icon: Home },
  { label: "This week", href: "/dashboard#week", icon: CalendarDays },
  { label: "Moments", href: "/dashboard#moments", icon: Sparkles },
  { label: "Progress", href: "/dashboard#progress", icon: Activity },
  { label: "Priorities", href: "/dashboard#priorities", icon: Target },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <div className="border-b border-caution/25 bg-caution/[0.06]">
        <div className="container-page flex flex-col gap-1 py-2.5 text-xs text-caution sm:flex-row sm:items-center sm:justify-between">
          <span>
            <strong className="font-semibold">Design concept.</strong> Sample content only — not
            real customer data or results.
          </span>
          <Link href="/" className="underline-offset-4 hover:underline">
            Return to site
          </Link>
        </div>
      </div>

      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-ink-950 px-5 py-6 lg:flex">
          <Wordmark />
          <nav aria-label="Dashboard" className="mt-10">
            <ul className="flex flex-col gap-1">
              {appNav.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-mist transition-colors hover:bg-ink-850 hover:text-bone"
                  >
                    <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 rounded-lg border border-line p-4">
            <Badge className="self-start">Next reassessment</Badge>
            <p className="text-sm text-mist">Scheduled four weeks after your program starts.</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-line px-5 md:px-8 lg:hidden">
            <Wordmark />
            <Badge>Preview</Badge>
          </header>
          <nav aria-label="Dashboard sections" className="overflow-x-auto border-b border-line lg:hidden">
            <ul className="flex gap-1 px-3 py-2">
              {appNav.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="block whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-mist hover:text-bone">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main id="main" className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
