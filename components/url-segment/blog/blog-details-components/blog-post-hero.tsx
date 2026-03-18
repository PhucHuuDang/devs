import Image from "next/image";

interface BlogPostHeroProps {
  src: string;
  alt: string;
}

/**
 * Component for rendering the main blog post image with consistent styling.
 */
export function BlogPostHero({ src, alt }: BlogPostHeroProps) {
  return (
    <div className="relative w-full aspect-video max-w-5xl mx-auto mt-6 overflow-hidden rounded-3xl shadow-lg">
      <Image
        src={src || "/image.jpg"}
        alt={alt}
        fill
        priority={true}
        quality={90}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
      />
    </div>
  );
}
