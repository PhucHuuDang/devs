import { Suspense } from "react";

import Image from "next/image";
import { notFound } from "next/navigation";

import { isEmpty } from "lodash";

import { fetchGraphql } from "@/lib/graph-fetch";

import {
  GetPublishedPostsQuery,
  PostModel,
  PostResponse,
} from "@/app/graphql/__generated__/generated";
import {
  GET_POST_BY_SLUG,
  GET_POSTS_STRING,
} from "@/app/graphql/queries/blog.queries";
import { formatDate } from "@/app/utils/date";
import {
  AnimatedItemsProps,
  AnimatedTooltip,
} from "@/components/ui/animated-tooltip";
import { BlogDetailWithMode } from "@/components/url-segment/blog/blog-details-components/blog-detail-with-mode";
import { ReadTrack } from "@/components/url-segment/blog/blog-details-components/read-track";

interface SlugBlogPageProps {
  params: Promise<{ slug: string }>;
}

// ISR config

export const revalidate = 300; // seconds (5 minutes)
export const dynamic = "force-static";
export const dynamicParams = true;

const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL as string;

/**
 * Generate metadata for SEO using the most precise GraphQL query available.
 * Prefer single-post query for better freshness and SEO accuracy.
 */
export const generateMetadata = async ({ params }: SlugBlogPageProps) => {
  // NOTE: ISR: This runs at build and then every revalidation
  const { slug } = await params;

  try {
    // Use the most specific and up-to-date query (by slug)
    const postResult = await fetchGraphql<{ postBySlug: PostResponse }>(
      GET_POST_BY_SLUG,
      { slug },
    );

    // console.log({ postResult });

    if (!postResult?.postBySlug?.success || !postResult.postBySlug.data) {
      return {
        title: "Bài viết không tồn tại",
        description: "Bài viết bạn đang tìm kiếm không tồn tại.",
      };
    }

    const post = postResult.postBySlug.data;

    return {
      title: post.title,
      description: post.description ?? "",
      keywords: post.tags?.join(", "),
      authors: [{ name: post.author?.name }],
      openGraph: {
        title: post.title,
        description: post.description ?? "",
        images: [
          {
            url: post.mainImage ?? "",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: "article",
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.author?.name],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description ?? "",
        images: [
          {
            url: post.mainImage ?? "",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      alternates: {
        canonical: `https://www.devs.com/blogs/${slug}`,
      },
    };
  } catch {
    // On error fallback
    return {
      title: "Loading error...",
      description: "Failed to load the blog post.",
    };
  }
};

/**
 * Used for generating sitemap entry for all posts.
 */
export async function generateSitemaps() {
  const response = await fetchGraphql<GetPublishedPostsQuery>(
    GET_POSTS_STRING,
    {
      filters: {
        page: 1,
        limit: 1000, // fetch more for sitemaps
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );
  if (!response?.publishedPosts?.success) return [];

  const blogs = response.publishedPosts.data;

  return blogs.map((post) => ({
    slug: post.slug,
    lastModified: post.createdAt ? new Date(post.createdAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: post.mainImage ? [{ url: post.mainImage }] : undefined,
  }));
}

/**
 * Used for pre-rendering all blog slugs for static site generation.
 * Enables ISR for each slug.
 */
export async function generateStaticParams() {
  const response = await fetchGraphql<GetPublishedPostsQuery>(
    GET_POSTS_STRING,
    {
      filters: {
        page: 1,
        limit: 1000, // fetch all for pre-generation
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );

  let blogs: GetPublishedPostsQuery["publishedPosts"]["data"] = [];
  if (response?.publishedPosts?.success) {
    blogs = response.publishedPosts.data;
  }
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Blog Post Page with ISR, fresh GraphQL fetch, and enhanced SEO structure.
 */
const SlugBlogPage = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;
  // Use slug from params directly
  const url = new URL(baseUrl);

  // Always fetch latest from the backend for each ISR revalidation.
  const response = await fetchGraphql<{ postBySlug: PostResponse }>(
    GET_POST_BY_SLUG,
    { slug },
  );

  const postDetail = response?.postBySlug?.success
    ? response.postBySlug.data
    : undefined;

  if (isEmpty(postDetail)) {
    // This triggers a 404 page in Next.js
    return notFound();
  }

  // SEO Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postDetail.title,
    datePublished: postDetail.createdAt,
    dateModified: postDetail.updatedAt,
    author: {
      "@type": "Person",
      name: postDetail.author?.name,
      url: `${baseUrl}/blogs/${postDetail.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DEVS",
      url: baseUrl,
    },
    image: postDetail.mainImage ?? "",
    description: postDetail.description ?? "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${postDetail.slug}`,
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
        item: `${url.origin}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: postDetail.title,
        item: `${url.origin}/blogs/${postDetail.slug}`,
      },
    ],
  };

  const structuredData = [jsonLd, breadcrumbJsonLd];

  const author: AnimatedItemsProps[] = [
    {
      id: postDetail.author?.id ?? "",
      name: postDetail.author?.name ?? "N/A",
      designation: "N/A",
      image: postDetail.author?.image ?? "/image.jpg",
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <article className="slate-editor py-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <div className="w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-8 leading-tight">
              {postDetail.title}
            </h1>
          </div>
          <ReadTrack blogId={postDetail.id} />
          <div className="relative w-full aspect-video max-w-5xl mx-auto mt-6 overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={postDetail.mainImage ?? "/image.jpg"}
              alt={postDetail.title}
              fill
              priority={true}
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            />
          </div>
          <div className="max-w-5xl mx-auto mt-6 px-4 sm:px-6 lg:px-0">
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="flex flex-row items-center justify-start gap-2">
                <AnimatedTooltip items={author} />
              </div>
              <div className="flex ml-4 flex-col items-start justify-start ">
                <h2 className="text-base text-primary font-semibold">
                  {postDetail.author?.name}
                </h2>
                <div className="text-sm font-medium text-sky-500">
                  posted on {formatDate(postDetail.createdAt, "long")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
          <BlogDetailWithMode
            data={postDetail.content || []}
            forcedMode="viewClient"
          />
        </div>
      </article>
    </Suspense>
  );
};

export default SlugBlogPage;
