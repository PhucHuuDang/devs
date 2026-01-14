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

interface SettingsSheetProps {
  classNameTrigger?: string;
  isHover?: boolean;
  inDock?: boolean;
}

const triggerStyle =
  "border rounded-lg p-2 bg-slate-500/10 hover:bg-slate-500/20 transition-all duration-300 cursor-pointer";

const accordionContentStyle =
  "p-4 border border-t-0 rounded-lg border-slate-500/20 group-data-[state=open]:border-t-0 group-hover:border-slate-500/30 grid md:grid-cols-2 gap-4";

const Trigger = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) => {
  return (
    <div className="flex items-center gap-2  w-full">
      <div className="flex items-center gap-1">
        {<Icon className="size-4 text-primary" />}
        <span className="text-sm font-medium">{title}</span>
      </div>
    </div>
  );
};

export function SettingsSheet({
  classNameTrigger,
  isHover = false,
}: SettingsSheetProps) {
  const isOpen = useOpenSheetSelectors.use.isOpen();
  const onOpen = useOpenSheetSelectors.use.onOpen();
  const onClose = useOpenSheetSelectors.use.onClose();

  const settings = useGetSettings();

  const applyChanges = shallow(defaultSettings, settings);

  //actions
  const onReset = useSettingsGlassSurfaceSelectors.use.onReset();
  const setBrightness = useSettingsGlassSurfaceSelectors.use.setBrightness();
  const setOpacity = useSettingsGlassSurfaceSelectors.use.setOpacity();
  const setBlur = useSettingsGlassSurfaceSelectors.use.setBlur();
  const setDisplace = useSettingsGlassSurfaceSelectors.use.setDisplace();
  const setBackgroundOpacity =
    useSettingsGlassSurfaceSelectors.use.setBackgroundOpacity();
  const setSaturation = useSettingsGlassSurfaceSelectors.use.setSaturation();
  const setDistortionScale =
    useSettingsGlassSurfaceSelectors.use.setDistortionScale();
  const setRedOffset = useSettingsGlassSurfaceSelectors.use.setRedOffset();
  const setGreenOffset = useSettingsGlassSurfaceSelectors.use.setGreenOffset();
  const setBlueOffset = useSettingsGlassSurfaceSelectors.use.setBlueOffset();
  const setXChannel = useSettingsGlassSurfaceSelectors.use.setXChannel();
  const setYChannel = useSettingsGlassSurfaceSelectors.use.setYChannel();
  const setMixBlendMode =
    useSettingsGlassSurfaceSelectors.use.setMixBlendMode();
  const setBorderRadius =
    useSettingsGlassSurfaceSelectors.use.setBorderRadius();
  const setBorderWidth = useSettingsGlassSurfaceSelectors.use.setBorderWidth();

  // docks

  const setDefaultSize = useSettingsGlassSurfaceSelectors.use.setDefaultSize();
  const setHoveredSize = useSettingsGlassSurfaceSelectors.use.setHoveredSize();

  // navbar & dock
  const isDockOpen = useSettingsGlassSurfaceSelectors.use.isDockOpen();
  const isNavbarOpen = useSettingsGlassSurfaceSelectors.use.isNavbarOpen();
  const onToggleDock = useSettingsGlassSurfaceSelectors.use.onToggleDock();
  const onToggleNavbar = useSettingsGlassSurfaceSelectors.use.onToggleNavbar();

  const distortionTrigger = (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center gap-1">
        <ZapIcon className="size-4 text-primary" />
        <span className="text-sm font-medium">Distortion</span>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onOpen}>
      {isHover ? (
        <HoverCardCustom
          trigger={
            <SheetTrigger asChild>
              <div
                className="flex items-center p-0.5 gap-1  text-base font-medium rounded-md cursor-pointer border border-transparent  hover:border-primary/80 transition-all duration-300 hover:bg-primary/10"
                onClick={() => onOpen(true)}
              >
                <EllipsisVerticalIcon
                  className={cn(
                    "size-8 shadow-lg bg-slate-200 cursor-pointer p-1 rounded-lg hover:scale-105 transition-all duration-300 hover:p-0.5 hover:bg-slate-400/20 dark:bg-slate-800 dark:hover:bg-slate-700",
                    classNameTrigger,
                  )}
                />
                Settings
              </div>
            </SheetTrigger>
          }
        >
          <div className="flex items-center gap-1">
            <SettingsIcon className="size-4" />
            <p className="text-sm font-medium">Settings</p>
          </div>
        </HoverCardCustom>
      ) : (
        <SheetTrigger asChild>
          <div
            className="flex items-center p-0.5 gap-1  text-base font-medium rounded-md cursor-pointer border border-transparent  transition-all duration-300 hover:scale-105"
            onClick={() => onOpen(true)}
          >
            <EllipsisVerticalIcon
              className={cn(
                "size-9 shadow-lg bg-slate-200 cursor-pointer p-1 rounded-lg hover:scale-105 transition-all duration-300  hover:bg-slate-400/20 dark:bg-slate-800 dark:hover:bg-slate-700",
                classNameTrigger,
              )}
            />
          </div>
        </SheetTrigger>
      )}

      <SheetContent
        className=" w-full sm:w-[600px] md:w-[700px] lg:min-w-[750px] xl:min-w-[800px] mr-0 md:mr-2 rounded-3xl
       border-0"
      >
        <SheetHeader className="">
          <SheetTitle className="flex items-center gap-1">
            <SettingsIcon className="size-4 animate-spin duration-500 transform transition" />
            Settings
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>

          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onReset();
              }}
            >
              <RotateCwIcon className="size-4" />
              <div className="">Reset</div>
            </Button>

            <Button
              variant="default"
              size="sm"
              className={`transition-all duration-500 overflow-hidden
                      ${
                        applyChanges
                          ? "opacity-0 max-h-0 py-0 px-0 cursor-not-allowed w-0 h-0"
                          : "opacity-100 max-h-10"
                      }
                        `}
              disabled={applyChanges}
            >
              Apply Changes
            </Button>
          </div>
        </SheetHeader>
        <div className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="distortion">
              <AccordionTrigger className={triggerStyle}>
                {distortionTrigger}
              </AccordionTrigger>
              <AccordionContent className={accordionContentStyle}>
                <DualRangeSliderSingle
                  label
                  title="Displace"
                  min={0}
                  max={5}
                  step={0.1}
                  values={Number(settings.displace)}
                  onValueChange={setDisplace}
                />

                <DualRangeSliderSingle
                  label
                  title="Distortion Scale"
                  min={-300}
                  max={300}
                  step={10}
                  values={Number(settings.distortionScale)}
                  onValueChange={setDistortionScale}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dock">
              <AccordionTrigger className={triggerStyle}>
                <Trigger title="Dock Settings" icon={DockIcon} />
              </AccordionTrigger>
              <AccordionContent className={accordionContentStyle}>
                <DualRangeSliderSingle
                  label
                  title="Size of the dock"
                  min={0}
                  max={150}
                  step={0.1}
                  values={Number(settings.defaultSize)}
                  onValueChange={setDefaultSize}
                />

                <DualRangeSliderSingle
                  label
                  title="Size when hovered the Dock "
                  min={0}
                  max={200}
                  step={1}
                  values={Number(settings.hoveredSize)}
                  onValueChange={setHoveredSize}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color-settings">
              <AccordionTrigger className={triggerStyle}>
                <Trigger title="Color Settings" icon={PaletteIcon} />
              </AccordionTrigger>
              <AccordionContent className={accordionContentStyle}>
                <DualRangeSliderSingle
                  label
                  title="Saturation"
                  min={0}
                  max={3}
                  step={1}
                  values={Number(settings.saturation)}
                  onValueChange={setSaturation}
                />

                <DualRangeSliderSingle
                  label
                  title="Red Offset"
                  min={0}
                  max={50}
                  step={1}
                  values={Number(settings.redOffset)}
                  onValueChange={setRedOffset}
                />

                <DualRangeSliderSingle
                  label
                  title="Green Offset"
                  min={0}
                  max={50}
                  step={1}
                  values={Number(settings.greenOffset)}
                  onValueChange={setGreenOffset}
                />

                <DualRangeSliderSingle
                  label
                  title="Blue Offset"
                  min={0}
                  max={50}
                  step={1}
                  values={Number(settings.blueOffset)}
                  onValueChange={setBlueOffset}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="basic-settings">
              <AccordionTrigger className={triggerStyle}>
                <Trigger title="Basic Settings" icon={OptionIcon} />
              </AccordionTrigger>
              <AccordionContent className={accordionContentStyle}>
                <DualRangeSliderSingle
                  label
                  title="Global Border Radius"
                  min={0}
                  max={50}
                  step={1}
                  values={Number(settings.borderRadius)}
                  onValueChange={setBorderRadius}
                />

                <DualRangeSliderSingle
                  label
                  title="Border Width"
                  min={0}
                  max={0.2}
                  step={0.01}
                  values={Number(settings.borderWidth)}
                  onValueChange={setBorderWidth}
                />

                <DualRangeSliderSingle
                  label
                  title="Brightness"
                  min={0}
                  max={100}
                  step={1}
                  values={Number(settings.brightness)}
                  onValueChange={setBrightness}
                />

                <DualRangeSliderSingle
                  label
                  title="Opacity"
                  min={0}
                  max={1}
                  step={0.01}
                  values={Number(settings.opacity)}
                  onValueChange={setOpacity}
                />

                <DualRangeSliderSingle
                  label
                  title="Blur"
                  min={0}
                  max={30}
                  step={1}
                  values={Number(settings.blur)}
                  onValueChange={setBlur}
                />
                <DualRangeSliderSingle
                  label
                  title="Background Opacity"
                  min={0}
                  max={1}
                  step={0.1}
                  values={Number(settings.backgroundOpacity)}
                  onValueChange={setBackgroundOpacity}
                />

                <SelectOptions
                  label="X Channel"
                  options={xChannelOptions}
                  onChange={(value) => setXChannel(value as xChannel)}
                  className="w-full"
                  classNameLabel="font-semibold text-sm"
                  value={String(settings.xChannel) as xChannel}
                />

                <SelectOptions
                  label="Y Channel"
                  options={yChannelOptions}
                  onChange={(value) => {
                    setYChannel(value as xChannel);
                  }}
                  value={String(settings.yChannel) as xChannel}
                />

                <SelectOptions
                  label="Mix Blend Mode"
                  options={mixBlendModeOptions}
                  placeholder="Select Mix Blend Mode"
                  onChange={(value) => {
                    setMixBlendMode(value as MixBlendMode);
                  }}
                  value={String(settings.mixBlendMode) as MixBlendMode}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="navbar-dock-settings">
              <AccordionTrigger className={triggerStyle}>
                <Trigger
                  title="Navbar and Dock Settings"
                  icon={ToggleLeftIcon}
                />
              </AccordionTrigger>
              <AccordionContent
                className={"flex flex-col gap-2 " + accordionContentStyle}
              >
                <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none cursor-pointer transition-all duration-300">
                  <Switch
                    id="dock"
                    className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
                    aria-describedby={`dock-description`}
                    checked={isDockOpen}
                    onCheckedChange={onToggleDock}
                  />

                  <div className="flex grow items-center gap-3">
                    <DockIcon className="size-5" />
                    <div className="grid grow gap-2">
                      <Label htmlFor="dock">Dock</Label>
                      <p id={`dock`} className="text-muted-foreground text-xs">
                        Show the dock in the bottom of the screen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none cursor-pointer transition-all duration-300">
                  <Switch
                    id="navbar"
                    className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
                    aria-describedby={`navbar-description`}
                    checked={isNavbarOpen}
                    onCheckedChange={onToggleNavbar}
                  />

                  <div className="flex grow items-center gap-3">
                    <NavigationIcon className="size-5" />
                    <div className="grid grow gap-2">
                      <Label htmlFor="navbar">Navbar</Label>
                      <p id={`dock`} className="text-muted-foreground text-xs">
                        Show the navbar in the top of the screen.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card
            className="mt-4 rounded-3xl"
            style={{
              backgroundImage: `url(${`https://images.unsplash.com/photo-1760648149145-560e619098ef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940`})`,
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
              {/* <CardAction>Card Action</CardAction> */}
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-2">
                <GlassIconWrapper icon={HomeIcon} />
                <GlassIconWrapper icon={UserIcon} />
                <GlassIconWrapper icon={Settings2Icon} />
                <GlassIconWrapper icon={ZapIcon} />
                <GlassIconWrapper icon={PaletteIcon} />
                <GlassIconWrapper icon={RotateCwIcon} />
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild onClick={onClose}>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>

        <BorderBeam size={300} duration={12} delay={9} />
      </SheetContent>
    </Sheet>
  );
}
