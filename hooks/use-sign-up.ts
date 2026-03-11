"use client";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import {
  SignUpEmailMutation,
  SignUpEmailMutationVariables,
  useSignUpEmailMutation,
} from "@/app/graphql/__generated__/generated";
import { passwordSchema } from "@/components/custom/form/fields/password-controlled";

export const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    name: z.string().min(1, {
      message: "Name is too short (min 1 character)",
    }),
    password: passwordSchema,
    rememberMe: z.boolean().default(false).optional(),
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

interface UseSignUpProps {
  toggleSignUp: () => void;
}

export const useSignUp = ({ toggleSignUp }: UseSignUpProps) => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rememberMe: false,
    },
  });

  const [signUpMutation, { loading, client }] = useSignUpEmailMutation();

  const handleSignUp = async (formData: SignUpFormValues) => {
    if (isEmpty(formData)) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const { data, error } = await signUpMutation({
        variables: {
          input: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe,
          },
        },
        context: {
          fetchOptions: {
            credentials: "include",
          },
        },
      });

      const signUpResponse = data?.signUpEmail;

      if (signUpResponse?.token && signUpResponse?.user && !error) {
        toast.success(
          `Thanks for your registration, ${signUpResponse.user.name?.toUpperCase()}!`,
        );
        await client.resetStore();
        toggleSignUp();
        form.reset();
      } else if (error) {
        console.warn("Sign up error:", error.message);
        toast.error(error.message);
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return {
    form,
    loading,
    handleSignUp,
  };
};
