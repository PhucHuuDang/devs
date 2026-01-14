"use client";

import { useSettingsGlassSurfaceSelectors } from "@/stores/use-settings-glass-surface";

/**
 * BorderRadiusDemo
 *
 * A demonstration component showing how the global border radius
 * system works across different components and sizes.
 *
 * This component can be placed anywhere to visualize the current
 * border radius setting.
 */
export function BorderRadiusDemo() {
  const borderRadius =
    useSettingsGlassSurfaceSelectors.use.borderRadius?.() ?? 20;
  const setBorderRadius =
    useSettingsGlassSurfaceSelectors.use.setBorderRadius();

  const presets = [
    { name: "Sharp", value: 0, description: "No rounded corners" },
    { name: "Subtle", value: 4, description: "Barely noticeable" },
    { name: "Modern", value: 8, description: "Clean and modern" },
    { name: "Default", value: 20, description: "Balanced" },
    { name: "Rounded", value: 30, description: "Very rounded" },
    { name: "Extreme", value: 50, description: "Maximum" },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Current Value Display */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Global Border Radius</h2>
        <p className="text-4xl font-bold text-primary">{borderRadius}px</p>
        <p className="text-sm text-muted-foreground mt-1">
          {borderRadius / 16}rem
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => setBorderRadius(preset.value)}
            className={`p-4 rounded-global border-2 transition-all duration-300 hover:scale-105 ${
              borderRadius === preset.value
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="font-semibold">{preset.name}</div>
            <div className="text-sm text-muted-foreground">
              {preset.value}px
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {preset.description}
            </div>
          </button>
        ))}
      </div>

      {/* Visual Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Visual Examples</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Extra Small */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Extra Small (-4px)</p>
            <div className="h-24 bg-primary/20 rounded-global-sm flex items-center justify-center">
              <span className="text-xs">rounded-global-sm</span>
            </div>
          </div>

          {/* Small */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Small (-2px)</p>
            <div className="h-24 bg-blue-500/20 rounded-global-md flex items-center justify-center">
              <span className="text-xs">rounded-global-md</span>
            </div>
          </div>

          {/* Normal */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Normal (base)</p>
            <div className="h-24 bg-green-500/20 rounded-global flex items-center justify-center">
              <span className="text-xs">rounded-global</span>
            </div>
          </div>

          {/* Large */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Large (+4px)</p>
            <div className="h-24 bg-purple-500/20 rounded-global-xl flex items-center justify-center">
              <span className="text-xs">rounded-global-xl</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real Component Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Component Examples</h3>

        <div className="grid gap-4">
          {/* Button */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Button</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-global hover:opacity-90 transition-opacity">
              Click Me
            </button>
          </div>

          {/* Card */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Card</p>
            <div className="rounded-global-lg border border-border p-4 bg-card">
              <h4 className="font-semibold mb-2">Card Title</h4>
              <p className="text-sm text-muted-foreground">
                This card uses the global border radius system and will update
                automatically.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Input Field</p>
            <input
              type="text"
              placeholder="Type something..."
              className="w-full px-4 py-2 rounded-global border border-input bg-background"
            />
          </div>

          {/* Badge */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Badges</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-global text-sm">
                Default
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-700 dark:text-green-300 rounded-global-sm text-sm">
                Success
              </span>
              <span className="px-3 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-global text-sm">
                Error
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Usage Example</h3>
        <div className="rounded-global-lg border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
          <pre>
            {`// Use in your components
<div className="rounded-global">
  Content
</div>

// Different sizes
<div className="rounded-global-sm">Small</div>
<div className="rounded-global-lg">Large</div>

// Or use CSS variable directly
<div style={{ borderRadius: 'var(--radius)' }}>
  Content
</div>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
