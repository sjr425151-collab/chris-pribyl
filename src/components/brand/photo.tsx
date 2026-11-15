import Image from "next/image";
import { photos, type PhotoKey } from "@/content/media";
import { cn } from "@/lib/utils";

interface PhotoProps {
  name: PhotoKey;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". Omit to fill the parent. */
  aspect?: string;
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
  priority?: boolean;
  /** Optional caption shown over the bottom edge. */
  caption?: string;
  /** Darken the lower part of the image so overlaid UI stays legible. */
  shade?: boolean;
  children?: React.ReactNode;
}

/**
 * Framed editorial photograph. Images live in /public/images and are
 * described in src/content/media.ts.
 */
export function Photo({
  name,
  className,
  aspect,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  caption,
  shade = false,
  children,
}: PhotoProps) {
  const photo = photos[name];
  return (
    <figure
      className={cn(
        "group/photo relative isolate overflow-hidden rounded-xl border border-line bg-ink-850",
        aspect,
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className="-z-20 object-cover transition-transform duration-[1.6s] ease-out-soft group-hover/photo:scale-[1.025]"
        style={{ objectPosition: photo.position ?? "center" }}
      />
      {/* Tone the image into the charcoal palette */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink-950/10 mix-blend-multiply" />
      {shade || caption ? (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent"
        />
      ) : null}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.04]" />
      {children}
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 p-5 md:p-6">
          <span className="eyebrow flex items-center gap-2 text-bone/80">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            {caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
