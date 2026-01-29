"use client";

import React, { Children, isValidElement } from "react";

import { motion, Variants, useInView } from "framer-motion";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  triggerOnView?: boolean;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  duration = 0.4,
  triggerOnView = true,
  once = true,
}: StaggerContainerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const customContainerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const customItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const shouldAnimate = triggerOnView ? isInView : true;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "show" : "hidden"}
      variants={customContainerVariants}
      className={className}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return <motion.div variants={customItemVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
}

// Fade stagger variant
interface FadeStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const fadeItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export function FadeStagger({
  children,
  className,
  staggerDelay = 0.05,
}: FadeStaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return <motion.div variants={fadeItemVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
}

// Scale stagger variant
const scaleItemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function ScaleStagger({
  children,
  className,
  staggerDelay = 0.08,
}: FadeStaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return <motion.div variants={scaleItemVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
}

// Motion wrapper for individual items
interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MotionItem({
  children,
  className,
  delay = 0,
}: MotionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
