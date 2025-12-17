"use client";

import {
  PasswordControlled,
  passwordSchema,
} from "@/components/custom/form/fields/password-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import { GoogleIcon } from "@/components/icons/social-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FacebookIcon,
  GithubIcon,
  LucideIcon,
  RectangleEllipsisIcon,
  ShieldUser,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface AuthenticateItemProps {
  title: string;
  labelButton: string;
  description: string;

  icon: React.ReactNode | LucideIcon;

  onClick?: () => void;

  children?: React.ReactNode;
}

const AuthenticateItem = ({
  title,
  description,
  icon,
  labelButton,
  onClick,
  children,
}: AuthenticateItemProps) => {
  const Icon =
    typeof icon === "function" ? icon : (icon as unknown as LucideIcon);

  return (
    <Item variant="outline">
      <ItemMedia>{typeof icon === "function" ? <Icon /> : icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
        {children}
      </ItemContent>

      <ItemActions>
        <Button variant="outline" onClick={onClick}>
          {labelButton}
        </Button>
      </ItemActions>
    </Item>
  );
};

const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    password: passwordSchema,
    confirmNewPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const PasswordContainer = () => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmNewPassword: "",
    },
    // shouldFocusError: true,
    mode: "onChange",
  });

  const onChangePassword = async (
    values: z.infer<typeof changePasswordSchema>
  ) => {
    toast.success(JSON.stringify(values));
  };

  return (
    <div className="px-4 space-y-2">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">Sign in methods</h1>

        <ItemGroup>
          <AuthenticateItem
            title="Google"
            description="Sign in with Google"
            icon={<GoogleIcon />}
            labelButton="Sign in with Google"
          />

          <AuthenticateItem
            title={
              isChangePassword
                ? "Cancel change password"
                : "Change your password"
            }
            description={
              isChangePassword
                ? "Let's change your password"
                : "Let's secure your account"
            }
            icon={<RectangleEllipsisIcon />}
            labelButton={isChangePassword ? "Cancel" : "Change password"}
            onClick={() => {
              setIsChangePassword((prev) => !prev);
              form.reset();
            }}
          >
            <AnimatePresence>
              {isChangePassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <FormWrapper
                    form={form}
                    onSubmit={onChangePassword}
                    className="flex flex-col gap-2 space-y-2"
                  >
                    <PasswordControlled
                      name="oldPassword"
                      label="Old password"
                    />
                    <PasswordControlled name="password" label="New password" />
                    <PasswordControlled
                      name="confirmNewPassword"
                      label="Confirm new password"
                    />

                    <div className="cursor-pointer">
                      <span className="text-muted-foreground hover:underline hover:text-sky-500 transition-all duration-300">
                        Forgot password?
                      </span>
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      className="w-40 focus:ring-1 focus:ring-offset-1 focus:outline-none focus:ring-ring/50"
                    >
                      Save
                    </Button>
                  </FormWrapper>
                </motion.div>
              )}
            </AnimatePresence>
          </AuthenticateItem>

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
        </ItemGroup>
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
