import { PasswordContainer } from "@/components/_url-segment/password/password-container";
import React, { Suspense } from "react";

const GeneralPage = () => {
  return (
    <Suspense>
      <PasswordContainer />
    </Suspense>
  );
};

export default GeneralPage;
