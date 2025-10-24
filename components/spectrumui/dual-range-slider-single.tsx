"use client";

import * as React from "react";
import { DualRangeSliderAnimation } from "./dual-range-animation";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface DualRangeSliderSingleProps {
  min: number;
  max: number;
  step: number;
  values: number;
  onValueChange: (value: number) => void;

  labelPosition?: "top" | "bottom" | "static";
  lableContenPos?: "left" | "right";
  label?: React.ReactNode | ((value: number | undefined) => React.ReactNode);

  title: string;

  className?: string;
  classTitle?: string;
  classContainer?: string;
}

const DualRangeSliderSingle = ({
  min,
  max,
  step,
  values,
  onValueChange,
  label,
  labelPosition = "top",
  title,
  className,
  classTitle,
  classContainer,
  lableContenPos = "right",
}: DualRangeSliderSingleProps) => {
  return (
    <div className={cn("w-full space-y-6 ", classContainer)}>
      <Label className={cn("font-semibold text-sm ", classTitle)}>
        {title}
      </Label>

      <DualRangeSliderAnimation
        label={label}
        lableContenPos={lableContenPos}
        labelPosition={labelPosition}
        value={[values]}
        onValueChange={([value]) => value != null && onValueChange(value)}
        min={min}
        max={max}
        step={step}
        className={className}
      />
    </div>
  );
};
export default DualRangeSliderSingle;
