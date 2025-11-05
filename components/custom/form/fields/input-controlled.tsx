import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
}: InputControlledProps<T>) => {
  const { control, getFieldState } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl onBlur={onBlur}>
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                disabled={disabled || field.disabled || formState.isSubmitting}
                className={`pr-12 ${
                  getFieldState(name).error && "text-destructive"
                }`}
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
