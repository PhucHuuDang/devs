import {
  AlertTriangleIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  NotepadTextDashedIcon,
  RocketIcon,
  ShareIcon,
  TrashIcon,
  UserRoundXIcon,
  VolumeOffIcon,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

import { generateSlug } from "@/lib/generate";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TTag } from "@/components/ui/multiple-select";
import { cardStyle } from "@/styles/common-style";

import { BlogCard } from "./blog-card";
import { CreateBlogFormValues, formSchema } from "./create-blog";

interface PreviewControlProps {
  form: UseFormReturn<CreateBlogFormValues>;
  onSubmit: () => void;
  title: string;
  description: string;
}
export const PreviewControl = ({
  form,
  title,
  description,
  onSubmit,
}: PreviewControlProps) => {
  return (
    <div className="col-span-1 relative ">
      <Card className={`${cardStyle} h-fit sticky p-4 top-5 w-full`}>
        <CardHeader className=" ">
          <ButtonGroup className="h-full w-full">
            <Button variant="outline" size="default">
              <NotepadTextDashedIcon className="size-6 text-primary" />
              <span>Draft</span>
            </Button>

            <Button
              variant="outline"
              type="submit"
              size="default"
              className="col-span-1"
              onClick={onSubmit}
            >
              <RocketIcon className="size-6 text-primary" />
              <span>Publish</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="[--radius:1rem]">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <VolumeOffIcon />
                    Mute Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckIcon />
                    Mark as Read
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertTriangleIcon />
                    Report Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserRoundXIcon />
                    Block User
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShareIcon />
                    Share Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CopyIcon />
                    Copy Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <TrashIcon />
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </CardHeader>
        <div className="my-2 p-1 pl-4 bg-slate-100 rounded-xl mb-5">
          <span className="text-sm text-slate-800 font-medium">
            https://devs.com/blogs/{generateSlug(title)}
          </span>
        </div>

        <BlogCard
          title={title || "Lets make impressive title!"}
          description={
            description ||
            `Lets make the description interesting and catchy - This will be the
first thing people see when they land on your blog post`
          }
          mainImage={form.watch("mainImage") || "/image.jpg"}
          views={100}
          tags={
            form.watch("tags")?.map((tag: TTag) => tag.name) || [
              "Web Development",
              "JavaScript",
              "React",
            ]
          }
          createdAt={new Date()}
          updatedAt={new Date()}
          author={[
            {
              id: "1",
              name: "John Doe",
              designation: "Software Engineer",
              image: "/image.jpg",
            },
          ]}
          isBorderDefault
        />
      </Card>
    </div>
  );
};
