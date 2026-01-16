import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

interface EmptyMediaGroupProps {
  title?: string;
  description?: string;
  action: React.ReactNode | string;

  className?: string;
}
export const EmptyMediaGroup = ({
  title = "No Team Members",
  description = "Invite your team to collaborate on this project.",
  action = "Invite Members",

  className,
}: EmptyMediaGroupProps) => {
  return (
    <Empty className={cn("aspect-video h-full w-full ", className)}>
      <EmptyHeader>
        <EmptyMedia>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {typeof action === "string" ? (
          <Button size="sm" className=" flex items-center justify-center gap-1">
            <PlusIcon />
            {action}
          </Button>
        ) : (
          <div></div>
        )}
      </EmptyContent>
    </Empty>
  );
};
