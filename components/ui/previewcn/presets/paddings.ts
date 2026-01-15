export type PaddingPreset = {
  name: string;
  label: string;
  value: string;
};
export const paddings: PaddingPreset[] = [
  { name: "none", label: "None", value: "0rem" },
  { name: "sm", label: "SM", value: "0.25rem" },
  { name: "md", label: "MD", value: "0.375rem" },
  { name: "lg", label: "LG", value: "0.5rem" },
];

export function getPaddingPreset(name: string): PaddingPreset | undefined {
  return paddings.find((p) => p.name === name);
}
