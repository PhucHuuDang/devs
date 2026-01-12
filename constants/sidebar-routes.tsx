import {
  ActivityIcon,
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChefHatIcon,
  ChevronsUpDown,
  Command,
  CreditCard,
  FileUserIcon,
  Folder,
  Forward,
  GalleryVerticalEnd,
  LogOut,
  MonitorCogIcon,
  Settings2,
  ShieldUserIcon,
  Sparkles,
  SquareTerminal,
  Trash2,
} from "lucide-react";

import { DataProps } from "@/components/animate-ui/split/sidebar-chunks";

export const SIDEBAR_ROUTES: DataProps = {
  user: {
    name: "Skyleen",
    email: "skyleen@example.com",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
  },
  teams: {
    label: "Harry's Teams",
    items: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
  },
  navMain: {
    label: "Platform",
    items: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  },
  projects: {
    label: "Settings",
    items: [
      {
        name: "General",
        url: "/profile/general",
        icon: MonitorCogIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },
      {
        name: "Activities",
        url: "/profile/activities",
        icon: ActivityIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },
      {
        name: "Profile",
        url: "/profile",
        icon: FileUserIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },
      {
        name: "My Cooking",
        url: "/profile/my-cooking",
        icon: ChefHatIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },

      {
        name: "Password & Authentication",
        url: "/profile/password",
        icon: ShieldUserIcon,
      },
    ],
  },
};
