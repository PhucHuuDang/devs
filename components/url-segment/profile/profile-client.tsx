"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import FormWrapper from "@/components/custom/form/form-wrapper";

import { ProfileHero } from "./profile-hero";
import {
  PersonalInfoSection,
  PreferencesSection,
  ProfileActionBar,
} from "./profile-sections";
import { Language, profileSchema, ProfileFormValues } from "./schema";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const ProfileClient = () => {
  const form = useForm<ProfileFormValues>({
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

  const onSubmit = async (data: ProfileFormValues) => {
    console.log(data);

    if (!Object.keys(form.formState.dirtyFields).length) {
      toast.info("No changes to save");
      return;
    }

    toast.success("Profile updated successfully");
  };

  return (
    <motion.div
      className="size-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="size-full container mx-auto space-y-6 p-4 md:p-6 max-w-4xl">
        <ProfileHero />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <FormWrapper
            form={form}
            onSubmit={onSubmit}
            className="space-y-6 w-full"
          >
            <PersonalInfoSection />
            <PreferencesSection />
            <ProfileActionBar />
          </FormWrapper>
        </motion.div>
      </div>
    </motion.div>
  );
};
