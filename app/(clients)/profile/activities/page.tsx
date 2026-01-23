import React, { Suspense } from "react";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";

const ActivitiesPage = () => {
  return (
    <Suspense>
      <SidebarInsetContent isSidebarInset={false}>
        <div>
          <h1>Activities</h1>
        </div>
      </SidebarInsetContent>
    </Suspense>
  );
};

export default ActivitiesPage;
