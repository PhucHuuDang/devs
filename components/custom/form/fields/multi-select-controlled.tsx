import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultipleSelect, TTag } from "@/components/ui/multiple-select";
import React, { ReactNode } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface MultiSelectControlledProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: TTag[];
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  customTag?: (item: TTag) => ReactNode | string;
  className?: string;
  classNameLabel?: string;
}

export const MultiSelectControlled = <T extends FieldValues>({
  name,
  label,
  options,
  disabled,
  customTag,
  description,
  className,
  classNameLabel,
}: MultiSelectControlledProps<T>) => {
  const { control, getFieldState, formState } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem className={className}>
            <FormLabel className={classNameLabel}>{label}</FormLabel>
            <FormControl>
              <MultipleSelect
                tags={options}
                {...field}
                defaultValue={field.value}
                customTag={customTag}
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
