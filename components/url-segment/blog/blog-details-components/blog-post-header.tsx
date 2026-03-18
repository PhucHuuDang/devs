interface BlogPostHeaderProps {
  title: string;
}

/**
 * Component for blog post header part.
 */
export function BlogPostHeader({ title }: BlogPostHeaderProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-8 leading-tight text-foreground">
        {title}
      </h1>
    </div>
  );
}
