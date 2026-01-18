"use client";

import { memo } from "react";

import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { SignUpEmailMutation } from "@/app/graphql/__generated__/graphql";
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

    rememberMe: z.boolean().default(false).optional(),
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
      rememberMe: false,
    },
  });
  const [
    signUpMutation,
    { loading, client, error, called, data: signUpData, reset },
  ] = useMutation<SignUpEmailMutation>(SIGN_UP);

  // console.log({signUpData});
  // console.log({error});
  // console.log({called});
  // console.log({loading});

  const onSignUp = async (data: z.infer<typeof signUpSchema>) => {
    if (isEmpty(data)) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res = await signUpMutation({
        variables: {
          input: {
            name: data.name,
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
      });

      console.log("Sign up response:", res);

      // Type assertion needed until backend schema is updated and types are regenerated
      const signUpResponse = (res.data as any)?.signUpEmail;

      if (
        signUpResponse?.token != null &&
        signUpResponse?.user != null &&
        !error
      ) {
        toast.success(
          `Thanks for your registration, ${signUpResponse.user.name?.toUpperCase()}!`,
        );
        toggleSignUp();
        signUpForm.reset();
      } else if (error) {
        console.warn("sign up error: ", error.message);
        toast.error(error.message);
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
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
            checked={signUpForm.watch("rememberMe")}
            onChange={(e) => {
              signUpForm.setValue("rememberMe", e.target.checked);
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
        {loading ? <Spinner /> : "Sign Up"}
      </button>
    </FormWrapper>
  );
});

SignUpForm.displayName = "SignUpForm";
