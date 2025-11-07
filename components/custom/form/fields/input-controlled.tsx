import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldValues, Path, useFormContext } from "react-hook-form";

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
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
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
