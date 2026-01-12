"use client";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import {
  CircleAlertIcon,
  DotIcon,
  FileQuestionMarkIcon,
  LanguagesIcon,
  TimerIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { InputGroupTagControlled } from "@/components/custom/form/fields/input-group-tag";
import { ItemSwitchControlled } from "@/components/custom/form/fields/item-switch-controlled";
import {
  SelectControlled,
  SelectOption,
} from "@/components/custom/form/fields/select-controlled";
import { TextareaControlled } from "@/components/custom/form/fields/text-area-controlled";
import FormWrapper from "@/components/custom/form/form-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

enum Language {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  IT = "it",
  PT = "pt",
  RU = "ru",
}

const languageOptions: SelectOption[] = [
  { label: "English", value: Language.EN, icon: getUnicodeFlagIcon("US") },
  { label: "Spanish", value: Language.ES, icon: getUnicodeFlagIcon("ES") },
  { label: "French", value: Language.FR, icon: getUnicodeFlagIcon("FR") },
  { label: "German", value: Language.DE, icon: getUnicodeFlagIcon("DE") },
  { label: "Italian", value: Language.IT, icon: getUnicodeFlagIcon("IT") },
  { label: "Portuguese", value: Language.PT, icon: getUnicodeFlagIcon("PT") },
  { label: "Russian", value: Language.RU, icon: getUnicodeFlagIcon("RU") },
];

const profileSchema = z.object({
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

export const ProfileClient = () => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
      timeFormat: true,
      showActiveDot: false,
      language: Language.EN,
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    console.log(data);
  };

  return (
    <div className=" size-full">
      <div className=" size-full container mx-auto space-y-4 md:space-y-6 p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <span className="text-sm text-gray-500">
            Manage your information, preferences, and connected data.
          </span>
        </div>

        <div className="flex gap-4">
          <Avatar className="size-15 rounded-md">
            <AvatarImage className="object-cover size-full" src="/image.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col ">
            <span className="text-lg font-bold">John Doe</span>
            <span className="text-sm">john.doe@example.com</span>
          </div>
        </div>

        <div>
          <FormWrapper
            form={form}
            onSubmit={onSubmit}
            className="space-y-4 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full ">
              <InputControlled
                label="Name"
                placeholder="John Doe"
                name="name"
                type="text"
                classNameInput="h-8 w-full"
                className="gap-1"
              />
              <InputControlled
                label="Email"
                placeholder="john.doe@example.com"
                name="email"
                type="email"
                classNameInput="h-8 w-full"
                className="gap-1"
              />
            </div>

            <TextareaControlled
              label="Bio"
              placeholder="Write about yourself"
              name="bio"
              type="textarea"
              // classNameInput="h-8 w-full"
              className="gap-1"
            />

            <InputGroupTagControlled
              name="website"
              label="Website"
              placeholder="example.com"
              className="gap-1"
              type="url"
              leftAddon={{
                type: "text",
                text: "https://",
                className: "text-muted-foreground",
              }}
            />

            <div>
              <h1 className="text-2xl font-bold">Preferences</h1>
              <span className="text-sm text-gray-500">
                Manage your application preferences.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectControlled
                label="Language"
                placeholder="Select Language"
                name="language"
                className="gap-1"
                selectOptions={Object.values(Language).map((language) => ({
                  label: language,
                  value: language,
                }))}
              />

              <SelectControlled
                label="Language"
                placeholder="Select Language"
                name="language"
                className="gap-1"
                selectOptions={languageOptions}
              />
            </div>

            <ItemSwitchControlled
              label="24 hour time format"
              name="timeFormat"
              description="Enable 24 hour time format for your application."
              icon={TimerIcon}
            />

            <ItemSwitchControlled
              label="Show active dot"
              name="showActiveDot"
              description="Show a dot next to your name to indicate your online status."
              icon={DotIcon}
            />

            <div className="flex items-center justify-between border p-1 rounded-lg hover:border-primary/30 transition-all duration-300 ">
              <div className="flex items-center gap-2">
                <CircleAlertIcon className="sizes-5" />
                <span className="text-xs font-medium">
                  Your changes will be saved automatically.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileQuestionMarkIcon className="sizes-5" />
                </Button>

                <Button variant="secondary" size="sm" type="submit">
                  Save changes
                </Button>
              </div>
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};
