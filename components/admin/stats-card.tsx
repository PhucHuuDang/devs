"use client";

import React from "react";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  title: string;
  value: number;
  previousValue?: number;
  icon: LucideIcon;
  format?: "number" | "currency" | "percent";
  prefix?: string;
  suffix?: string;
  isLoading?: boolean;
  className?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  previousValue,
  icon: Icon,
  format = "number",
  prefix,
  suffix,
  isLoading = false,
  className,
  delay = 0,
}: StatsCardProps) {
  const percentChange = previousValue
    ? ((value - previousValue) / previousValue) * 100
    : 0;
  const isPositive = percentChange >= 0;

  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return val;
      case "percent":
        return val;
      default:
        return val;
    }
  };

  if (isLoading) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </CardHeader>
        <CardContent>
          <Skeleton className="mb-2 h-8 w-32" />
          <Skeleton className="h-4 w-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
          className,
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-1 text-2xl font-bold">
            {prefix && <span className="text-muted-foreground">{prefix}</span>}
            <NumberFlow
              value={formatValue(value)}
              format={
                format === "currency"
                  ? { style: "currency", currency: "USD" }
                  : format === "percent"
                    ? { style: "percent", maximumFractionDigits: 1 }
                    : { notation: value > 9999 ? "compact" : "standard" }
              }
              transformTiming={{ duration: 700, easing: "ease-out" }}
            />
            {suffix && <span className="text-muted-foreground">{suffix}</span>}
          </div>
          {previousValue !== undefined && (
            <div className="mt-1 flex items-center gap-1 text-xs">
              <span
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  isPositive ? "text-green-500" : "text-red-500",
                )}
              >
                {isPositive ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(percentChange).toFixed(1)}%
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}
