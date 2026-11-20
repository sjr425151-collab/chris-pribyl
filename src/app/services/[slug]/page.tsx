import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon, PhoneIcon, buttonVariants } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ServiceDrawing } from "@/components/brand/service-drawing";
import { ChapterLabel, ClaimList, EstimateBand, FaqList, PageHero, Process } from "@/components/sections/sections";
import { JsonLd } from "@/components/sections/json-ld";
import { ProjectCard } from "@/components/work/project-card";
import { business } from "@/content/business";
import { projectsFor } from "@/content/projects";
import { enabledServices, getService } from "@/content/services";
import { faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return enabledServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projectsFor(service.projectCategories, 3);
  const relatedServices = service.related.map((r) => getService(r)).filter((s) => s !== undefined);
  const heroPhoto = "photo" in service.hero ? service.hero.photo : undefined;
  const processPhoto = service.gallery[1] ?? service.gallery[0] ?? "roof-installer-harness";

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      {service.faqs.length ? <JsonLd data={faqJsonLd(service.faqs)} /> : null}

      <PageHero
        eyebrow={service.eyebrow}
        title={service.headline}
        lede={service.summary}
        photo={heroPhoto}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
            ]}
          />
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="#estimate" className={buttonVariants({ size: "lg" })} data-track="estimate_cta_click" data-track-label={`${service.slug} hero`}>
            Request an Estimate
            <ArrowIcon />
          </Link>
          <a href={business.phone.href} data-track-location={`${service.slug}-hero`} className={buttonVariants({ variant: "outline", size: "lg" })}>
            <PhoneIcon />
            {business.phone.display}
          </a>
        </div>
      </PageHero>

      {/* Overview */}
      <section aria-labelledby="overview-title" className="theme-paper py-20 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ChapterLabel index="01" label="Overview" tone="light" />
            <h2 id="overview-title" className="mt-6 text-headline font-[700]" data-reveal>
              {service.name} in Monroe County &amp; Southeast Michigan
            </h2>
            <div className="mt-8 space-y-5 text-lede text-slate" data-reveal>
              {service.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 border-t border-line-light pt-8" data-reveal>
              <ClaimList ids={service.claims} tone="light" />
            </div>
          </div>
          <aside className="lg:col-span-5" aria-labelledby="scope-title" data-reveal>
            <div className="rounded-2xl bg-charcoal p-8 text-paper md:p-10">
              <h3 id="scope-title" className="eyebrow text-metal">
                {service.scopeTitle}
              </h3>
              <ul className="mt-6 divide-y divide-line-dark">
                {service.scope.map((s, i) => (
                  <li key={s} className="flex gap-4 py-3.5">
                    <span aria-hidden className="font-mono text-xs text-steel pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <Link href="#estimate" className={`${buttonVariants({ variant: "light" })} mt-8 w-full`} data-track="estimate_cta_click" data-track-label={`${service.slug} scope`}>
                Get a free estimate
                <ArrowIcon />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Visual */}
      {service.gallery.length ? (
        <section aria-label={`${service.name} project photos`} className="bg-charcoal py-6 md:py-8">
          <div className="grid grid-cols-2 gap-2 px-2 md:grid-cols-6 md:gap-3 md:px-3" data-reveal-group>
            {service.gallery.slice(0, 6).map((p, i) => (
              <div
                key={p}
                data-reveal
                className={
                  i === 0
                    ? "col-span-2 md:col-span-4 md:row-span-2"
                    : i === 1
                      ? "md:col-span-2"
                      : i === 2
                        ? "md:col-span-2"
                        : "md:col-span-2"
                }
              >
                <Photo name={p} sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"} className="h-full min-h-[11rem] rounded-xl md:min-h-[16rem]" quality={60} />
              </div>
            ))}
          </div>
        </section>
      ) : "drawing" in service.hero ? (
        <section aria-label="Technical illustration" className="bg-charcoal py-16 md:py-24">
          <div className="container-x">
            <ServiceDrawing kind={service.hero.drawing} className="aspect-[4/3] rounded-2xl md:aspect-[16/9]" />
            <p className="mt-4 max-w-2xl text-sm text-steel">
              Illustration for explanation only. Project photography for this service will be added as work is documented.
            </p>
          </div>
        </section>
      ) : null}

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="bg-charcoal py-20 md:py-32">
        <div className="container-x">
          <ChapterLabel index="02" label="Why it matters" />
          <h2 id="benefits-title" className="mt-6 max-w-3xl text-headline font-[700]" data-reveal>
            What you get with {service.short.toLowerCase()} from Dynamic Construction
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark md:grid-cols-3" data-reveal-group>
            {service.benefits.map((b) => (
              <li key={b.title} className="bg-charcoal p-8 md:p-10" data-reveal>
                <span aria-hidden className="block h-px w-10 bg-metal" />
                <h3 className="mt-6 text-title font-[650]">{b.title}</h3>
                <p className="mt-3 text-steel">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process index="03" steps={service.process} photo={processPhoto} />

      {related.length ? (
        <section aria-labelledby="related-title" className="bg-charcoal py-20 md:py-32">
          <div className="container-x">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <ChapterLabel index="04" label="Related projects" />
                <h2 id="related-title" className="mt-6 text-headline font-[700]" data-reveal>
                  Recent {service.short.toLowerCase()} work
                </h2>
              </div>
              <Link href="/work" className={buttonVariants({ variant: "outline" })}>
                All projects
                <ArrowIcon />
              </Link>
            </div>
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
              {related.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {service.faqs.length ? (
        <section id="faq" aria-labelledby="faq-title" className="theme-paper scroll-mt-20 py-20 md:py-32">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ChapterLabel index="05" label="Questions" tone="light" />
              <h2 id="faq-title" className="mt-6 text-headline font-[700]" data-reveal>
                {service.short} FAQ
              </h2>
            </div>
            <div className="lg:col-span-8" data-reveal>
              <FaqList faqs={service.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      {relatedServices.length ? (
        <nav aria-label="Related services" className="border-t border-line-light bg-paper-2 text-charcoal">
          <div className="container-x grid divide-y divide-line-light md:grid-cols-3 md:divide-x md:divide-y-0">
            {relatedServices.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="group flex items-center justify-between gap-4 py-7 md:px-8 md:first:pl-0">
                <span>
                  <span className="eyebrow block text-bronze">Related service</span>
                  <span className="mt-2 block text-title font-[650]">{r.name}</span>
                </span>
                <ArrowIcon className="size-5" />
              </Link>
            ))}
          </div>
        </nav>
      ) : null}

      <EstimateBand title={`Get a free ${service.short.toLowerCase()} estimate.`} defaultService={service.slug} />
    </>
  );
}
