"use client";

import { motion } from "framer-motion";
import {
  CircleAlertIcon,
  DotIcon,
  FileQuestionMarkIcon,
  SettingsIcon,
  Sparkles,
  TimerIcon,
  UserIcon,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { InputControlled } from "@/components/custom/form/fields/input-controlled";
import { InputGroupTagControlled } from "@/components/custom/form/fields/input-group-tag";
import { ItemSwitchControlled } from "@/components/custom/form/fields/item-switch-controlled";
import { SelectControlled } from "@/components/custom/form/fields/select-controlled";
import { TextareaControlled } from "@/components/custom/form/fields/text-area-controlled";
import { Button } from "@/components/ui/button";

import { Language, languageOptions, ProfileFormValues } from "./schema";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ProfileFormSectionsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const PersonalInfoSection = () => (
  <motion.div
    variants={itemVariants}
    className="rounded-xl border bg-card/50 backdrop-blur-sm p-5 space-y-4 hover:border-primary/20 transition-colors duration-300"
  >
    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
      <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-primary/10">
        <UserIcon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">Personal Information</h2>
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
);

export const PreferencesSection = () => (
  <motion.div
    variants={itemVariants}
    className="rounded-xl border bg-card/50 backdrop-blur-sm p-5 space-y-4 hover:border-primary/20 transition-colors duration-300"
  >
    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
      <div className="p-2 rounded-lg bg-linear-to-br from-primary/20 to-primary/10">
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
);

export const ProfileActionBar = () => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-between bg-linear-to-r from-muted/50 to-muted/30 border rounded-xl p-3 hover:border-primary/30 transition-all duration-300"
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
        className="bg-linear-to-r from-primary to-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 gap-1.5"
      >
        <Sparkles className="h-4 w-4" />
        Save changes
      </Button>
    </div>
  </motion.div>
);
