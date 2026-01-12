import { MixBlendMode, xChannel } from "@/stores/use-settings-glass-surface";

export const mixBlendModeOptions = [
  { label: "Normal", value: "normal" as MixBlendMode },
  { label: "Multiply", value: "multiply" as MixBlendMode },
  { label: "Screen", value: "screen" as MixBlendMode },
  { label: "Overlay", value: "overlay" as MixBlendMode },
  { label: "Darken", value: "darken" as MixBlendMode },
  { label: "Lighten", value: "lighten" as MixBlendMode },
  { label: "Color Dodge", value: "color-dodge" as MixBlendMode },
  { label: "Color Burn", value: "color-burn" as MixBlendMode },
];

export const xChannelOptions = [
  { label: "Red", value: "R" as xChannel },
  { label: "Green", value: "G" as xChannel },
  { label: "Blue", value: "B" as xChannel },
];

export const yChannelOptions = xChannelOptions;
