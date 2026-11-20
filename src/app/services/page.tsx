import Link from "next/link";
import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ServiceDrawing } from "@/components/brand/service-drawing";
import { ClaimList, EstimateBand, PageHero } from "@/components/sections/sections";
import { enabledServices, serviceGroups } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services: Pole Barns, Garages, Roofing & Gutters",
  description:
    "Pole barn and garage construction, roof replacement and repair, GACO roof restoration and seamless gutters from Dynamic Construction MI, serving Monroe County, Michigan.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything above the foundation, built to last."
        lede="Post-frame buildings, roofing and exterior work for homes, farms and businesses across Monroe County and Southeast Michigan."
        photo="barn-red-farmstead"
        breadcrumbs={<Breadcrumbs items={[{ name: "Services", path: "/services" }]} />}
      />

      {serviceGroups.map((group, gi) => {
        const list = enabledServices.filter((s) => s.group === group.id);
        if (!list.length) return null;
        return (
          <section key={group.id} aria-labelledby={`group-${group.id}`} className={gi % 2 === 0 ? "theme-paper py-20 md:py-28" : "bg-charcoal py-20 md:py-28"}>
            <div className="container-x">
              <div className="mb-12 grid gap-6 md:grid-cols-12" data-reveal>
                <p className={`eyebrow md:col-span-3 ${gi % 2 === 0 ? "text-bronze" : "text-metal"}`}>{String(gi + 1).padStart(2, "0")} / {group.label}</p>
                <div className="md:col-span-9">
                  <h2 id={`group-${group.id}`} className="text-headline font-[700]">
                    {group.label}
                  </h2>
                  <p className={`mt-3 max-w-2xl text-lede ${gi % 2 === 0 ? "text-slate" : "text-steel"}`}>{group.description}</p>
                </div>
              </div>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
                {list.map((s) => (
                  <li key={s.slug} data-reveal>
                    <Link href={`/services/${s.slug}`} className="group block h-full">
                      <div className="overflow-hidden rounded-2xl">
                        {"photo" in s.hero ? (
                          <Photo
                            name={s.hero.photo}
                            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                            className="aspect-[4/3]"
                            imgClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                            quality={60}
                          />
                        ) : (
                          <ServiceDrawing kind={s.hero.drawing} className="aspect-[4/3]" />
                        )}
                      </div>
                      <div className="mt-5 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-title font-[650]">{s.name}</h3>
                          <p className={`mt-2 ${gi % 2 === 0 ? "text-slate" : "text-steel"}`}>{s.summary}</p>
                        </div>
                        <span aria-hidden className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-current/25 transition-transform group-hover:translate-x-1">
                          <ArrowIcon />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="theme-graphite py-16">
        <div className="container-x">
          <ClaimList ids={["familyOwned", "licensedInsured", "freeEstimates", "financing", "emergency", "owensCorning"]} className="lg:grid-cols-3" />
        </div>
      </section>
      <EstimateBand title="Not sure where to start? Ask us." />
    </>
  );
}
