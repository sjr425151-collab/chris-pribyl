import Image from "next/image";
import { photos, type PhotoKey } from "@/content/media";
import { cn } from "@/lib/utils";

interface PhotoProps {
  name: PhotoKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Preload as the LCP candidate */
  preload?: boolean;
  /** Fill the parent (parent must be positioned and sized). Default true. */
  fill?: boolean;
  /** Override alt text (e.g. "" when purely decorative next to a caption) */
  alt?: string;
  quality?: 60 | 75;
}

export function Photo({ name, sizes, className, imgClassName, preload, fill = true, alt, quality = 75 }: PhotoProps) {
  const p = photos[name];
  if (!fill) {
    return (
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        quality={quality}
        className={cn("h-auto w-full", imgClassName, className)}
        style={{ objectPosition: p.position }}
      />
    );
  }
  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        quality={quality}
        className={cn("object-cover", imgClassName)}
        style={{ objectPosition: p.position }}
      />
    </div>
  );
}
