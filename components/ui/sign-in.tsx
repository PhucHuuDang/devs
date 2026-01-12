"use client";

import React, { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useMutation, useQuery } from "@apollo/client/react";
import { AnimatePresence, motion } from "framer-motion";
import { GithubIcon } from "lucide-react";

import { SOCIAL_CONSTANTS } from "@/app/constants";
import { GitHubMutation } from "@/app/graphql/__generated__/graphql";
import { GET_SESSION, GITHUB } from "@/app/graphql/mutaions/auth.mutations";
import { SignInForm } from "@/components/_url-segment/auth/sign-in-form";
import { SignUpForm } from "@/components/_url-segment/auth/sign-up-form";

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
  onGoogleSignIn?: () => void;
}

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

const formMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20 },
};

export const SignInPage: React.FC<SignInPageProps> = ({
  title = (
    <span className="font-light text-foreground tracking-tighter">Welcome</span>
  ),
  description = "Access your account and continue your journey with us",
  heroImageSrc,
  testimonials = [],
}) => {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);

  const { data: sessionData } = useQuery(GET_SESSION, {
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },
  });

  const [
    githubMutation,
    {
      loading: githubLoading,
      client: githubClient,
      error: githubError,
      called: githubCalled,
      data: githubData,
    },
  ] = useMutation<GitHubMutation>(GITHUB);

  const handleToggleSignUp = useCallback(() => {
    setIsSignUp((prev) => !prev);
  }, [setIsSignUp]);

  useEffect(() => {
    if (githubData?.gitHub?.redirect && githubData.gitHub.url) {
      router.push(githubData.gitHub.url);
    }
  }, [githubData]);

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

            <div className="w-full flex items-center justify-end">
              <button
                className="text-sm text-violet-400 hover:underline transition-all duration-300 cursor-pointer"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div key="sign-up" {...formMotion}>
                  <SignUpForm toggleSignUp={handleToggleSignUp} />
                </motion.div>
              ) : (
                <motion.div key="sign-in" {...formMotion}>
                  <SignInForm toggleSignIn={handleToggleSignUp} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="animate-element animate-delay-700 relative flex items-center justify-center">
              <span className="w-full border-t border-border"></span>
              <span className="px-4 text-sm text-muted-foreground bg-background absolute">
                Or continue with
              </span>
            </div>

            <button
              onClick={() =>
                // githubMutation({
                //   context: {
                //     fetchOptions: {
                //       credentials: "include",
                //     },
                //   },
                // })
                (window.location.href = "http://localhost:3001/social/github")
              }
              className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-4 hover:bg-secondary transition-colors"
            >
              <GithubIcon />
              {SOCIAL_CONSTANTS.SIGN_IN_WITH_GITHUB}
            </button>

            <p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
              New to our platform?{" "}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="text-violet-400 hover:underline transition-colors"
              >
                {SOCIAL_CONSTANTS.CREATE_ACCOUNT}
              </Link>
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
