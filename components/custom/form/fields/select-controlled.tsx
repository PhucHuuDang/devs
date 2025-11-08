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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, Path, useFormContext } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}
interface SelectControlledProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  selectOptions: SelectOption[];

  disabled?: boolean;
  placeholder: string;
  description?: string;
  className?: string;
  classNameSelect?: string;
  onBlur?: () => void;
}
export const SelectControlled = <T extends FieldValues>({
  name,
  label,
  placeholder,
  disabled,
  description,
  className,
  classNameSelect,
  selectOptions,
  onBlur,
}: SelectControlledProps<T>) => {
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
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isDisabled}
            >
              <FormControl>
                <SelectTrigger disabled={isDisabled} className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem
                    disabled={isDisabled}
                    key={option.value}
                    value={option.value}
                    className={cn("capitalize", classNameSelect)}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon && option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormDescription>{description}</FormDescription>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
