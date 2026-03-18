import type { PostModel } from "@/app/graphql/__generated__/generated";

interface BlogPostJsonLdProps {
  post: PostModel;
  baseUrl: string;
}

/**
 * Component for rendering Article and Breadcrumb structured data.
 */
export function BlogPostJsonLd({ post, baseUrl }: BlogPostJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
      url: `${baseUrl}/blogs/${post.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DEVS",
      url: baseUrl,
    },
    image: post.mainImage ?? "",
    description: post.description ?? "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blogs",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: `${baseUrl}/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([jsonLd, breadcrumbJsonLd]),
      }}
    />
  );
}
