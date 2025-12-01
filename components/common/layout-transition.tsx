"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export const LayoutTransition = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const lastPageRef = useRef<HTMLCollection | null>(null);
  const currentPageRef = useRef<HTMLDivElement>(null);
  const exitAnimationDivRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!currentPageRef.current) return;
    if (!lastPageRef.current)
      lastPageRef.current = currentPageRef.current.children;

    exitAnimationDivRef.current?.appendChild(
      lastPageRef.current![0].cloneNode(true)
    );
    lastPageRef.current = currentPageRef.current.children;
  }, [pathname]);

  return (
    <AnimatePresence initial={false}>
      <div>
        <motion.div
          key={pathname + "exit-animation"}
          style={{
            position: "absolute",
          }}
          initial={{ x: 0 }}
          animate={{
            x: "-100%",
            opacity: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 10,
            duration: 0.2,
          }}
        >
          <div ref={exitAnimationDivRef} />
        </motion.div>

        <motion.div
          key={pathname}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 10,
            duration: 0.2,
          }}
        >
          <div ref={currentPageRef}>{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
