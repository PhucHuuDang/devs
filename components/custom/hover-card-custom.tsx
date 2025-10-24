import { cn } from "@/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface HoverCardCustomProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  asChild?: boolean;

  openDelay?: number;
}

export const HoverCardCustom = ({
  children,
  trigger,
  className,
  asChild = true,
  openDelay = 300,
  ...props
}: HoverCardCustomProps &
  React.ComponentProps<typeof HoverCardPrimitive.Content>) => {
  return (
    <HoverCard openDelay={openDelay}>
      <HoverCardTrigger asChild={asChild} className="cursor-pointer">
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className={cn("w-fit", className)} {...props}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};
