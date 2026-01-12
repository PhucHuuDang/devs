import { LucideIcon } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";

interface ItemSwitchControlledProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description: string;
  icon: LucideIcon;
  value?: boolean;

  disabled?: boolean;
  onChange?: (value: T) => void;

  className?: string;
  classNameLabel?: string;
  onBlur?: () => void;
}

export const ItemSwitchControlled = <T extends FieldValues>({
  label,
  name,
  description,
  icon: Icon,
  value,
  disabled,
  onChange,
  className,
  classNameLabel,
  onBlur,
}: ItemSwitchControlledProps<T>) => {
  const { control, getFieldState } = useFormContext();

  // console.log(control);

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState, formState }) => {
        const isDisabled = disabled || field.disabled || formState.isSubmitting;
        return (
          <FormItem
            className={cn(
              "w-full flex flex-col md:flex-row  gap-2 border p-2 rounded-lg hover:border-primary/30 transition-all duration-300  ",
              className,
            )}
          >
            <FormControl onBlur={onBlur}>
              <Switch
                checked={!!field.value}
                onCheckedChange={field.onChange}
                disabled={isDisabled}
                ref={field.ref}
              />
            </FormControl>

            <div className="flex md:flex-col gap-1  w-full cursor-pointer">
              <div className="flex items-center justify-between gap-2">
                <FormLabel
                  className={cn(
                    "text-sm font-medium text-foreground",
                    classNameLabel,
                  )}
                >
                  {label}
                </FormLabel>

                {Icon && <Icon className="sizes-5" />}
              </div>
              <FormDescription>{description}</FormDescription>
            </div>

            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};
