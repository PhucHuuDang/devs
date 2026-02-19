import React from "react";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface CollapseCustomProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
> {
  children: React.ReactNode;
  trigger: React.ReactNode;
  classNameTrigger?: string;
  classNameContent?: string;
  asChild?: boolean;
}
export const CollapseCustom = ({
  children,
  classNameTrigger,
  trigger,
  classNameContent,
  asChild = true,
  ...props
}: CollapseCustomProps) => {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild={asChild} className={classNameTrigger}>
        {trigger}
      </CollapsibleTrigger>
      <CollapsibleContent className={classNameContent} {...props}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
