"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Bell,
  Shield,
  Palette,
  KeyRound,
  Mail,
  Globe,
  Eye,
  EyeOff,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Settings navigation items
const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: KeyRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

// Profile form schema
const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Notification settings
const notificationSettings = [
  {
    id: "email_comments",
    label: "Comment notifications",
    description: "Receive emails when someone comments on your posts",
  },
  {
    id: "email_likes",
    label: "Like notifications",
    description: "Receive emails when someone likes your posts",
  },
  {
    id: "email_follows",
    label: "Follow notifications",
    description: "Receive emails when someone follows you",
  },
  {
    id: "email_newsletter",
    label: "Newsletter",
    description: "Receive our weekly newsletter",
  },
  {
    id: "push_all",
    label: "Push notifications",
    description: "Receive push notifications for important updates",
  },
];

// Privacy settings
const privacySettings = [
  {
    id: "profile_public",
    label: "Public profile",
    description: "Allow others to see your profile",
  },
  {
    id: "show_email",
    label: "Show email",
    description: "Display your email on your public profile",
  },
  {
    id: "allow_indexing",
    label: "Search engine indexing",
    description: "Allow search engines to index your profile",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    email_comments: true,
    email_likes: false,
    email_follows: true,
    email_newsletter: false,
    push_all: true,
  });
  const [privacy, setPrivacy] = useState<Record<string, boolean>>({
    profile_public: true,
    show_email: false,
    allow_indexing: true,
  });
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Profile form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      bio: "Full-stack developer passionate about cooking and sharing recipes.",
      website: "https://johndoe.dev",
    },
  });

  const onSubmitProfile = (data: ProfileFormValues) => {
    // Simulate API call
    toast.success("Profile updated successfully");
    console.log("Profile data:", data);
  };

  const handleNotificationChange = (id: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [id]: value }));
    toast.success("Notification preference updated");
  };

  const handlePrivacyChange = (id: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [id]: value }));
    toast.success("Privacy setting updated");
  };

  return (
    <SidebarInsetContent isSidebarInset={false}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <nav className="flex lg:w-48 lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.label}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmitProfile)}
                      className="space-y-6"
                    >
                      {/* Avatar */}
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="https://avatars.githubusercontent.com/u/1" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button type="button" variant="outline" size="sm">
                            Change Avatar
                          </Button>
                          <p className="mt-1 text-xs text-muted-foreground">
                            JPG, GIF or PNG. Max size 1MB.
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              {field.value?.length || 0}/160 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}

            {/* Account Section */}
            {activeSection === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <Input id="new" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input id="confirm" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>

                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">
                      Danger Zone
                    </CardTitle>
                    <CardDescription>
                      Irreversible actions for your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Choose what notifications you receive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {notificationSettings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <Label htmlFor={setting.id}>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {setting.description}
                        </p>
                      </div>
                      <Switch
                        id={setting.id}
                        checked={notifications[setting.id]}
                        onCheckedChange={(value) =>
                          handleNotificationChange(setting.id, value)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Privacy Section */}
            {activeSection === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy</CardTitle>
                  <CardDescription>
                    Control your privacy settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {privacySettings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between"
                    >
                      <div className="space-y-0.5">
                        <Label htmlFor={setting.id}>{setting.label}</Label>
                        <p className="text-sm text-muted-foreground">
                          {setting.description}
                        </p>
                      </div>
                      <Switch
                        id={setting.id}
                        checked={privacy[setting.id]}
                        onCheckedChange={(value) =>
                          handlePrivacyChange(setting.id, value)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Appearance Section */}
            {activeSection === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the app looks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {(
                        [
                          { value: "light", label: "Light" },
                          { value: "dark", label: "Dark" },
                          { value: "system", label: "System" },
                        ] as const
                      ).map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors",
                            theme === option.value
                              ? "border-primary bg-primary/5"
                              : "border-muted hover:border-primary/50",
                          )}
                        >
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full",
                              option.value === "light" && "bg-white border",
                              option.value === "dark" && "bg-gray-900",
                              option.value === "system" &&
                                "bg-gradient-to-r from-white to-gray-900",
                            )}
                          />
                          <span className="text-sm font-medium">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </SidebarInsetContent>
  );
}
