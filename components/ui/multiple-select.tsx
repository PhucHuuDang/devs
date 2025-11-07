"use client";

import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export type TTag = {
  key: string;
  name: string;
};

type MultipleSelectProps = {
  tags: TTag[];
  customTag?: (item: TTag) => ReactNode | string;
  onChange?: (value: TTag[]) => void;
  defaultValue?: TTag[];
  className?: string;

  disabled?: boolean;
};

export const MultipleSelect = ({
  tags,
  customTag,
  onChange,
  defaultValue,
  disabled,
  className,
}: MultipleSelectProps) => {
  const [selected, setSelected] = useState<TTag[]>(defaultValue ?? []);
  const containerRef = useRef<HTMLDivElement>(null);

  const onValueChange = (value: TTag[]) => {
    onChange?.(value);
  };

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollBy({
        left: containerRef.current?.scrollWidth,
        behavior: "smooth",
      });
    }
    onValueChange(selected);
  }, [selected]);

  const onSelect = (item: TTag) => {
    setSelected((prev) => [...prev, item]);
  };

  const onDeselect = (item: TTag) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  };

  return (
    <AnimatePresence mode={"popLayout"}>
      <div className={" w-full 500 space-y-2"}>
        <motion.div
          layout
          ref={containerRef}
          className={cn(
            `selected no-scrollbar flex h-20 w-full items-center overflow-x-auto scroll-smooth rounded-2xl bg-white border border-solid border-primary/20 dark:bg-primary-foreground text-accent p-5 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`,
            className
          )}
        >
          <motion.div
            layout
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center p-2 gap-2  flex-wrap"
          >
            {selected?.map((item) => (
              <Tag
                name={item?.key}
                key={item?.key}
                className={
                  "dark:bg-white bg-slate-200/50 shadow font-semibold text-primary dark:text-accent"
                }
              >
                <div className="flex items-center gap-2">
                  <motion.span layout className={"text-nowrap"}>
                    {item?.name}
                  </motion.span>
                  <button
                    className={
                      "hover:text-rose-500 transition duration-300 cursor-pointer"
                    }
                    onClick={() => onDeselect(item)}
                  >
                    <X size={14} />
                  </button>
                </div>
              </Tag>
            ))}
          </motion.div>
        </motion.div>
        {tags?.length > selected?.length && (
          <div className="flex w-full flex-wrap gap-2 rounded-2xl border border-solid bg-white dark:bg-primary-foreground  border-primary/20  p-5 font-semibold text-primary dark:text-accent">
            {tags
              ?.filter((item) => !selected?.some((i) => i.key === item.key))
              .map((item) => (
                <Tag
                  name={item?.key}
                  onClick={() => onSelect(item)}
                  key={item?.key}
                  className="font-semibold bg-slate-200/50 dark:text-white"
                >
                  {customTag ? (
                    customTag(item)
                  ) : (
                    <motion.span layout className={"text-nowrap"}>
                      {item?.name}
                    </motion.span>
                  )}
                </Tag>
              ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

type TagProps = PropsWithChildren &
  Pick<HTMLAttributes<HTMLDivElement>, "onClick"> & {
    name?: string;
    className?: string;
  };

export const Tag = ({ children, className, name, onClick }: TagProps) => {
  const motionProps = name ? { layoutId: name } : {};

  return (
    <motion.div
      layout
      // layoutId={name}
      {...motionProps}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer rounded-md bg-gray-200 px-2 py-1 text-sm card-shine-effect hover:shadow-md  ${className}`}
    >
      {children}
    </motion.div>
  );
};
