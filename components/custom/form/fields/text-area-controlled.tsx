import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface TextareaControlledProps<T extends FieldValues> {
  name: Path<T>;
  label: string;

  disabled?: boolean;
  placeholder: string;
  type?: string;
  onBlur?: () => void;
  description?: string;
  className?: string;

  classNameInput?: string;
}
export const TextareaControlled = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  disabled,
  onBlur,
  description,
  className,
  classNameInput,
}: TextareaControlledProps<T>) => {
  const { control, getFieldState } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState, formState }) => {
        const isDisabled = disabled || field.disabled || formState.isSubmitting;
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl onBlur={onBlur}>
              <Textarea
                placeholder={placeholder}
                {...field}
                disabled={isDisabled}
                className={cn(
                  `pr-12 h-29 rounded-2xl ${
                    isDisabled &&
                    "bg-gray-100 text-sm font-semibold cursor-not-allowed"
                  }  ${getFieldState(name).error && "text-destructive"}`,
                  classNameInput
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
