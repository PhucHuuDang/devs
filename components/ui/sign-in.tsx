"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { GoogleIcon } from "../icons/social-icon";
import {
  PasswordControlled,
  passwordSchema,
} from "../custom/form/fields/password-controlled";
import FormWrapper from "../custom/form/form-wrapper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputControlled } from "../custom/form/fields/input-controlled";
import { toast } from "sonner";
import { isEmpty } from "lodash";
import { SIGN_IN } from "@/app/graphql/mutaions/auth.mutations";
import { useMutation } from "@apollo/client/react";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { SignInEmailMutation } from "@/app/graphql/__generated__/graphql";

// --- TYPE DEFINITIONS ---

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface SignInPageProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSignIn?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
}

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
    {children}
  </div>
);

const TestimonialCard = ({
  testimonial,
  delay,
}: {
  testimonial: Testimonial;
  delay: string;
}) => (
  <div
    className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}
  >
    <Image
      src={testimonial.avatarSrc}
      width={40}
      height={40}
      className="h-10 w-10 object-cover rounded-2xl"
      alt="avatar"
    />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const sigInSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: passwordSchema,
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  });

export const SignInPage: React.FC<SignInPageProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">Welcome</span>
  ),
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
  // onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
}) => {
  const form = useForm<z.infer<typeof sigInSchema>>({
    resolver: zodResolver(sigInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signInMutation, { loading, client, error, called, data: signInData }] =
    useMutation(SIGN_IN);

  const onSubmit = async (data: z.infer<typeof sigInSchema>) => {
    console.log(data);

    if (isEmpty(data)) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const res = await signInMutation({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });

      const signInResponse = res.data as any;

      console.log({ signInResponse });

      if (signInResponse?.error) {
        console.log({ signInResponse });
        toast.error(`Failed to sign in: ${signInResponse.error}`);
      } else if (signInResponse?.token) {
        toast.success("Signed in successfully");
      } else {
        toast.error("Failed to sign in");
      }
    } catch (err: any) {
      // Lỗi network hoặc Apollo
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row font-geist w-[100dvw]">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              {title}
            </h1>
            <p className="animate-element animate-delay-200 text-muted-foreground">
              {description}
            </p>

            <FormWrapper form={form} className="space-y-5" onSubmit={onSubmit}>
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
                    onResetPassword?.();
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
                {/* Sign In */}
              </button>
            </FormWrapper>

            <div className="animate-element animate-delay-700 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">
                Or continue with
              </span>
            </div>

            <button
              onClick={onGoogleSignIn}
              className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              New to our platform?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onCreateAccount?.();
                }}
                className="text-violet-400 hover:underline transition-colors"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Right column: hero image + testimonials */}
      {heroImageSrc && (
        <section className="hidden md:block flex-1 relative p-4">
          <div
            className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          ></div>
          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
              <TestimonialCard
                testimonial={testimonials[0]}
                delay="animate-delay-1000"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-1200"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-1400"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
