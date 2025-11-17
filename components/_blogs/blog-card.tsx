import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { truncate, TruncateOptions } from "lodash";
import {
  ChartNoAxesGanttIcon,
  HeartIcon,
  MessageCircleIcon,
  Shield,
} from "lucide-react";
import { RichBadge } from "../ui/badge-1";
import { HoverCardCustom } from "../custom/hover-card-custom";
import { AnimatedTooltip, AnimatedItemsProps } from "../ui/animated-tooltip";
import { BorderBeam } from "../ui/border-beam";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/lib/generate";
import { Skeleton } from "../ui/skeleton";

export interface BlogCardProps {
  title: string;
  description: string;
  mainImage: string;
  views: number;
  tags: string[];
  author: AnimatedItemsProps[];

  isBorderHover?: boolean;
  isBorderDefault?: boolean;
  options?: TruncateOptions;
  classImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const cardStyle = `hover:border-primary/20 rounded-3xl group transition-all duration-300 relative cursor-pointer hover:scale-105`;

export const BlogCard = ({
  title,
  description,
  mainImage,
  views,
  tags,
  author,
  isBorderDefault = false,
  isBorderHover = false,
  options = { length: 150 },
  classImage,
  createdAt,
  updatedAt,
}: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${generateSlug(title)}`);
  };

  return (
    <Card
      className={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isBorderHover && isHovered ? <BorderBeam /> : null}

      {isBorderDefault && <BorderBeam />}
      <CardHeader>
        <div className="flex flex-row items-center justify-start gap-2 mb-2">
          <AnimatedTooltip items={author} />

          <div className="flex flex-col items-start justify-start ml-4">
            <div className="text-sm font-semibold">{author[0].name}</div>
            <div className="text-sm text-gray-500">{author[0].designation}</div>
          </div>
        </div>

        <Image
          src={mainImage}
          alt={title}
          width={500}
          height={500}
          className={cn(
            `w-full h-full max-h-[500px] object-cover rounded-2xl`,
            classImage
          )}
          loading="eager"
        />

        <CardTitle>{title}</CardTitle>
        <CardDescription className=" h-auto min-h-20">
          {truncate(description, options)}
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <div className="flex items-center gap-1 h-auto flex-wrap min-h-14">
          {tags
            .map((tag: string, index: number) => {
              return (
                <RichBadge
                  key={tag + "-" + index}
                  icon={<Shield />}
                  variant="pink-subtle"
                  size="md"
                >
                  {tag}
                </RichBadge>
              );
            })
            .slice(0, 2)}

          <RichBadge variant="gray-subtle">+{10 - 2}</RichBadge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <RichBadge
          icon={<ChartNoAxesGanttIcon />}
          variant="purple-subtle"
          size="sm"
        >
          {views || 10} views
        </RichBadge>

        <div className="flex items-center gap-2">
          <HoverCardCustom
            trigger={
              <HeartIcon className="size-6 hover:text-rose-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out" />
            }
          >
            <div className="text-sm font-medium">Give a thumbs up</div>
          </HoverCardCustom>

          <HoverCardCustom
            trigger={
              <MessageCircleIcon className="size-6 hover:text-sky-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out" />
            }
          >
            <div className="text-sm font-medium">Leave a comment!</div>
          </HoverCardCustom>
        </div>
      </CardFooter>
    </Card>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <Card className={cardStyle}>
      <CardHeader>
        <div className="flex flex-row items-center justify-start gap-2 mb-2">
          <Skeleton className="w-10 h-10 rounded-full" />

          <div className="flex flex-col gap-1 items-start justify-start ml-1">
            <Skeleton className="w-28 h-4 rounded-full" />
            <Skeleton className="w-32 h-4 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-full h-60 rounded-2xl" />

        <div className="flex items-center gap-1">
          <Skeleton className="w-20 h-6 rounded-md" />
          <Skeleton className="w-20 h-6 rounded-md" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-4 rounded-md" />

          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="size-6 rounded-full" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
