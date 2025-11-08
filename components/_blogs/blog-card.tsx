import React from "react";
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

export interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  views: number;
  tags: string[];
  author: AnimatedItemsProps[];
  options?: TruncateOptions;
  createdAt: string;
  updatedAt: string;
  classImage?: string;
}

const cardStyle = `hover:border-primary/20 rounded-3xl transition-all duration-300 relative`;

export const BlogCard = ({
  title,
  description,
  image,
  views,
  tags,
  author,
  options = { length: 150 },
  classImage,
  createdAt,
  updatedAt,
}: BlogCardProps) => {
  return (
    <Card className={cardStyle}>
      <BorderBeam />
      <CardHeader>
        <div className="flex flex-row items-center justify-start gap-2 ">
          <AnimatedTooltip items={author} />

          <div className="flex flex-col items-start justify-start ml-4">
            <div className="text-sm font-semibold">{author[0].name}</div>
            <div className="text-sm text-gray-500">{author[0].designation}</div>
          </div>
        </div>

        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className={cn(
            `w-full h-full max-h-[500px] object-cover rounded-2xl`,
            classImage
          )}
          loading="lazy"
        />

        <CardTitle>{title}</CardTitle>
        <CardDescription>{truncate(description, options)}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-1">
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
              <MessageCircleIcon className="size-6 hover:text-blue-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out" />
            }
          >
            <div className="text-sm font-medium">Leave a comment!</div>
          </HoverCardCustom>
        </div>
      </CardFooter>
    </Card>
  );
};
