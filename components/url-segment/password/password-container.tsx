"use client";

import { useState } from "react";

import {
  FacebookIcon,
  GithubIcon,
  RectangleEllipsisIcon,
  ShieldUser,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { PasswordControlled } from "@/components/custom/form/fields/password-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { useChangePassword } from "@/hooks/use-change-password";
import { GoogleIcon } from "@/icons/social-icon";

import { AuthenticateItem } from "./authenticate-item";

const AUTH_METHODS = [
  {
    title: "Google",
    description: "Sign in with Google",
    icon: <GoogleIcon />,
    labelButton: "Sign in with Google",
  },
  {
    title: "GitHub",
    description: "Sign in with GitHub",
    icon: <GithubIcon />,
    labelButton: "Sign in with GitHub",
  },
  {
    title: "Facebook",
    description: "Sign in with Facebook",
    icon: <FacebookIcon />,
    labelButton: "Sign in with Facebook",
  },
];

export const PasswordContainer = () => {
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const { form, handleChangePassword } = useChangePassword();

  const togglePasswordChange = () => {
    setIsChangingPassword((prev) => !prev);
    form.reset();
  };

  return (
    <div className="px-4 space-y-6">
      <section className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Sign in methods</h1>

        <ItemGroup>
          {AUTH_METHODS.map((method) => (
            <AuthenticateItem key={method.title} {...method} />
          ))}

          <AuthenticateItem
            title={
              isChangingPassword ? "Changing password" : "Change your password"
            }
            description={
              isChangingPassword
                ? "Update your security settings"
                : "Let's secure your account"
            }
            icon={<RectangleEllipsisIcon />}
            isOpen={isChangingPassword}
            labelButton="Change password"
            onClick={togglePasswordChange}
            onSecondaryAction={() => form.reset()}
            hideLabelButtonOnOpen
            classNameDescription="mb-2"
          >
            <AnimatePresence>
              {isChangingPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <FormWrapper
                    form={form}
                    onSubmit={handleChangePassword}
                    className="flex flex-col gap-6 py-6"
                  >
                    <div className="space-y-4">
                      <PasswordControlled
                        name="oldPassword"
                        label="Old password"
                      />
                      <PasswordControlled
                        name="password"
                        label="New password"
                      />
                      <PasswordControlled
                        name="confirmNewPassword"
                        label="Confirm new password"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="cursor-pointer">
                        <span className="text-sm text-muted-foreground hover:underline hover:text-sky-500 transition-all duration-300">
                          Forgot password?
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          type="submit"
                          className="w-32 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={togglePasswordChange}
                          className="w-32"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </FormWrapper>
                </motion.div>
              )}
            </AnimatePresence>
          </AuthenticateItem>
        </ItemGroup>
      </section>

      <section>
        <h1 className="text-2xl font-bold">Two-factor authentication</h1>
        <Separator className="my-4 h-[3px]" />
        <AuthenticateItem
          title="Two-factor authentication"
          description="Lets you sign in with your email and password, or with a third-party authentication provider."
          icon={<ShieldUser />}
          labelButton="Enable two-factor authentication"
        />
      </section>
    </div>
  );
};
