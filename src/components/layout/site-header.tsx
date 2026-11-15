"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-500",
        scrolled || open
          ? "border-line bg-ink-950/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-18">
        <Wordmark />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    isActive(item.href) ? "text-bone" : "text-mist hover:text-bone",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/assessment">Start your assessment</Link>
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-full text-bone md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink-950 md:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex h-full flex-col py-8">
          <ul className="flex flex-col">
            {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-5 text-2xl font-medium tracking-[-0.02em]",
                    pathname === item.href ? "text-bone" : "text-mist",
                  )}
                >
                  {item.label}
                  {pathname === item.href ? (
                    <span aria-hidden className="size-1.5 rounded-full bg-lime" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Button asChild size="lg">
              <Link href="/assessment">Start your assessment</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
