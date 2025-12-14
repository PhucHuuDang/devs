import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import React, { Suspense } from "react";

const MyCookingPage = () => {
  return (
    <Suspense>
      <SidebarInsetContent isSidebarInset={false}>
        <div>
          <h1>My Cooking</h1>
        </div>
      </SidebarInsetContent>
    </Suspense>
  );
};

export default MyCookingPage;
