"use client";

import { memo } from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import {
  SignInEmailMutation,
  SignInEmailMutationVariables,
  useSignInEmailMutation,
} from "@/app/graphql/__generated__/generated";
import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import {
  PasswordControlled,
  passwordSchema,
} from "@/components/custom/form/fields/password-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import { Spinner } from "@/components/ui/spinner";

interface SignInFormProps {
  toggleSignIn: () => void;
}

// Unify with SignUpForm conventions: use codegen hook, blank defaults, optional rememberMe defaulted false
const signInSchema = z
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

export const SignInForm = memo<SignInFormProps>(({ toggleSignIn }) => {
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Use graphql-codegen generated hook for type safety and simplicity
  const [signInMutation, { loading, error, data: signInData }] =
    useSignInEmailMutation();

  const router = useRouter();

  const onSignIn = async (formData: z.infer<typeof signInSchema>) => {
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

      if (
        signInResponse?.token != null &&
        signInResponse?.user != null &&
        !error
      ) {
        toast.success(`Welcome, ${signInResponse.user.name?.toUpperCase()}!`);
        router.push("/blogs");
        signInForm.reset();
      } else if (error && error.message) {
        // GraphQL or network error
        console.warn("Sign in error:", error.message);
        toast.error(error.message);
      } else if (error) {
        // fallback generic error
        console.warn("Sign in error:", error.message);
        toast.error(error.message);
      } else {
        // Unexpected case: neither user+token nor error
        toast.error("Failed to sign in");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <FormWrapper form={signInForm} className="space-y-5" onSubmit={onSignIn}>
      <InputControlled
        label="Email"
        placeholder="@example.com"
        name="email"
        type="email"
        classNameInput="h-12"
      />

      <div className="animate-element animate-delay-400">
        <PasswordControlled
          name="password"
          label="Password"
          placeholder="Enter your password"
          classNameInput="h-12"
        />
      </div>

      <div className="animate-element animate-delay-500 flex items-center justify-between text-sm">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            className="custom-checkbox"
            checked={signInForm.watch("rememberMe")}
            onChange={(e) => {
              signInForm.setValue("rememberMe", e.target.checked);
            }}
          />
          <span className="text-foreground/90">Keep me signed in</span>
        </label>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="hover:underline text-violet-400 transition-colors"
        >
          Reset password
        </a>
      </div>

      <button
        type="submit"
        className="animate-element animate-delay-600 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Sign In"}
      </button>
    </FormWrapper>
  );
});

SignInForm.displayName = "SignInForm";
