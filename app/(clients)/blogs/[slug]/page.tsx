import { Suspense } from "react";

import { notFound } from "next/navigation";

import { fetchGraphql } from "@/lib/graph-fetch";

import {
  GetPublishedPostsQuery,
  PostResponse,
} from "@/app/graphql/__generated__/generated";
import {
  GET_POST_BY_SLUG,
  GET_POSTS_STRING,
} from "@/app/graphql/queries/blog.queries";
import { BlogDetailWithMode } from "@/components/url-segment/blog/blog-details-components/blog-detail-with-mode";
import { BlogPostAuthor } from "@/components/url-segment/blog/blog-details-components/blog-post-author";
import { BlogPostHeader } from "@/components/url-segment/blog/blog-details-components/blog-post-header";
import { BlogPostHero } from "@/components/url-segment/blog/blog-details-components/blog-post-hero";
import { BlogPostJsonLd } from "@/components/url-segment/blog/blog-details-components/blog-post-json-ld";
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
 */
export const generateMetadata = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;

  try {
    const postResult = await fetchGraphql<{ postBySlug: PostResponse }>(
      GET_POST_BY_SLUG,
      { slug },
    );

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
        canonical: `${baseUrl}/blogs/${slug}`,
      },
    };
  } catch {
    return {
      title: "Loading error...",
      description: "Failed to load the blog post.",
    };
  }
};

/**
 * Used for generating sitemap entries.
 */
export async function generateSitemaps() {
  const response = await fetchGraphql<GetPublishedPostsQuery>(
    GET_POSTS_STRING,
    {
      filters: {
        page: 1,
        limit: 1000,
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
 */
export async function generateStaticParams() {
  const response = await fetchGraphql<GetPublishedPostsQuery>(
    GET_POSTS_STRING,
    {
      filters: {
        page: 1,
        limit: 1000,
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

  // Fetch blog detail with revalidation config
  const response = await fetchGraphql<{ postBySlug: PostResponse }>(
    GET_POST_BY_SLUG,
    { slug },
  );

  const post = response?.postBySlug?.success ? response.postBySlug.data : null;

  if (!post) {
    return notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center">
          Loading blog post...
        </div>
      }
    >
      <article className="slate-editor py-10">
        <BlogPostJsonLd post={post} baseUrl={baseUrl} />

        <div className="space-y-8">
          {/* Header Section */}
          <BlogPostHeader title={post.title} />

          {/* Visibility/Tracking */}
          <ReadTrack blogId={post.id} />

          {/* Featured Image */}
          <BlogPostHero src={post.mainImage ?? ""} alt={post.title} />

          {/* Author/Meta Section */}
          <BlogPostAuthor author={post.author} createdAt={post.createdAt} />

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
            <BlogDetailWithMode
              data={post.content || []}
              forcedMode="viewClient"
            />
          </div>
        </div>
      </article>
    </Suspense>
  );
};

export default SlugBlogPage;
