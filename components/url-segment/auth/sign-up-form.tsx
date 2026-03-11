"use client";

import { memo } from "react";

import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { PasswordControlled } from "@/components/custom/form/fields/password-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import { Spinner } from "@/components/ui/spinner";
import { useSignUp } from "@/hooks/use-sign-up";

interface SignUpFormProps {
  toggleSignUp: () => void;
}

export const SignUpForm = memo<SignUpFormProps>(({ toggleSignUp }) => {
  const { form, loading, handleSignUp } = useSignUp({ toggleSignUp });

  return (
    <FormWrapper form={form} className="space-y-5" onSubmit={handleSignUp}>
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
            checked={form.watch("rememberMe")}
            onChange={(e) => {
              form.setValue("rememberMe", e.target.checked);
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
