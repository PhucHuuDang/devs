import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

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
  classNameTrigger?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const HoverCardCustom = ({
  children,
  trigger,
  className,
  asChild = true,
  openDelay = 300,
  classNameTrigger = "cursor-pointer p-0",
  open,
  onOpenChange,
  ...props
}: HoverCardCustomProps &
  React.ComponentProps<typeof HoverCardPrimitive.Content>) => {
  return (
    <HoverCard openDelay={openDelay} open={open} onOpenChange={onOpenChange}>
      <HoverCardTrigger asChild={asChild} className={classNameTrigger}>
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent className={cn("w-fit", className)} {...props}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};
