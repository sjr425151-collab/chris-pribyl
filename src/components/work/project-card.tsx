import Link from "next/link";
import { Photo } from "@/components/ui/photo";
import { ArrowIcon } from "@/components/ui/button";
import { categoryLabel, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  tone = "dark",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  aspect = "aspect-[4/5]",
  headingLevel: H = "h3",
}: {
  project: Project;
  tone?: "dark" | "light";
  sizes?: string;
  aspect?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block" data-track="gallery_interaction" data-track-label={`card ${project.slug}`}>
      <div className="relative overflow-hidden rounded-2xl">
        <Photo
          name={project.cover}
          sizes={sizes}
          className={aspect}
          imgClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
          quality={60}
        />
        <span className="eyebrow absolute top-4 left-4 rounded-full bg-charcoal/70 px-3 py-1.5 text-paper backdrop-blur">{categoryLabel(project.category)}</span>
        {project.gallery.length > 1 ? (
          <span className="eyebrow absolute top-4 right-4 rounded-full bg-charcoal/70 px-3 py-1.5 text-paper/85 backdrop-blur">
            {project.gallery.length} photos
          </span>
        ) : null}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <H className="text-title font-[650]">{project.title}</H>
          <p className={cn("mt-1.5", tone === "dark" ? "text-steel" : "text-slate")}>
            {project.location ? `${project.location} · ` : ""}
            {project.summary}
          </p>
        </div>
        <span
          aria-hidden
          className={cn(
            "mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
            tone === "dark" ? "border-line-dark-strong group-hover:bg-paper group-hover:text-charcoal" : "border-line-light-strong group-hover:bg-charcoal group-hover:text-paper",
          )}
        >
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
