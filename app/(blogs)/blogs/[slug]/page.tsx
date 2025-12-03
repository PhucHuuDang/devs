import { GetPostsQuery, Query } from "@/app/graphql/__generated__/graphql";
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
import { fetchGraphql } from "@/lib/graph-fetch";
import Image from "next/image";
import { isEmpty } from "lodash";
import { baseUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
interface SlugBlogPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;
export const dynamic = "force-static";

export const generateMetadata = async ({ params }: SlugBlogPageProps) => {
  try {
    const { slug } = await params;
    const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(
      GET_POSTS_STRING
    );

    const post = allPosts.find((post) => post.slug === slug);
    // console.log({ post });

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
        modifiedTime: post?.updatedAt,
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
  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(
    GET_POSTS_STRING,
    {},
    {
      cache: "force-cache",
    }
  );

  if (allPosts.length === 0) {
    return [];
  }

  return allPosts.map((post) => ({
    slug: post.slug,
    lastModified: post.updatedAt ?? new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: post.mainImage ? [{ url: post.mainImage }] : undefined,
  }));
}

export async function generateStaticParams() {
  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const SlugBlogPage = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;

  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  const url = new URL(process.env.NEXT_PUBLIC_CLIENT_URL as string);

  // console.log({ allPosts });

  const { findPostBySlug = {} as Query["findPostBySlug"] } =
    await fetchGraphql<Query>(GET_POST_BY_SLUG, {
      slug,
    });

  if (isEmpty(findPostBySlug)) {
    return notFound();
  }

  // console.log({ baseUrl });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: findPostBySlug.title,
    datePublished: findPostBySlug.createdAt,
    dateModified: findPostBySlug.updatedAt,
    author: {
      "@type": "Person",
      name: findPostBySlug.author?.name,
      url: `${baseUrl}/${findPostBySlug.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "DEVS",
      url: baseUrl,
    },
    image: findPostBySlug.mainImage ?? "",
    description: findPostBySlug.description ?? "",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${findPostBySlug.slug}`,
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
        name: findPostBySlug.title,
        item: `${url.origin}/blogs/${findPostBySlug.slug}`,
      },
    ],
  };

  const structuredData = [jsonLd, breadcrumbJsonLd];

  const author: AnimatedItemsProps[] = [
    {
      id: findPostBySlug.author.id,
      name: findPostBySlug.author.name,
      designation: findPostBySlug.author.designation ?? "N/A",
      image: findPostBySlug.author.avatarUrl ?? "/image.jpg",
    },
  ];

  return (
    <>
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
              {findPostBySlug.title}
            </h1>
          </div>

          <ReadTrack blogId={findPostBySlug.id} />

          {/* Hero Image - Optimized for performance and responsive design */}
          <div className="relative w-full aspect-video max-w-5xl mx-auto mt-6 overflow-hidden rounded-3xl shadow-lg">
            <Image
              src={findPostBySlug.mainImage ?? "/image.jpg"}
              alt={findPostBySlug.title}
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
                  {findPostBySlug.author.name}
                </h2>

                <div className="text-sm font-medium text-sky-500">
                  posted on {formatDate(findPostBySlug.createdAt, "long")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
          <BlogDetailWithMode
            data={findPostBySlug.content || []}
            forcedMode="viewClient"
          />
        </div>
      </article>
    </>
  );
};

export default SlugBlogPage;
