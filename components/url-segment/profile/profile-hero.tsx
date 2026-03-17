"use client";

import { motion } from "framer-motion";
import { CameraIcon, GlobeIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-6 md:p-8"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-primary/10 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar with edit overlay */}
        <div className="relative group">
          <Avatar className="h-24 w-24 rounded-2xl ring-4 ring-background shadow-xl">
            <AvatarImage className="object-cover" src="/image.jpg" />
            <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold rounded-2xl">
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
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
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
  );
};
