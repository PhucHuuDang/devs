export type RadiusPreset = {
  name: string;
  label: string;
  value: string;
};

export const radiusPresets: RadiusPreset[] = [
  { name: "none", label: "None", value: "0rem" },
  { name: "sm", label: "SM", value: "0.25rem" },
  { name: "md", label: "MD", value: "0.375rem" },
  { name: "lg", label: "LG", value: "0.5rem" },
  { name: "xl", label: "XL", value: "0.75rem" },
  { name: "2xl", label: "2XL", value: "1rem" },
  { name: "3xl", label: "3XL", value: "1.5rem" },
  { name: "4xl", label: "4XL", value: "2rem" },
  { name: "5xl", label: "5XL", value: "2.5rem" },
  { name: "6xl", label: "6XL", value: "3rem" },
  { name: "7xl", label: "7XL", value: "3.5rem" },
  { name: "8xl", label: "8XL", value: "4rem" },
];

export function getRadiusPreset(name: string): RadiusPreset | undefined {
  return radiusPresets.find((p) => p.name === name);
}
