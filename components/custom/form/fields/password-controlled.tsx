import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createElement, useState } from "react";
import z from "zod";

type PasswordFieldProps = {
  label: string;
  name?: string;
  placeholder?: string;
  description?: string | React.ReactNode;
  disabled?: boolean;
};

export const passwordSchema = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters.",
  })
  .max(20, {
    message: "Password must be at most 20 characters.",
  })
  .regex(/^.{8,20}$/, {
    message: "Minimum 8 and maximum 20 characters.",
  })
  .regex(/(?=.*[A-Z])/, {
    message: "At least one uppercase character.",
  })
  .regex(/(?=.*[a-z])/, {
    message: "At least one lowercase character.",
  })
  .regex(/(?=.*\d)/, {
    message: "At least one digit.",
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message: "At least one special character.",
  });

export function PasswordControlled({
  name = "password",
  label,
  placeholder = "Enter password",
  description,
  disabled,
}: PasswordFieldProps) {
  const { control, getFieldState, formState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 ${
                  getFieldState(name).error && "text-destructive"
                }`}
                disabled={disabled || formState.isSubmitting}
              />
              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-6 w-6",
                })}
              </div>
            </div>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
