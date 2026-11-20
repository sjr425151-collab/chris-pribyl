import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon, buttonVariants } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EstimateBand, PageHero } from "@/components/sections/sections";
import { photos } from "@/content/media";
import { categoryLabel, getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title} | ${categoryLabel(p.category)}`,
    description: `${p.description} A project by Dynamic Construction MI.`.slice(0, 300),
    path: `/work/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const services = project.services.map((s) => getService(s)).filter((s) => s !== undefined);
  const facts = [
    { k: "Category", v: categoryLabel(project.category) },
    project.location ? { k: "Location", v: project.location } : null,
    project.size ? { k: "Size", v: project.size } : null,
    { k: "Photos", v: String(project.gallery.length) },
  ].filter((f) => f !== null);

  return (
    <>
      <PageHero
        eyebrow={categoryLabel(project.category)}
        title={project.title}
        lede={project.summary}
        photo={project.cover}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: "Our Work", path: "/work" },
              { name: project.title, path: `/work/${project.slug}` },
            ]}
          />
        }
      />

      <section aria-labelledby="project-details" className="theme-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="project-details" className="text-headline font-[700]" data-reveal>
              About this project
            </h2>
            <p className="mt-6 text-lede text-slate" data-reveal>
              {project.description}
            </p>
            {services.length ? (
              <div className="mt-10 flex flex-wrap gap-3" data-reveal>
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className={buttonVariants({ variant: "outline-ink", size: "sm" })}>
                    {s.name}
                    <ArrowIcon />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-5" data-reveal>
            <dl className="grid grid-cols-2 border-t border-line-light-strong">
              {facts.map((f) => (
                <div key={f.k} className="border-b border-line-light py-5 pr-4">
                  <dt className="eyebrow text-bronze">{f.k}</dt>
                  <dd className="mt-2 font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
            <h3 className="eyebrow mt-10 text-bronze">Scope visible in photos</h3>
            <ul className="mt-4 space-y-2">
              {project.scope.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <span aria-hidden className="size-1.5 rotate-45 bg-blue" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Project photos" className="bg-charcoal py-6 md:py-10">
        <ul className="container-x grid gap-4 md:gap-6">
          {project.gallery.map((p) => {
            const { width, height } = photos[p].src;
            const portrait = height > width;
            return (
              <li key={p} data-reveal className={portrait ? "mx-auto w-full max-w-2xl" : ""}>
                <Photo name={p} fill={false} sizes={portrait ? "(min-width: 768px) 672px, 100vw" : "(min-width: 1408px) 1328px, 100vw"} className="rounded-2xl" />
              </li>
            );
          })}
        </ul>
      </section>

      <nav aria-label="Next project" className="border-t border-line-dark bg-charcoal">
        <Link href={`/work/${next.slug}`} className="group container-x flex items-center justify-between gap-6 py-12 md:py-16">
          <span>
            <span className="eyebrow block text-metal">Next project</span>
            <span className="mt-3 block text-headline font-[700] transition-colors group-hover:text-sky">{next.title}</span>
          </span>
          <span aria-hidden className="flex size-14 shrink-0 items-center justify-center rounded-full border border-line-dark-strong transition-colors group-hover:bg-paper group-hover:text-charcoal">
            <ArrowIcon className="size-5" />
          </span>
        </Link>
      </nav>

      <EstimateBand title="Planning something similar?" defaultService={project.services[0]} />
    </>
  );
}
