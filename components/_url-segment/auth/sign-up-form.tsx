"use client";

import {
  PasswordControlled,
  passwordSchema,
} from "@/components/custom/form/fields/password-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { toast } from "sonner";
import { isEmpty } from "lodash";
import {
  GITHUB,
  SIGN_IN,
  SIGN_UP,
} from "@/app/graphql/mutaions/auth.mutations";
import { useMutation } from "@apollo/client/react";
import { Spinner } from "@/components/ui/spinner";
import { SignUpEmailMutation } from "@/app/graphql/__generated__/graphql";
import { memo } from "react";

interface SignUpFormProps {
  toggleSignUp: () => void;
}

const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    name: z.string().min(1, {
      message: "Name is too short (min 1 character)",
    }),
    password: passwordSchema,
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  });
export const SignUpForm = memo<SignUpFormProps>(({ toggleSignUp }) => {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });
  const [
    signUpMutation,
    {
      loading: signUpLoading,
      client: signUpClient,
      error: signUpError,
      called: signUpCalled,
      data: signUpData,
    },
  ] = useMutation<SignUpEmailMutation>(SIGN_UP);

  const onSignUp = async (data: z.infer<typeof signUpSchema>) => {
    if (isEmpty(data)) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res: unknown = await signUpMutation({
        variables: {
          input: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },

        context: {
          fetchOptions: {
            credentials: "include",
          },
        },
      });

      // console.log({ res });

      const signUpResponse = (res as any).data.signUpEmail as any;

      // console.log({ signUpResponse });

      if (signUpResponse?.error) {
        // console.log({ signUpResponse });
        toast.error(`Failed to sign in: ${signUpResponse.error}`);
      } else if (signUpResponse?.token) {
        // await setCookies(signInResponse.token, "test-refresh-token");
        toast.success("Signed in successfully");
        toggleSignUp();
      } else {
        toast.error("Failed to sign in");
      }
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <FormWrapper form={signUpForm} className="space-y-5" onSubmit={onSignUp}>
      <InputControlled
        label="Name"
        placeholder="John Doe"
        name="name"
        type="text"
        classNameInput="h-12"
      />

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
        disabled={signUpLoading}
      >
        {signUpLoading ? <Spinner /> : "Sign Up"}
      </button>
    </FormWrapper>
  );
});

SignUpForm.displayName = "SignUpForm";
