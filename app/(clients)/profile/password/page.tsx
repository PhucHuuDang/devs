import React, { Suspense } from "react";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import { PasswordContainer } from "@/components/url-segment/password/password-container";

const PasswordPage = () => {
  return (
    <Suspense>
      <SidebarInsetContent isSidebarInset={false}>
        <PasswordContainer />
      </SidebarInsetContent>
    </Suspense>
  );
};

export default PasswordPage;
