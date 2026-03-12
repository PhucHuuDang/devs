"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useSignInEmailMutation } from "@/app/graphql/__generated__/generated";
import { setAuthCookies } from "@/app/utils/cookies";
import { passwordSchema } from "@/components/custom/form/fields/password-controlled";

export const signInSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: passwordSchema,
    rememberMe: z.boolean().default(false).optional(),
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  });

export type SignInFormValues = z.infer<typeof signInSchema>;

interface UseSignInProps {
  toggleSignIn: () => void;
}

export const useSignIn = ({ toggleSignIn }: UseSignInProps) => {
  const router = useRouter();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [signInMutation, { loading, client }] = useSignInEmailMutation();

  const handleSignIn = async (formData: SignInFormValues) => {
    if (isEmpty(formData)) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const { data, error } = await signInMutation({
        variables: {
          input: {
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

      const signInResponse = data?.signInEmail;

      if (signInResponse?.token && signInResponse?.user && !error) {
        toast.success(`Welcome, ${signInResponse.user.name?.toUpperCase()}!`);

        // Set cookies locally for the frontend domain so server components can see them
        await setAuthCookies(
          signInResponse.token, // Use same token for access if separate not provided
          signInResponse.token, // Session token
          "", // Refresh token (placeholder)
        );

        await client.resetStore();
        router.push("/blogs");
        form.reset();
      } else if (error) {
        console.warn("Sign in error:", error.message);
        toast.error(error.message);
      } else {
        toast.error("Failed to sign in");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return {
    form,
    loading,
    handleSignIn,
  };
};
