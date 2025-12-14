import { PasswordContainer } from "@/components/_url-segment/password/password-container";
import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import React, { Suspense } from "react";

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
