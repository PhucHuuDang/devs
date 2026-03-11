"use client";

import { useAnimation } from "framer-motion";
import { LucideIcon, RotateCcw } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export interface AuthenticateItemProps {
  title: string;
  labelButton: string;
  description: string;
  icon: React.ReactNode | LucideIcon;
  onClick?: () => void;
  onSecondaryAction?: () => void;
  children?: React.ReactNode;
  classNameDescription?: string;
  isOpen?: boolean;
  hideLabelButtonOnOpen?: boolean;
}

export const AuthenticateItem = ({
  title,
  description,
  icon,
  labelButton,
  onClick,
  onSecondaryAction,
  children,
  classNameDescription,
  isOpen,
  hideLabelButtonOnOpen,
}: AuthenticateItemProps) => {
  const Icon =
    typeof icon === "function" ? icon : (icon as unknown as LucideIcon);
  const controls = useAnimation();

  const handleSecondaryClick = async () => {
    await controls.start({
      rotate: 360,
      transition: { duration: 0.6 },
    });
    controls.set({ rotate: 0 });
    onSecondaryAction?.();
  };

  return (
    <Item variant="outline">
      <ItemMedia>{typeof icon === "function" ? <Icon /> : icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>
          <div className="flex items-center gap-2">
            <span>{title}</span>
            {onSecondaryAction && (
              <motion.div
                animate={controls}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "cursor-pointer transition-colors text-muted-foreground hover:text-primary",
                  isOpen && "text-primary",
                )}
                onClick={handleSecondaryClick}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </div>
        </ItemTitle>
        <ItemDescription className={classNameDescription}>
          {description}
        </ItemDescription>
        {children}
      </ItemContent>

      {(!hideLabelButtonOnOpen || !isOpen) && (
        <ItemActions>
          <Button variant="outline" onClick={onClick}>
            {labelButton}
          </Button>
        </ItemActions>
      )}
    </Item>
  );
};
