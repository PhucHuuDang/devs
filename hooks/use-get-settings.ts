import { useSettingsGlassSurfaceSelectors } from "./use-settings-glass-surface";

export const useGetSettings = () => {
  const settings = {
    borderRadius: useSettingsGlassSurfaceSelectors.use.borderRadius?.(),
    borderWidth: useSettingsGlassSurfaceSelectors.use.borderWidth?.(),
    brightness: useSettingsGlassSurfaceSelectors.use.brightness?.(),
    opacity: useSettingsGlassSurfaceSelectors.use.opacity?.(),
    blur: useSettingsGlassSurfaceSelectors.use.blur?.(),
    displace: useSettingsGlassSurfaceSelectors.use.displace?.(),
    backgroundOpacity:
      useSettingsGlassSurfaceSelectors.use.backgroundOpacity?.(),
    saturation: useSettingsGlassSurfaceSelectors.use.saturation?.(),
    distortionScale: useSettingsGlassSurfaceSelectors.use.distortionScale?.(),
    redOffset: useSettingsGlassSurfaceSelectors.use.redOffset?.(),
    greenOffset: useSettingsGlassSurfaceSelectors.use.greenOffset?.(),
    blueOffset: useSettingsGlassSurfaceSelectors.use.blueOffset?.(),
    xChannel: useSettingsGlassSurfaceSelectors.use.xChannel?.(),
    yChannel: useSettingsGlassSurfaceSelectors.use.yChannel?.(),
    mixBlendMode: useSettingsGlassSurfaceSelectors.use.mixBlendMode?.(),

    defaultSize: useSettingsGlassSurfaceSelectors.use.defaultSize?.(),
    hoveredSize: useSettingsGlassSurfaceSelectors.use.hoveredSize?.(),
  };

  return settings;
};
