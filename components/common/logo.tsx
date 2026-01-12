import Link from "next/link";

import { Code } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoProps {
  classNameIcon?: string;
  classNameText?: string;
  className?: string;
}
export const Logo = ({
  classNameIcon,
  classNameText,
  className,
}: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex flex-col items-center group p-1 rounded-md transition-all duration-300",
        className,
      )}
    >
      <Code
        className={cn(
          "size-6 group-hover:scale-115 dark:text-slate-100 group-hover:text-slate-500 group-hover:rotate-12 dark:group-hover:text-slate-400 transition-all duration-300",
          classNameIcon,
        )}
      />
      <span
        className={cn(
          "text-sm font-semibold text-slate-700 dark:text-slate-100  group-hover:text-slate-500 transition-all duration-300",
          classNameText,
        )}
      >
        DEVS
      </span>
    </Link>
  );
};
