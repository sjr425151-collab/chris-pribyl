import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EstimateBand, PageHero } from "@/components/sections/sections";
import { PortfolioFilter } from "@/components/work/portfolio";
import { ProjectCard } from "@/components/work/project-card";
import { projectCategories, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work: Pole Barns, Garages & Roofing Projects",
  description:
    "Browse pole barns, garages, custom post-frame buildings and roof replacements by Dynamic Construction MI in Monroe County and Southeast Michigan.",
  path: "/work",
});

export default function WorkPage() {
  const categories = projectCategories
    .map((c) => ({ ...c, count: projects.filter((p) => p.category === c.id).length }))
    .filter((c) => c.count > 0);

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Built in Michigan. Photographed as built."
        lede="A selection of pole barns, garages, custom buildings and roofs by Dynamic Construction MI. Every image shows the company's own work."
        photo="barn-black-porch-front"
        breadcrumbs={<Breadcrumbs items={[{ name: "Our Work", path: "/work" }]} />}
      />
      <section aria-label="Project portfolio" className="bg-charcoal py-16 md:py-24">
        <div className="container-x">
          <PortfolioFilter
            categories={categories}
            items={projects.map((p) => ({
              slug: p.slug,
              category: p.category,
              node: <ProjectCard project={p} headingLevel="h2" />,
            }))}
          />
        </div>
      </section>
      <EstimateBand title="Have something like this in mind?" />
    </>
  );
}
