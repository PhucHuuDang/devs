import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatTypes = {
  short: "dd/MM/yyyy",
  long: "EEEE, dd MMMM yyyy",
  time: "HH:mm",
  full: "dd/MM/yyyy HH:mm:ss",
} as const;

export type FormatType = keyof typeof formatTypes;

export const formatDate = (
  date: string | Date,
  formatInput: FormatType | string = "short",
  useVietnamese = false
) => {
  if (!date) return "";

  const d = new Date(date);

  const pattern =
    formatTypes[formatInput as FormatType] || (formatInput as string);

  return format(d, pattern, useVietnamese ? { locale: vi } : undefined);
};
