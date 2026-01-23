import React, { Suspense } from "react";

import { PasswordContainer } from "@/components/_url-segment/password/password-container";

const GeneralPage = () => {
  return (
    <Suspense>
      <PasswordContainer />
    </Suspense>
  );
};

export default GeneralPage;
