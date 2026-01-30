"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { motion } from "framer-motion";
import {
  CircleAlertIcon,
  DotIcon,
  FileQuestionMarkIcon,
  TimerIcon,
  UserIcon,
  SettingsIcon,
  CameraIcon,
  GlobeIcon,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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

    if (!Object.keys(form.formState.dirtyFields).length) return;

    toast.warning("Please fill in all fields");
    return;
  };

  return (
    <motion.div
      className="size-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="size-full container mx-auto space-y-6 p-4 md:p-6 max-w-4xl">
        {/* Modern Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-6 md:p-8"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar with edit overlay */}
            <div className="relative group">
              <Avatar className="h-24 w-24 rounded-2xl ring-4 ring-background shadow-xl">
                <AvatarImage className="object-cover" src="/image.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold rounded-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              {/* Edit overlay */}
              <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                <CameraIcon className="h-6 w-6 text-white" />
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-4 border-background" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  John Doe
                </h1>
                <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Pro Member
                </div>
              </div>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <p className="text-sm text-muted-foreground/80 flex items-center gap-1">
                <GlobeIcon className="h-3 w-3" />
                San Francisco, CA
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form sections */}
        <motion.div variants={container} initial="hidden" animate="show">
          <FormWrapper
            form={form}
            onSubmit={onSubmit}
            className="space-y-6 w-full"
          >
            {/* Personal Information Section */}
            <motion.div
              variants={item}
              className="rounded-xl border bg-card/50 backdrop-blur-sm p-5 space-y-4 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    Personal Information
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Update your personal details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputControlled
                  label="Name"
                  placeholder="John Doe"
                  name="name"
                  type="text"
                  classNameInput="h-10 w-full"
                  className="gap-1.5"
                />
                <InputControlled
                  label="Email"
                  placeholder="john.doe@example.com"
                  name="email"
                  type="email"
                  classNameInput="h-10 w-full"
                  className="gap-1.5"
                />
              </div>

              <TextareaControlled
                label="Bio"
                placeholder="Write about yourself..."
                name="bio"
                type="textarea"
                className="gap-1.5"
              />

              <InputGroupTagControlled
                name="website"
                label="Website"
                placeholder="example.com"
                className="gap-1.5"
                type="url"
                leftAddon={{
                  type: "text",
                  text: "https://",
                  className: "text-muted-foreground",
                }}
              />
            </motion.div>

            {/* Preferences Section */}
            <motion.div
              variants={item}
              className="rounded-xl border bg-card/50 backdrop-blur-sm p-5 space-y-4 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <SettingsIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Preferences</h2>
                  <p className="text-xs text-muted-foreground">
                    Manage your application preferences
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectControlled
                  label="Language"
                  placeholder="Select Language"
                  name="language"
                  className="gap-1.5"
                  selectOptions={languageOptions}
                />

                <SelectControlled
                  label="Timezone"
                  placeholder="Select Timezone"
                  name="language"
                  className="gap-1.5"
                  selectOptions={Object.values(Language).map((language) => ({
                    label: language,
                    value: language,
                  }))}
                />
              </div>

              <div className="space-y-3">
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
              </div>
            </motion.div>

            {/* Action Bar */}
            <motion.div
              variants={item}
              className="flex items-center justify-between bg-gradient-to-r from-muted/50 to-muted/30 border rounded-xl p-3 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-amber-500/10">
                  <CircleAlertIcon className="h-4 w-4 text-amber-500" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Your changes will be saved automatically
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <FileQuestionMarkIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Help</span>
                </Button>

                <Button
                  size="sm"
                  type="submit"
                  className="bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  Save changes
                </Button>
              </div>
            </motion.div>
          </FormWrapper>
        </motion.div>
      </div>
    </motion.div>
  );
};
