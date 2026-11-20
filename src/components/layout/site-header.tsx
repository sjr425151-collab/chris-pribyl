"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { ArrowIcon, PhoneIcon, buttonVariants } from "@/components/ui/button";
import { business } from "@/content/business";
import { primaryNav } from "@/content/navigation";
import { enabledServices, serviceGroups } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Transparent over each page's dark hero, then compact and solid once the
 * visitor scrolls. Desktop "Services" is a disclosure menu; mobile uses a
 * full-screen dialog with focus containment and Escape to close.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesId = useId();
  const servicesRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- route change must reset menu state
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Desktop services menu: close on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        servicesRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Mobile dialog: scroll lock, focus containment, Escape
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key !== "Tab" || !dialog) return;
      const items = dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const solid = scrolled || menuOpen;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-soft",
        solid
          ? "bg-charcoal/88 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl"
          : "bg-gradient-to-b from-charcoal/70 via-charcoal/25 to-transparent",
      )}
    >
      <div
        className={cn(
          "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-soft",
          solid ? "h-16" : "h-[4.5rem] lg:h-24",
        )}
      >
        <Link href="/" aria-label={`${business.name} — home`} className="relative z-10 -m-1 rounded-md p-1" data-track="nav_click" data-track-label="logo">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls={servicesId}
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                "flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.92rem] text-paper/85 transition-colors hover:text-paper",
                (servicesOpen || isActive("/services")) && "text-paper",
              )}
            >
              Services
              <svg aria-hidden viewBox="0 0 12 12" className={cn("size-3 transition-transform duration-300", servicesOpen && "rotate-180")}>
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div
              id={servicesId}
              hidden={!servicesOpen}
              className="absolute top-full left-1/2 mt-3 w-[min(46rem,calc(100vw-4rem))] -translate-x-1/2 rounded-2xl border border-line-dark-strong bg-charcoal-2/97 p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            >
              <div className="grid grid-cols-3 gap-1">
                {serviceGroups.map((group) => (
                  <div key={group.id} className="p-3">
                    <p className="eyebrow mb-3 text-metal">{group.label}</p>
                    <ul className="space-y-0.5">
                      {enabledServices
                        .filter((s) => s.group === group.id)
                        .map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
                              data-track="nav_click"
                              className="block rounded-lg px-2 py-2 -mx-2 text-[0.95rem] text-paper/90 transition-colors hover:bg-white/[0.06] hover:text-paper"
                            >
                              {s.short}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link
                href="/services"
                data-track="nav_click"
                className="group mt-1 flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-steel transition-colors hover:text-paper"
              >
                All services
                <ArrowIcon />
              </Link>
            </div>
          </div>
          {primaryNav
            .filter((i) => i.href !== "/services")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-track="nav_click"
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative flex h-10 items-center rounded-full px-4 text-[0.92rem] text-paper/85 transition-colors hover:text-paper",
                  isActive(item.href) && "text-paper after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:bg-metal",
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phone.href}
            data-track-location="header"
            className="hidden h-10 items-center gap-2 rounded-full px-3 text-[0.92rem] text-paper/90 transition-colors hover:text-paper xl:flex"
          >
            <PhoneIcon className="size-4 text-metal" />
            {business.phone.display}
          </a>
          <Link href="/contact" className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")} data-track-label="header estimate">
            Request Estimate
          </Link>
          <a
            href={business.phone.href}
            data-track-location="header-mobile"
            aria-label={`Call ${business.phone.display}`}
            className="flex size-11 items-center justify-center rounded-full border border-line-dark-strong text-paper lg:hidden"
          >
            <PhoneIcon className="size-[1.1rem]" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line-dark-strong text-paper lg:hidden"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300", menuOpen ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300", menuOpen ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-charcoal lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col pt-6 pb-10">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line-dark border-y border-line-dark">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-track="nav_click"
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-display text-[1.6rem] font-[650]"
                    style={{ fontVariationSettings: '"wdth" 110' }}
                  >
                    {item.label}
                    <ArrowIcon className="size-5 text-metal" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8 mb-3 text-metal">Services</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {enabledServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} data-track="nav_click" className="block py-2 text-paper/85">
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-10">
            <Link href="/contact" className={buttonVariants({ size: "lg" })} data-track-label="menu estimate">
              Request an Estimate
              <ArrowIcon />
            </Link>
            <a href={business.phone.href} data-track-location="menu" className={buttonVariants({ variant: "outline", size: "lg" })}>
              <PhoneIcon />
              Call {business.phone.display}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
