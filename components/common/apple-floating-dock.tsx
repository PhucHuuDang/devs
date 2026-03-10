import React from "react";

import Image from "next/image";

import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Settings2Icon } from "lucide-react";

import { FloatingDock } from "@/components/ui/floating-dock";

export function AppleFloatingDock() {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex items-center justify-center w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={[]}
      />
    </div>
  );
}
