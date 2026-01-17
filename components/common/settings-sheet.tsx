"use client";

import {
  DockIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  LucideIcon,
  NavigationIcon,
  OptionIcon,
  PaletteIcon,
  RotateCwIcon,
  Settings2Icon,
  SettingsIcon,
  ToggleLeftIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import { shallow } from "zustand/shallow";

import {
  mixBlendModeOptions,
  xChannelOptions,
  yChannelOptions,
} from "@/lib/options";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GlassIconWrapper from "@/icons/glass-icon-wrapper";
import { useGetSettings } from "@/stores/use-get-settings";
import { useOpenSheetSelectors } from "@/stores/use-open-sheet";
import {
  defaultSettings,
  MixBlendMode,
  useSettingsGlassSurfaceSelectors,
  xChannel,
} from "@/stores/use-settings-glass-surface";

import { HoverCardCustom } from "../custom/hover-card-custom";
import { SelectOptions } from "../custom/select-options";
import DualRangeSliderSingle from "../spectrumui/dual-range-slider-single";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { BorderBeam } from "../ui/border-beam";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

/* ============================================================================
 * Types & Interfaces
 * ========================================================================= */

interface SettingsSheetProps {
  classNameTrigger?: string;
}

interface AccordionSectionProps {
  title: string;
  icon: LucideIcon;
  value: string;
  children: React.ReactNode;
}

interface NavigationSwitchProps {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  checked: boolean;
  disabled: boolean;
  showWarning: boolean;
  onToggle: () => void;
}

/* ============================================================================
 * Constants
 * ========================================================================= */

const STYLES = {
  trigger:
    "border rounded-lg p-2 bg-slate-500/10 hover:bg-slate-500/20 transition-all duration-300 cursor-pointer",
  accordionContent:
    "p-4 border border-t-0 rounded-lg border-slate-500/20 group-data-[state=open]:border-t-0 group-hover:border-slate-500/30 grid md:grid-cols-2 gap-4",
} as const;

const PREVIEW_ICONS = [
  HomeIcon,
  UserIcon,
  Settings2Icon,
  ZapIcon,
  PaletteIcon,
  RotateCwIcon,
] as const;

/* ============================================================================
 * Sub-Components
 * ========================================================================= */

const AccordionTriggerContent = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) => (
  <div className="flex items-center gap-2 w-full">
    <div className="flex items-center gap-1">
      <Icon className="size-4 text-primary" />
      <span className="text-sm font-medium">{title}</span>
    </div>
  </div>
);

const AccordionSection = ({
  title,
  icon,
  value,
  children,
}: AccordionSectionProps) => (
  <AccordionItem value={value}>
    <AccordionTrigger className={STYLES.trigger}>
      <AccordionTriggerContent title={title} icon={icon} />
    </AccordionTrigger>
    <AccordionContent className={STYLES.accordionContent}>
      {children}
    </AccordionContent>
  </AccordionItem>
);

const NavigationSwitch = ({
  id,
  label,
  description,
  icon: Icon,
  checked,
  disabled,
  showWarning,
  onToggle,
}: NavigationSwitchProps) => (
  <div
    className={cn(
      "border-input relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none transition-all duration-300",
      checked && "border-primary",
      disabled && "opacity-75 cursor-not-allowed",
    )}
    aria-description={description}
    aria-checked={checked}
    aria-disabled={disabled}
    aria-label={label}
    aria-labelledby={`${id}-label`}
    aria-describedby={`${id}-description`}
    aria-required={true}
    aria-readonly={false}
  >
    <Switch
      id={id}
      className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
      aria-describedby={`${id}-description`}
      checked={checked}
      disabled={disabled}
      onCheckedChange={onToggle}
    />

    <div className="flex grow items-center gap-3">
      <Icon className="size-5" />
      <div className="grid grow gap-2">
        <Label htmlFor={id} className={cn(disabled && "cursor-not-allowed")}>
          {label}
        </Label>
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {description}
          {showWarning && (
            <span className="text-amber-500/80 block mt-1 font-medium">
              ⚠️ At least one navigation must be visible
            </span>
          )}
        </p>
      </div>
    </div>
  </div>
);

export const SheetTriggerButton = ({
  classNameTrigger,
  isHover,
}: {
  classNameTrigger?: string;
  isHover: boolean;
}) => {
  const isOpen = useSettingsGlassSurfaceSelectors.use.isOpen();
  const onOpenChange = useSettingsGlassSurfaceSelectors.use.onOpenChange();

  const triggerElement = (
    <div
      className={cn(
        "flex items-center p-0.5 gap-1 text-base font-medium rounded-md cursor-pointer border border-transparent hover:border-primary/80 hover:bg-primary/10 transition-all duration-300",
        isHover ? "hover:border-primary/80 hover:bg-primary/10" : "",
      )}
      onClick={() => onOpenChange(!isOpen)}
    >
      <EllipsisVerticalIcon
        className={cn(
          "shadow-lg bg-slate-200 cursor-pointer p-1 rounded-lg transition-all duration-300 hover:bg-slate-400/20 dark:bg-slate-800 dark:hover:bg-slate-700",
          isHover ? "size-8 hover:p-0.5" : "size-6",
          classNameTrigger,
        )}
      />

      {isHover ? null : <span className="text-md font-medium">Settings</span>}
    </div>
  );

  if (isHover) {
    return (
      <>
        <SettingsIcon
          className={cn("size-8", classNameTrigger)}
          onClick={() => onOpenChange(!isOpen)}
          aria-label="Open settings"
          aria-description="Open settings"
          aria-checked={isOpen}
          aria-disabled={false}
          aria-readonly={false}
        />
      </>
    );
  }

  return triggerElement;
};

/* ============================================================================
 * Custom Hooks
 * ========================================================================= */

const useSettingsActions = () => {
  return {
    onReset: useSettingsGlassSurfaceSelectors.use.onReset(),
    setBrightness: useSettingsGlassSurfaceSelectors.use.setBrightness(),
    setOpacity: useSettingsGlassSurfaceSelectors.use.setOpacity(),
    setBlur: useSettingsGlassSurfaceSelectors.use.setBlur(),
    setDisplace: useSettingsGlassSurfaceSelectors.use.setDisplace(),
    setBackgroundOpacity:
      useSettingsGlassSurfaceSelectors.use.setBackgroundOpacity(),
    setSaturation: useSettingsGlassSurfaceSelectors.use.setSaturation(),
    setDistortionScale:
      useSettingsGlassSurfaceSelectors.use.setDistortionScale(),
    setRedOffset: useSettingsGlassSurfaceSelectors.use.setRedOffset(),
    setGreenOffset: useSettingsGlassSurfaceSelectors.use.setGreenOffset(),
    setBlueOffset: useSettingsGlassSurfaceSelectors.use.setBlueOffset(),
    setXChannel: useSettingsGlassSurfaceSelectors.use.setXChannel(),
    setYChannel: useSettingsGlassSurfaceSelectors.use.setYChannel(),
    setMixBlendMode: useSettingsGlassSurfaceSelectors.use.setMixBlendMode(),
    setBorderRadius: useSettingsGlassSurfaceSelectors.use.setBorderRadius(),
    setBorderWidth: useSettingsGlassSurfaceSelectors.use.setBorderWidth(),
    setDefaultSize: useSettingsGlassSurfaceSelectors.use.setDefaultSize(),
    setHoveredSize: useSettingsGlassSurfaceSelectors.use.setHoveredSize(),
  };
};

const useNavigationToggles = () => {
  const isDockOpen = useSettingsGlassSurfaceSelectors.use.isDockOpen();
  const isNavbarOpen = useSettingsGlassSurfaceSelectors.use.isNavbarOpen();
  const onToggleDock = useSettingsGlassSurfaceSelectors.use.onToggleDock();
  const onToggleNavbar = useSettingsGlassSurfaceSelectors.use.onToggleNavbar();

  const isOnlyDockVisible = isDockOpen && !isNavbarOpen;
  const isOnlyNavbarVisible = !isDockOpen && isNavbarOpen;

  const handleToggleDock = () => {
    if (!isOnlyDockVisible) {
      onToggleDock();
    }
  };

  const handleToggleNavbar = () => {
    if (!isOnlyNavbarVisible) {
      onToggleNavbar();
    }
  };

  return {
    isDockOpen,
    isNavbarOpen,
    isOnlyDockVisible,
    isOnlyNavbarVisible,
    handleToggleDock,
    handleToggleNavbar,
  };
};

/* ============================================================================
 * Main Component
 * ========================================================================= */

export function SettingsSheet({ classNameTrigger }: SettingsSheetProps) {
  // Sheet state
  const isOpen = useSettingsGlassSurfaceSelectors.use.isOpen();
  const onOpenChange = useSettingsGlassSurfaceSelectors.use.onOpenChange();

  // Settings
  const settings = useGetSettings();
  const applyChanges = shallow(defaultSettings, settings);

  // Actions
  const actions = useSettingsActions();

  // Navigation toggles
  const navigation = useNavigationToggles();

  // Handlers
  // const handleSheetOpenChange = (open: boolean) => {
  //   onOpen(open);
  //   onSheetOpenChange?.(open);
  // };

  const preventSheetClose = (e: Event) => {
    const target = e.target as HTMLElement;
    const isOverlay =
      target.hasAttribute("data-slot") &&
      target.getAttribute("data-slot") === "sheet-overlay";

    if (!isOverlay) {
      e.preventDefault();
    }
  };

  return (
    <Sheet open={settings.isOpen} onOpenChange={onOpenChange}>
      {/* <SheetTriggerButton
        classNameTrigger={classNameTrigger}
        isHover={isHover}
      /> */}

      <SheetContent
        className="w-full sm:w-[600px] md:w-[700px] lg:min-w-[750px] xl:min-w-[800px] mr-0 md:mr-2 rounded-3xl border-0"
        onPointerDownOutside={preventSheetClose}
        onInteractOutside={preventSheetClose}
      >
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1">
            <SettingsIcon className="size-4 animate-spin duration-500 transform transition" />
            Settings
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>

          <div className="flex items-center gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={actions.onReset}>
              <RotateCwIcon className="size-4" />
              <div>Reset</div>
            </Button>

            <Button
              variant="default"
              size="sm"
              className={cn(
                "transition-all duration-500 overflow-hidden",
                applyChanges
                  ? "opacity-0 max-h-0 py-0 px-0 cursor-not-allowed w-0 h-0"
                  : "opacity-100 max-h-10",
              )}
              disabled={applyChanges}
            >
              Apply Changes
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="p-4">
          <Accordion type="single" collapsible>
            {/* Distortion Settings */}
            <AccordionSection
              title="Distortion"
              icon={ZapIcon}
              value="distortion"
            >
              <DualRangeSliderSingle
                label
                title="Displace"
                min={0}
                max={5}
                step={0.1}
                values={Number(settings.displace)}
                onValueChange={actions.setDisplace}
              />
              <DualRangeSliderSingle
                label
                title="Distortion Scale"
                min={-300}
                max={300}
                step={10}
                values={Number(settings.distortionScale)}
                onValueChange={actions.setDistortionScale}
              />
            </AccordionSection>

            {/* Dock Settings */}
            <AccordionSection title="Dock" icon={DockIcon} value="dock">
              <DualRangeSliderSingle
                label
                title="Size of the dock"
                min={0}
                max={150}
                step={0.1}
                values={Number(settings.defaultSize)}
                onValueChange={actions.setDefaultSize}
              />
              <DualRangeSliderSingle
                label
                title="Size when hovered the Dock"
                min={0}
                max={200}
                step={1}
                values={Number(settings.hoveredSize)}
                onValueChange={actions.setHoveredSize}
              />
            </AccordionSection>

            {/* Color Settings */}
            <AccordionSection
              title="Color"
              icon={PaletteIcon}
              value="color-settings"
            >
              <DualRangeSliderSingle
                label
                title="Saturation"
                min={0}
                max={3}
                step={1}
                values={Number(settings.saturation)}
                onValueChange={actions.setSaturation}
              />
              <DualRangeSliderSingle
                label
                title="Red Offset"
                min={0}
                max={50}
                step={1}
                values={Number(settings.redOffset)}
                onValueChange={actions.setRedOffset}
              />
              <DualRangeSliderSingle
                label
                title="Green Offset"
                min={0}
                max={50}
                step={1}
                values={Number(settings.greenOffset)}
                onValueChange={actions.setGreenOffset}
              />
              <DualRangeSliderSingle
                label
                title="Blue Offset"
                min={0}
                max={50}
                step={1}
                values={Number(settings.blueOffset)}
                onValueChange={actions.setBlueOffset}
              />
            </AccordionSection>

            {/* Basic Settings */}
            <AccordionSection
              title="Basics"
              icon={OptionIcon}
              value="basic-settings"
            >
              <DualRangeSliderSingle
                label
                title="Border Radius"
                min={0}
                max={50}
                step={1}
                values={Number(settings.borderRadius)}
                onValueChange={actions.setBorderRadius}
              />
              <DualRangeSliderSingle
                label
                title="Border Width"
                min={0}
                max={0.2}
                step={0.01}
                values={Number(settings.borderWidth)}
                onValueChange={actions.setBorderWidth}
              />
              <DualRangeSliderSingle
                label
                title="Brightness"
                min={0}
                max={100}
                step={1}
                values={Number(settings.brightness)}
                onValueChange={actions.setBrightness}
              />
              <DualRangeSliderSingle
                label
                title="Opacity"
                min={0}
                max={1}
                step={0.01}
                values={Number(settings.opacity)}
                onValueChange={actions.setOpacity}
              />
              <DualRangeSliderSingle
                label
                title="Blur"
                min={0}
                max={30}
                step={1}
                values={Number(settings.blur)}
                onValueChange={actions.setBlur}
              />
              <DualRangeSliderSingle
                label
                title="Background Opacity"
                min={0}
                max={1}
                step={0.1}
                values={Number(settings.backgroundOpacity)}
                onValueChange={actions.setBackgroundOpacity}
              />

              <SelectOptions
                label="X Channel"
                options={xChannelOptions}
                onChange={(value) => actions.setXChannel(value as xChannel)}
                className="w-full"
                classNameLabel="font-semibold text-sm"
                value={String(settings.xChannel) as xChannel}
              />
              <SelectOptions
                label="Y Channel"
                options={yChannelOptions}
                onChange={(value) => actions.setYChannel(value as xChannel)}
                value={String(settings.yChannel) as xChannel}
              />
              <SelectOptions
                label="Mix Blend Mode"
                options={mixBlendModeOptions}
                placeholder="Select Mix Blend Mode"
                onChange={(value) =>
                  actions.setMixBlendMode(value as MixBlendMode)
                }
                value={String(settings.mixBlendMode) as MixBlendMode}
              />
            </AccordionSection>

            {/* Navigation Settings */}
            <AccordionItem value="navbar-dock-settings">
              <AccordionTrigger className={STYLES.trigger}>
                <AccordionTriggerContent
                  title="Navbar and Dock"
                  icon={ToggleLeftIcon}
                />
              </AccordionTrigger>
              <AccordionContent
                className={cn("flex flex-col gap-2", STYLES.accordionContent)}
              >
                <NavigationSwitch
                  id="dock"
                  label="Dock"
                  description="Show the dock in the bottom of the screen."
                  icon={DockIcon}
                  checked={navigation.isDockOpen}
                  disabled={navigation.isOnlyDockVisible}
                  showWarning={navigation.isOnlyDockVisible}
                  onToggle={navigation.handleToggleDock}
                />
                <NavigationSwitch
                  id="navbar"
                  label="Navbar"
                  description="Show the navbar in the top of the screen."
                  icon={NavigationIcon}
                  checked={navigation.isNavbarOpen}
                  disabled={navigation.isOnlyNavbarVisible}
                  showWarning={navigation.isOnlyNavbarVisible}
                  onToggle={navigation.handleToggleNavbar}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Preview Card */}
          <Card
            className="mt-4 rounded-3xl"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1760648149145-560e619098ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              animation: "var(--animate-move-bg)",
            }}
          >
            <CardHeader>
              <CardTitle className="text-white">Preview</CardTitle>
              <CardDescription className="text-slate-100">
                Preview the changes you have made to the glass surface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-2">
                {PREVIEW_ICONS.map((Icon, index) => (
                  <GlassIconWrapper key={index} icon={Icon} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild onClick={() => onOpenChange(false)}>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>

        <BorderBeam size={300} duration={12} delay={9} />
      </SheetContent>
    </Sheet>
  );
}
