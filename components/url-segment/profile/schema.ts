import getUnicodeFlagIcon from "country-flag-icons/unicode";
import z from "zod";

import { SelectOption } from "@/components/custom/form/fields/select-controlled";

export enum Language {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  IT = "it",
  PT = "pt",
  RU = "ru",
}

export const languageOptions: SelectOption[] = [
  { label: "English", value: Language.EN, icon: getUnicodeFlagIcon("US") },
  { label: "Spanish", value: Language.ES, icon: getUnicodeFlagIcon("ES") },
  { label: "French", value: Language.FR, icon: getUnicodeFlagIcon("FR") },
  { label: "German", value: Language.DE, icon: getUnicodeFlagIcon("DE") },
  { label: "Italian", value: Language.IT, icon: getUnicodeFlagIcon("IT") },
  { label: "Portuguese", value: Language.PT, icon: getUnicodeFlagIcon("PT") },
  { label: "Russian", value: Language.RU, icon: getUnicodeFlagIcon("RU") },
];

export const profileSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  avatar: z.string().url({
    message: "Invalid avatar URL",
  }),
  bio: z.string().min(1, {
    message: "Bio is required",
  }),
  location: z.string().min(1, {
    message: "Location is required",
  }),
  website: z.string().url({
    message: "Invalid website URL",
  }),
  phone: z.string().min(1, {
    message: "Phone is required",
  }),

  github: z.string().url({
    message: "Invalid GitHub URL",
  }),

  language: z.nativeEnum(Language).default(Language.EN).optional(),

  dateOfBirth: z.date().optional(),
  timeFormat: z.boolean().optional(),
  showActiveDot: z.boolean().default(false).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
