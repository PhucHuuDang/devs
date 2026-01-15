"use client";

import { cn } from "@/lib/utils";

import { paddings } from "@/components/ui/previewcn/presets/paddings";

type PaddingsSelectorProps = {
  value: string | null;
  onChange: (padding: string) => void;
};

export function PaddingsSelector({ value, onChange }: PaddingsSelectorProps) {
  return (
    <div className="relative grid gap-2.5 rounded-[8px] border border-neutral-50/10 bg-neutral-900 p-3">
      <label className="block text-xs font-semibold text-neutral-300">
        Padding
      </label>
      <div className="grid grid-cols-4 gap-2">
        {paddings.map((preset) => {
          const isSelected = value === preset.value;

          return (
            <button
              key={preset.name}
              onClick={() => onChange(preset.value)}
              className={cn(
                "group relative inline-flex min-h-[60px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[8px] border px-2 py-2.5 text-xs font-medium transition-all duration-200 text-neutral-50 bg-neutral-800/90",
                isSelected
                  ? "border-violet-400 bg-neutral-800/95 shadow-sm  ring-1 ring-violet-400"
                  : " border-neutral-50/10  hover:border-violet-400/40 hover:bg-neutral-800/95 hover:shadow-sm hover:text-neutral-50",
              )}
              title={`${preset.label} (${preset.value})`}
            >
              {/* Visual representation of padding */}
              <div className="flex items-center justify-center w-full h-6">
                <div
                  className={cn(
                    "flex items-center justify-center border-2 bg-neutral-500 border-dashed rounded-md  transition-all",
                    isSelected
                      ? "border-violet-400/60"
                      : "border-neutral-50/10 group-hover:border-primary/40 ",
                  )}
                  style={{ padding: preset.value }}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-md transition-all",
                      isSelected
                        ? "bg-violet-400"
                        : "bg-neutral-900/50 group-hover:bg-primary/60 ",
                    )}
                  />
                </div>
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] font-semibold transition-colors text-neutral-300",
                  isSelected
                    ? "text-neutral-50"
                    : "text-neutral-400 group-hover:text-neutral-50",
                )}
              >
                {preset.label}
              </span>

              {/* Value indicator */}
              <span
                className={cn(
                  "text-[9px] font-mono transition-colors",
                  isSelected
                    ? "text-neutral-50/70"
                    : "text-muted-foreground/60 group-hover:text-muted-foreground",
                )}
              >
                {preset.value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
