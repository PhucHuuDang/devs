"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { passwordSchema } from "@/components/custom/form/fields/password-controlled";

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    password: passwordSchema,
    confirmNewPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const useChangePassword = () => {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const handleChangePassword = async (values: ChangePasswordFormValues) => {
    // Logic for changing password (e.g., mutation/API call)
    toast.success("Password change requested: " + JSON.stringify(values));
  };

  return {
    form,
    handleChangePassword,
  };
};
