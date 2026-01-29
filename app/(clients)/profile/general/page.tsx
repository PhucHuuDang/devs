import React, { Suspense } from "react";

import { PasswordContainer } from "@/components/url-segment/password/password-container";

const GeneralPage = () => {
  return (
    <Suspense>
      <div className=" w-full h-fit">
        <PasswordContainer />
      </div>
    </Suspense>
  );
};

export default GeneralPage;
