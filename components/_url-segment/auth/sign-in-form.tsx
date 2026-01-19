"use client";

import { memo } from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { SignInEmailMutation } from "@/app/graphql/__generated__/graphql";
import {
  GITHUB,
  SIGN_IN,
  SIGN_UP,
} from "@/app/graphql/mutaions/auth.mutations";
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

const sigInSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: passwordSchema,
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  });

export const SignInForm = memo<SignInFormProps>(
  ({ toggleSignIn }: SignInFormProps) => {
    const signInForm = useForm<z.infer<typeof sigInSchema>>({
      resolver: zodResolver(sigInSchema),
      defaultValues: {
        email: "danghuuphuc003@gmail.com",
        password: "12312344aA@",
        rememberMe: false,
      },
    });
    const [
      signInMutation,
      { loading, client, error, called, data: signInData, reset },
    ] = useMutation<SignInEmailMutation>(SIGN_IN);

    const router = useRouter();

    const onSignIn = async (data: z.infer<typeof sigInSchema>) => {
      if (isEmpty(data)) {
        toast.warning("Please fill in all fields");
        return;
      }

      try {
        const res: unknown = await signInMutation({
          variables: {
            input: {
              email: data.email,
              password: data.password,
              rememberMe: data.rememberMe,
            },
          },

          context: {
            fetchOptions: {
              credentials: "include",
            },
          },

          onCompleted: (data: SignInEmailMutation) => {
            const signInResponse = data.signInEmail;
            toast.success(
              `Welcome , ${signInResponse.user?.name?.toUpperCase()}!`,
            );
            router.push("/blogs");

            // console.log("Sign in response:", signInResponse.);
          },
          onError: (error: any) => {
            console.error("Sign in error:", error);
            toast.error(error.message);
          },
        });

        // const signInResponse = (res as any).data.signInEmail as any;

        // if (signInResponse?.error) {
        //   // console.log({ signInResponse });
        //   toast.error(`Failed to sign in: ${signInResponse.error}`);
        // } else if (signInResponse?.token) {
        //   toast.success("Signed in successfully");

        //   router.push("/blogs");
        // } else {
        //   toast.error("Failed to sign in");
        // }
      } catch (err: any) {
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
  },
);

SignInForm.displayName = "SignInForm";
