import Image from "next/image";

import { formatDate } from "@/app/utils/date";
import {
  AnimatedItemsProps,
  AnimatedTooltip,
} from "@/components/ui/animated-tooltip";

import type { PostModel } from "@/app/graphql/__generated__/generated";

interface BlogPostAuthorProps {
  author: PostModel["author"];
  createdAt: any;
}

/**
 * Component for rendering blog post author info with animated tooltip.
 */
export function BlogPostAuthor({ author, createdAt }: BlogPostAuthorProps) {
  if (!author) return null;

  const tooltipItems: AnimatedItemsProps[] = [
    {
      id: author.id ?? "",
      name: author.name ?? "N/A",
      designation: author.designation ?? "Author",
      image: author.image ?? "/image.jpg",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4 sm:px-6 lg:px-0">
      <div className="flex flex-row items-center justify-start gap-4">
        <div className="flex flex-row items-center justify-start gap-2">
          <AnimatedTooltip items={tooltipItems} />
        </div>
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-base text-primary font-semibold">
            {author.name}
          </h2>
          <div className="text-sm font-medium text-sky-500">
            posted on {formatDate(createdAt, "long")}
          </div>
        </div>
      </div>
    </div>
  );
}
