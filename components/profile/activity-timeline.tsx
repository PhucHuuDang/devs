"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { faker } from "@faker-js/faker";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import {
  FileText,
  Heart,
  MessageSquare,
  UserPlus,
  Edit,
  Eye,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface Activity {
  id: string;
  type: "post" | "comment" | "like" | "follow" | "edit" | "view";
  title: string;
  description?: string;
  target?: {
    id: string;
    title: string;
    type: "post" | "user";
  };
  createdAt: Date;
}

const activityIcons = {
  post: FileText,
  comment: MessageSquare,
  like: Heart,
  follow: UserPlus,
  edit: Edit,
  view: Eye,
};

const activityColors = {
  post: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  comment:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  like: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  follow:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  edit: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  view: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

interface ActivityTimelineItemProps {
  activity: Activity;
  isLast: boolean;
  index: number;
}

function ActivityTimelineItem({
  activity,
  isLast,
  index,
}: ActivityTimelineItemProps) {
  const Icon = activityIcons[activity.type];

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.05 }}
      className="relative flex gap-4"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 h-full w-px bg-border" />
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          activityColors[activity.type],
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <Card className="flex-1 transition-shadow hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="font-medium">{activity.title}</p>
              {activity.description && (
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              )}
              {activity.target && (
                <p className="text-sm">
                  <span className="text-muted-foreground">
                    {activity.target.type === "post" ? "on" : ""}
                  </span>{" "}
                  <span className="font-medium text-primary hover:underline cursor-pointer">
                    {activity.target.title}
                  </span>
                </p>
              )}
            </div>
            <time className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
            </time>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ActivityTimelineSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Mock data generator
function generateMockActivities(count: number): Activity[] {
  const types: Activity["type"][] = [
    "post",
    "comment",
    "like",
    "follow",
    "edit",
    "view",
  ];

  const templates = {
    post: () => ({
      title: "Published a new post",
      description: faker.lorem.sentence(),
      target: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        type: "post" as const,
      },
    }),
    comment: () => ({
      title: "Commented on a post",
      description: faker.lorem.sentence({ min: 5, max: 15 }),
      target: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        type: "post" as const,
      },
    }),
    like: () => ({
      title: "Liked a post",
      target: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        type: "post" as const,
      },
    }),
    follow: () => ({
      title: `Started following ${faker.person.firstName()}`,
      target: {
        id: faker.string.uuid(),
        title: faker.person.fullName(),
        type: "user" as const,
      },
    }),
    edit: () => ({
      title: "Edited a post",
      target: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        type: "post" as const,
      },
    }),
    view: () => ({
      title: "Viewed your post",
      target: {
        id: faker.string.uuid(),
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        type: "post" as const,
      },
    }),
  };

  return Array.from({ length: count }, (_, i) => {
    const type = faker.helpers.arrayElement(types);
    const template = templates[type]();

    return {
      id: faker.string.uuid(),
      type,
      ...template,
      createdAt: faker.date.recent({ days: 14 }),
    };
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

interface ActivityTimelineProps {
  initialActivities?: Activity[];
  pageSize?: number;
}

export function ActivityTimeline({
  initialActivities,
  pageSize = 10,
}: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>(
    initialActivities || [],
  );
  const [isLoading, setIsLoading] = useState(!initialActivities);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    if (!initialActivities) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setActivities(generateMockActivities(pageSize));
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialActivities, pageSize]);

  // Load more function
  const loadMore = useCallback(() => {
    if (isFetchingMore || !hasMore) return;

    setIsFetchingMore(true);
    // Simulate API call
    setTimeout(() => {
      const newActivities = generateMockActivities(pageSize);
      setActivities((prev) => [...prev, ...newActivities]);
      setIsFetchingMore(false);
      // Stop after 50 items for demo
      if (activities.length + pageSize >= 50) {
        setHasMore(false);
      }
    }, 500);
  }, [isFetchingMore, hasMore, pageSize, activities.length]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isFetchingMore, loadMore]);

  if (isLoading) {
    return <ActivityTimelineSkeleton />;
  }

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">No activities yet</h3>
        <p className="text-sm text-muted-foreground">
          Your recent activities will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <ActivityTimelineItem
          key={activity.id}
          activity={activity}
          isLast={index === activities.length - 1 && !hasMore}
          index={index}
        />
      ))}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="py-4">
        {isFetchingMore && (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        )}
        {!hasMore && activities.length > 0 && (
          <p className="text-center text-sm text-muted-foreground">
            You&apos;ve reached the end of your activities.
          </p>
        )}
      </div>
    </div>
  );
}
