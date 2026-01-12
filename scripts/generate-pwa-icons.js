#!/usr/bin/env node

/**
 * PWA Icon Generator Script
 *
 * Generates all required PWA icons from a source image.
 *
 * Usage:
 *   node scripts/generate-pwa-icons.js
 *
 * Requirements:
 *   - sharp package (npm install sharp --save-dev)
 *   - Source image: public/icon.webp
 */

const fs = require("fs");
const path = require("path");

const sharp = require("sharp");

// Configuration
const SOURCE_IMAGE = path.join(__dirname, "../public/icon.webp");
const OUTPUT_DIR = path.join(__dirname, "../public");

// Icon sizes to generate
const ICONS = [
  { name: "icon-192.png", size: 192 },
  { name: "icon-512.png", size: 512 },
  { name: "apple-icon.png", size: 180 },
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
];

async function generateIcons() {
  console.log("🎨 PWA Icon Generator\n");

  // Check if source image exists
  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error("❌ Error: Source image not found!");
    console.error(`   Looking for: ${SOURCE_IMAGE}`);
    console.error(
      "\n💡 Tip: Make sure you have icon.webp in your public folder",
    );
    process.exit(1);
  }

  console.log(`📁 Source: ${SOURCE_IMAGE}`);
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);

  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(OUTPUT_DIR, "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log("📁 Created screenshots directory\n");
  }

  let successCount = 0;
  let errorCount = 0;

  // Generate each icon
  for (const icon of ICONS) {
    try {
      const outputPath = path.join(OUTPUT_DIR, icon.name);

      await sharp(SOURCE_IMAGE)
        .resize(icon.size, icon.size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${icon.name}:`, error.message);
      errorCount++;
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log(`✨ Icon generation complete!`);
  console.log(`   Success: ${successCount}/${ICONS.length}`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount}`);
  }
  console.log("=".repeat(50));

  // Next steps
  console.log("\n📋 Next Steps:\n");
  console.log("1. ✅ Icons generated successfully");
  console.log("2. 📸 Create screenshots (optional):");
  console.log("   - public/screenshots/home-desktop.png (1280x720)");
  console.log("   - public/screenshots/home-mobile.png (750x1334)");
  console.log("3. 🚀 Test your PWA:");
  console.log("   - npm run build");
  console.log("   - npm start");
  console.log("   - Visit: http://localhost:3000/manifest.webmanifest");
  console.log("4. 🔍 Run Lighthouse audit in Chrome DevTools");
  console.log(
    "\n💡 Tip: Take screenshots of your app and add them to public/screenshots/",
  );
  console.log("         for better app store presentation!\n");
}

// Run the generator
generateIcons().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});
