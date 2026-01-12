import { ReactNode } from "react";

import { IconForbid } from "@tabler/icons-react";
import { SearchIcon, LucideIcon } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/animate-ui/components/animate/tooltip";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

type AddonType = "icon" | "text" | "button";
type AddonPosition = "left" | "right";

interface AddonConfig {
  type: AddonType;
  position?: AddonPosition;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  text?: string;
  buttonText?: string;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
}

interface InputGroupTagControlledProps<T extends FieldValues> {
  name: Path<T>;
  label: string;

  disabled?: boolean;
  placeholder?: string;
  type?: string;
  onBlur?: () => void;
  description?: string;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;

  // Dynamic addon configuration
  leftAddon?: AddonConfig;
  rightAddon?: AddonConfig;

  // Alternative: single addon with position
  addon?: AddonConfig;

  // Custom onChange handler
  onChange?: (value: string) => void;
}

export const InputGroupTagControlled = <T extends FieldValues>({
  name,
  label,
  placeholder = "Enter text...",
  type = "text",
  disabled,
  onBlur,
  description,
  className,
  classNameInput,
  classNameLabel,
  leftAddon,
  rightAddon,
  addon,
  onChange,
}: InputGroupTagControlledProps<T>) => {
  const { control } = useFormContext();

  // Determine addons from props
  const resolvedLeftAddon =
    leftAddon || (addon?.position === "left" ? addon : undefined);
  const resolvedRightAddon =
    rightAddon ||
    (addon?.position === "right" || !addon?.position ? addon : undefined);

  const renderAddon = (addonConfig?: AddonConfig) => {
    if (!addonConfig) return null;

    const content = (() => {
      switch (addonConfig.type) {
        case "icon": {
          const Icon = addonConfig.icon || SearchIcon;
          return (
            <InputGroupAddon className={addonConfig.className}>
              <Icon className="h-4 w-4" />
            </InputGroupAddon>
          );
        }
        case "text": {
          return (
            <InputGroupAddon className={addonConfig.className}>
              <InputGroupText>{addonConfig.text}</InputGroupText>
            </InputGroupAddon>
          );
        }
        case "button": {
          return (
            <InputGroupButton
              onClick={addonConfig.onClick}
              className={addonConfig.className}
            >
              {addonConfig.buttonText || "Submit"}
            </InputGroupButton>
          );
        }
        default:
          return null;
      }
    })();

    if (addonConfig.tooltip && content) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>{addonConfig.tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return content;
  };

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState, formState }) => {
        const isDisabled = disabled || field.disabled || formState.isSubmitting;

        return (
          <FormItem className={cn("w-full", className)}>
            <FormLabel className={cn("text-sm font-medium", classNameLabel)}>
              {label}
            </FormLabel>
            <FormControl onBlur={onBlur}>
              <InputGroup>
                {renderAddon(resolvedLeftAddon)}
                <InputGroupInput
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  className={classNameInput}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.(e.target.value);
                  }}
                />
                {renderAddon(resolvedRightAddon)}
              </InputGroup>
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
