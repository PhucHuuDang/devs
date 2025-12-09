"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NetworkErrorPageProps {
  title?: string;
  description?: string;
  errorCode?: string;
}

export function ConnectionIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" />
      <path d="M5 13l2 2a7.074 7.074 0 0110 0l2-2c-3.87-3.87-10.13-3.87-14 0z" />
      <path d="M9 17l3 3 3-3a4.243 4.243 0 00-6 0z" />
      <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" />
    </svg>
  );
}

export function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function NetworkErrorPage({
  title = "Unable to connect",
  description = "We couldn't reach our servers. Please check your internet connection and try again.",
  errorCode = "NETWORK_CONNECTION_FAILED",
}: NetworkErrorPageProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      window.location.reload();
    }, 1500);
  };

  return (
    <main className=" aspect-video h-full w-full flex items-center justify-center px-6 ">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ConnectionIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
              <span className="text-xs text-muted-foreground">!</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-3 text-balance">
          {title}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8 text-balance">
          {description}
        </p>

        {/* Action */}
        <Button
          onClick={handleRetry}
          disabled={isRetrying}
          className="min-w-[140px] gap-2"
          size="lg"
        >
          <RefreshIcon
            className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`}
          />
          {isRetrying ? "Connecting..." : "Try again"}
        </Button>

        {/* Footer hint */}
        <p className="mt-12 text-sm text-muted-foreground/70">
          Error code: {errorCode}
        </p>
      </div>
    </main>
  );
}
