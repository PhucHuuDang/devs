import { GlassSurfaceProps } from "@/components/GlassSurface";
import { create } from "zustand";
import createSelectors from "./auto-selector";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

export type xChannel = "R" | "G" | "B";

export type yChannel = xChannel;

export type MixBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity"
  | "plus-darker"
  | "plus-lighter";

interface SettingsActions {
  getSettings: () => SettingStates;
  setBrightness: (brightness: number) => void;
  setOpacity: (opacity: number) => void;
  setBlur: (blur: number) => void;
  setDisplace: (displace: number) => void;
  setBackgroundOpacity: (backgroundOpacity: number) => void;
  setSaturation: (saturation: number) => void;
  setDistortionScale: (distortionScale: number) => void;
  setRedOffset: (redOffset: number) => void;
  setGreenOffset: (greenOffset: number) => void;
  setBlueOffset: (blueOffset: number) => void;

  setBorderRadius: (borderRadius: number) => void;
  setBorderWidth: (borderWidth: number) => void;
  setXChannel: (xChannel: "R" | "G" | "B") => void;
  setYChannel: (yChannel: "R" | "G" | "B") => void;
  setMixBlendMode: (
    mixBlendMode:
      | "normal"
      | "multiply"
      | "screen"
      | "overlay"
      | "darken"
      | "lighten"
      | "color-dodge"
      | "color-burn"
      | "hard-light"
      | "soft-light"
      | "difference"
      | "exclusion"
      | "hue"
      | "saturation"
      | "color"
      | "luminosity"
      | "plus-darker"
      | "plus-lighter"
  ) => void;

  onReset: () => void;
}
export type SettingStates = Omit<
  GlassSurfaceProps,
  "children" | "className" | "style" | "childClassName" | "width" | "height"
> & {};

export const defaultSettings: SettingStates = {
  borderRadius: 20,
  borderWidth: 0.07,
  brightness: 50,
  opacity: 0.93,
  blur: 11,
  displace: 0,
  backgroundOpacity: 0,
  saturation: 1,
  distortionScale: -180,
  redOffset: 0,
  greenOffset: 10,
  blueOffset: 20,
  xChannel: "R",
  yChannel: "G",
  mixBlendMode: "difference",
};

export const useSettingsGlassSurface = createWithEqualityFn<
  SettingStates & SettingsActions
>()(
  persist(
    immer((set, get) => {
      return {
        ...defaultSettings,
        getSettings: () => get(),

        onReset: () => set(defaultSettings),
        setBrightness: (value) =>
          set((state) => {
            state.brightness = value;
          }),
        setOpacity: (value) =>
          set((state) => {
            state.opacity = value;
          }),
        setBlur: (value) =>
          set((state) => {
            state.blur = value;
          }),
        setDisplace: (value) =>
          set((state) => {
            state.displace = value;
          }),
        setBackgroundOpacity: (value) =>
          set((state) => {
            state.backgroundOpacity = value;
          }),
        setSaturation: (value) =>
          set((state) => {
            state.saturation = value;
          }),
        setDistortionScale: (value) =>
          set((state) => {
            state.distortionScale = value;
          }),
        setRedOffset: (value) =>
          set((state) => {
            state.redOffset = value;
          }),
        setGreenOffset: (value) =>
          set((state) => {
            state.greenOffset = value;
          }),
        setBlueOffset: (value) =>
          set((state) => {
            state.blueOffset = value;
          }),
        setXChannel: (value) =>
          set((state) => {
            state.xChannel = value;
          }),
        setYChannel: (value) =>
          set((state) => {
            state.yChannel = value;
          }),
        setMixBlendMode: (value) =>
          set((state) => {
            state.mixBlendMode = value;
          }),
        setBorderRadius: (value) =>
          set((state) => {
            state.borderRadius = value;
          }),
        setBorderWidth: (value) =>
          set((state) => {
            state.borderWidth = value;
          }),
      };
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useSettingsGlassSurfaceSelectors = createSelectors(
  useSettingsGlassSurface
);
