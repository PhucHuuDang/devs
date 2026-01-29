import React, { Suspense } from "react";

import { Metadata } from "next";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import { ActivityTimeline } from "@/components/profile/activity-timeline";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Activities",
  description: "View your recent activity history.",
};

function ActivityTimelineSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <Skeleton className="h-24 flex-1 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

const ActivitiesPage = () => {
  return (
    <Suspense fallback={<ActivityTimelineSkeleton />}>
      <SidebarInsetContent isSidebarInset={false}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
            <p className="text-muted-foreground">
              Your recent activity on the platform.
            </p>
          </div>
          <ActivityTimeline pageSize={10} />
        </div>
      </SidebarInsetContent>
    </Suspense>
  );
};

export default ActivitiesPage;
