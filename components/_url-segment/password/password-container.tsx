"use client";

import { GoogleIcon } from "@/components/icons/social-icon";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  GithubIcon,
  LucideIcon,
  RectangleEllipsisIcon,
  ShieldUser,
} from "lucide-react";

interface AuthenticateItemProps {
  title: string;
  labelButton: string;
  description: string;

  icon: React.ReactNode | LucideIcon;
}

const AuthenticateItem = ({
  title,
  description,
  icon,
  labelButton,
}: AuthenticateItemProps) => {
  const Icon =
    typeof icon === "function" ? icon : (icon as unknown as LucideIcon);

  return (
    <Item variant="outline">
      <ItemMedia>{typeof icon === "function" ? <Icon /> : icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>

      <ItemActions>
        <Button variant="outline">{labelButton}</Button>
      </ItemActions>
    </Item>
  );
};

export const PasswordContainer = () => {
  return (
    <div className="px-4 space-y-2">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">Sign in methods</h1>

        <AuthenticateItem
          title="Google"
          description="Sign in with Google"
          icon={<GoogleIcon />}
          labelButton="Sign in with Google"
        />

        <AuthenticateItem
          title="Change Password"
          description="Change your password"
          icon={<RectangleEllipsisIcon />}
          labelButton="Change password"
        />

        <AuthenticateItem
          title="GitHub"
          description="Sign in with GitHub"
          icon={<GithubIcon />}
          labelButton="Sign in with GitHub"
        />

        <AuthenticateItem
          title="Facebook"
          description="Sign in with Facebook"
          icon={<FacebookIcon />}
          labelButton="Sign in with Facebook"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">Two-factor authentication</h1>
        <Separator className="my-4 h-[3px]" />
        <AuthenticateItem
          title="Two-factor authentication"
          description="Lets you sign in with your email and password, or with a third-party authentication provider."
          icon={<ShieldUser />}
          labelButton="Enable two-factor authentication"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold">Change password</h1>
        <Separator className="my-4 h-[3px]" />
      </div>
    </div>
  );
};
