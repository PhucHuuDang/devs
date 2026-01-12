import { IconForbid } from "@tabler/icons-react";
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

interface InputControlledProps<T extends FieldValues> {
  name: Path<T>;
  label: string;

  disabled?: boolean;
  placeholder: string;
  type?: string;
  onBlur?: () => void;
  description?: string;
  className?: string;
  classNameInput?: string;
  classNameLabel?: string;

  isGroup?: boolean;
}
export const InputControlled = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  disabled,
  onBlur,
  description,
  className,
  classNameInput,
  classNameLabel,
  isGroup,
}: InputControlledProps<T>) => {
  const { control, getFieldState } = useFormContext();

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
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                disabled={isDisabled}
                className={cn(
                  `pr-12 ${
                    isDisabled &&
                    "bg-gray-100 text-sm font-semibold cursor-not-allowed"
                  }  ${getFieldState(name).error && "text-destructive"}`,
                  classNameInput,
                )}
                aria-invalid={getFieldState(name).error ? "true" : "false"}
              />
            </FormControl>

            <FormDescription>{description}</FormDescription>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
