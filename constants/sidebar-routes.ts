import {
  ActivityIcon,
  AudioWaveform,
  BadgeCheck,
  BadgePlusIcon,
  Bell,
  BookIcon,
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
  LayoutDashboard,
  LogOut,
  MonitorCogIcon,
  Settings2,
  ShieldUserIcon,
  Sparkles,
  SquareTerminal,
  Trash2,
  UsersIcon,
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

const DASHBOARD = "dashboard";

export const DASHBOARD_SIDEBAR: DataProps = {
  projects: {
    label: "Dashboard",
    items: [
      {
        name: "Analytics",
        url: `/${DASHBOARD}/analytics`,
        icon: MonitorCogIcon,
      },

      {
        name: "Users",
        url: `/${DASHBOARD}/users`,
        icon: UsersIcon,
      },
    ],
  },

  navMain: {
    label: "Posts",
    items: [
      {
        icon: BookIcon,
        title: "Posts",
        url: `/${DASHBOARD}/posts`,

        items: [
          {
            title: "All Posts",
            url: `/${DASHBOARD}/posts`,
            logo: BookIcon,
          },

          {
            title: "Create Blog",
            url: `/${DASHBOARD}/create-blog`,
            logo: BadgePlusIcon,
          },
        ],
      },
    ],
  },
};
