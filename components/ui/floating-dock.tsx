"use client";

import { useRef, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

import { SheetTriggerButton } from "@/components/common/settings-sheet";
import { useGetSettings } from "@/stores/use-get-settings";

// import { SettingsSheet } from "../common/settings-sheet";

const SettingsSheet = dynamic(
  () => import("../common/settings-sheet").then((mod) => mod.SettingsSheet),
  {
    ssr: false,
  },
);

export interface IconContainerProps {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;

  isSettings?: boolean;
  onClick?: () => void;
}

const links: Omit<IconContainerProps, "mouseX">[] = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Products",
    icon: (
      <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Components",
    icon: (
      <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Aceternity UI",
    icon: (
      <Image
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        className="h-full w-full"
        alt="Aceternity Logo"
      />
    ),
    href: "#",
  },
  {
    title: "Changelog",
    icon: (
      <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Twitter",
    icon: (
      <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "ComponentsTest",
    icon: (
      <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Settings",
    icon: (
      <SheetTriggerButton
        isHover={true}
        classNameTrigger="h-full w-full text-neutral-500 dark:text-neutral-300"
      />
    ),
    href: "#",
  },
];

export const FloatingDock = ({
  desktopClassName,
  mobileClassName,
}: {
  items?: Omit<IconContainerProps, "mouseX">[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={links} className={desktopClassName} />
      <FloatingDockMobile items={links} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  const { isDockOpen, isNavbarOpen } = useGetSettings();

  const visibleItems = isNavbarOpen
    ? items.filter((i) => i.title !== "Settings")
    : items;

  return (
    <AnimatePresence>
      {isDockOpen && (
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "mx-auto hidden h-16 items-end gap-2 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
            className,
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.3,
            delay: 0.3,
            // type: "spring",
            stiffness: 260,
            damping: 10,
          }}
        >
          <>
            {items.map((item) => (
              <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}

            {/* <SettingsSheet /> */}
          </>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function IconContainer({
  mouseX,
  title,
  icon,
  href,
  isSettings = false,
  onClick,
}: IconContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const { defaultSize, hoveredSize } = useGetSettings();

  const widthTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, hoveredSize, 40],
  );
  const heightTransform = useTransform(
    distance,
    [-150, 0, 150],
    [40, hoveredSize, 40],
  );

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [defaultSize, 60, defaultSize],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [defaultSize, 60, defaultSize],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return !isSettings ? (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: widthIcon,
            height: heightIcon,
          }}
          className="flex items-center justify-center transition duration-300"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  ) : (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full cursor-pointer"
      onClick={onClick}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{
          width: widthIcon,
          height: heightIcon,
        }}
        className="flex items-center justify-center transition duration-300"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
