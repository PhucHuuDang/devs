import { Suspense } from "react";

import Image from "next/image";
import { notFound } from "next/navigation";

import { isEmpty } from "lodash";

import { fetchGraphql } from "@/lib/graph-fetch";

import {
  GetPublishedPostsQuery,
  PostModel,
  PostResponse,
  Query,
} from "@/app/graphql/__generated__/generated";
import {
  GET_POST_BY_SLUG,
  GET_POSTS_STRING,
} from "@/app/graphql/queries/blog.queries";
import { formatDate } from "@/app/utils/date";
import { BlogDetailWithMode } from "@/components/_url-segment/blog/blog-details-components/blog-detail-with-mode";
import { ReadTrack } from "@/components/_url-segment/blog/blog-details-components/read-track";
import {
  AnimatedItemsProps,
  AnimatedTooltip,
} from "@/components/ui/animated-tooltip";

interface SlugBlogPageProps {
  params: Promise<{ slug: string }>;
}

type GetPostBySlugResult = {
  postBySlug: PostResponse;
};

export const dynamicParams = true;
export const revalidate = 300;
export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL as string;

export const generateMetadata = async ({ params }: SlugBlogPageProps) => {
  try {
    const { slug } = await params;

    const response = await fetchGraphql<GetPublishedPostsQuery>(
      GET_POSTS_STRING,
      {
        filters: {
          page: 1,
          limit: 12,
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      },
    );

    if (response.publishedPosts.success === false) {
      return {
        title: "Bài viết không tồn tại",
        description: "Bài viết bạn đang tìm kiếm không tồn tại.",
      };
    }

    const blogs = response.publishedPosts.data;

    const post = blogs.find((post) => post.slug === slug);
    console.log({ post });

    if (!post) {
      return {
        title: "Bài viết không tồn tại",
        description: "Bài viết bạn đang tìm kiếm không tồn tại.",
      };
    }

    return {
      title: post?.title,
      description: post?.description ?? "",
      keywords: post?.tags.join(", "),

      author: [{ name: post?.author.name }],

      openGraph: {
        title: post?.title,
        description: post?.description ?? "",
        images: [
          {
            url: post?.mainImage ?? "",
            width: 1200,
            height: 630,
            alt: post?.title,
          },
        ],
        type: "article",
        publishedTime: post?.createdAt,
        modifiedTime: post?.createdAt,
        authors: [post?.author.name],
      },
      twitter: {
        card: "summary_large_image",
        title: post?.title,
        description: post?.description ?? "",
        images: [
          {
            url: post?.mainImage ?? "",
            width: 1200,
            height: 630,
            alt: post?.title,
          },
        ],
      },

      alternates: {
        canonical: `https://www.devs.com/blogs/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Loading error...",
      description: "Failed to load the blog post.",
    };
  }
};

export async function generateSitemaps() {
  const response = await fetchGraphql<GetPublishedPostsQuery>(
    GET_POSTS_STRING,
    {
      filters: {
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );

  if (response.publishedPosts.success === false) {
    return [];
  }

  const blogs = response.publishedPosts.data;

  return blogs.map((post) => ({
    slug: post.slug,
    lastModified: post.createdAt ?? new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: post.mainImage ? [{ url: post.mainImage }] : undefined,
  }));
}

export async function generateStaticParams() {
  const response = await fetchGraphql<GetPublishedPostsQuery>(
    GET_POSTS_STRING,
    {
      filters: {
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
  );

  let blogs: GetPublishedPostsQuery["publishedPosts"]["data"] = [];

  if (response.publishedPosts.success === true) {
    blogs = response.publishedPosts.data;
  }

  // console.log({ blogs });

  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

const SlugBlogPage = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;

  const url = new URL(process.env.NEXT_PUBLIC_CLIENT_URL as string);

  const response = await fetchGraphql<GetPostBySlugResult>(GET_POST_BY_SLUG, {
    slug,
  });

  // const data = await fetchGraphql<GetPublishedPostsQuery>(
  //   GET_POSTS_STRING,
  //   {
  //     filters: {
  //       page: 1,
  //       limit: 100,
  //       sortOrder: "desc",
  //       sortBy: "createdAt",

  //     },
  //   }
  // );

  // console.log({ response });

  // console.log({data});

  let postDetail: PostModel | undefined;

  if (response?.postBySlug?.success) {
    postDetail = response.postBySlug.data ?? undefined;
  }

  // let postDetail

  // await fetchGraphql<PostModel>(GET_POST_BY_SLUG, {
  //   slug,
  // });

  if (isEmpty(postDetail)) {
    return notFound();
  }

  // console.log({ baseUrl });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postDetail.title,
    datePublished: postDetail.createdAt,
    dateModified: postDetail.updatedAt,
    author: {
      "@type": "Person",
      name: postDetail.author?.name,
      url: `${baseUrl}/${postDetail.slug}`,
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
      "@id": `${baseUrl}/${postDetail.slug}`,
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
      id: postDetail.author.id,
      name: postDetail.author.name ?? "N/A",
      designation: "N/A",
      image: postDetail.author.image ?? "/image.jpg",
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

          {/* Hero Image - Optimized for performance and responsive design */}
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
                  {postDetail.author.name}
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
