import { useId } from "react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOptionsProps {
  label: string;
  options: { label: string; value: string }[];

  placeholder?: string;
  defaultValue?: string;

  onChange: (value: string) => void;
  value: string;

  className?: string;

  classNameLabel?: string;
}

function SelectOptions({
  label,
  options,
  placeholder,
  defaultValue,
  onChange,
  value,
  className,
  classNameLabel,
}: SelectOptionsProps) {
  const id = useId();
  return (
    <div className={cn("space-y-2  w-full min-w-[300px]", className)}>
      {label && (
        <Label
          htmlFor={id}
          className={cn("font-semibold text-sm ", classNameLabel)}
        >
          {label}
        </Label>
      )}
      <Select
        defaultValue={defaultValue || options[0].value}
        onValueChange={onChange}
        value={value}
      >
        <SelectTrigger id={id} className="w-full cursor-pointer">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2 ">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="capitalize cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { SelectOptions };
