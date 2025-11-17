# PWA Setup Guide for DEVS

## Overview

Your project now has a Progressive Web App (PWA) manifest configured! This enables users to install your site as an app on their devices.

## What's Included

### 1. **manifest.ts File**

Located at: `app/manifest.ts`

This file defines:
- ✅ App name and description
- ✅ Display mode (standalone - looks like native app)
- ✅ Theme colors (dark theme)
- ✅ Icons for different devices
- ✅ App shortcuts (quick actions)
- ✅ Categories for app stores

### 2. **Automatic Integration**

Next.js automatically:
- Generates `/manifest.webmanifest` at build time
- Links it in the `<head>` of your pages
- Handles all PWA manifest requirements

## Required Assets

To complete your PWA setup, you need to create these icon files in the `/public` directory:

### Icons Checklist

```bash
public/
├── icon.webp              # ✅ Already exists
├── icon-192.png           # ❌ Need to create (192x192)
├── icon-512.png           # ❌ Need to create (512x512)
├── apple-icon.png         # ❌ Need to create (180x180)
└── screenshots/           # ❌ Optional but recommended
    ├── home-desktop.png   # (1280x720)
    └── home-mobile.png    # (750x1334)
```

### Creating Icons

#### Option 1: Using your existing icon.webp

```bash
# Install ImageMagick (if not already installed)
brew install imagemagick  # macOS
# or
sudo apt-get install imagemagick  # Linux

# Convert and resize
convert public/icon.webp -resize 192x192 public/icon-192.png
convert public/icon.webp -resize 512x512 public/icon-512.png
convert public/icon.webp -resize 180x180 public/apple-icon.png
```

#### Option 2: Using Online Tools

1. **RealFaviconGenerator**: https://realfavicongenerator.net/
   - Upload your icon
   - Generate all sizes automatically
   - Download and place in `/public`

2. **Favicon.io**: https://favicon.io/
   - Simple and fast
   - Generates all required sizes

3. **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
   - PWA-specific tool
   - Creates all PWA icons and splash screens

#### Option 3: Quick Script

Create a script in your project:

```typescript
// scripts/generate-icons.ts
import sharp from 'sharp';

const sizes = [192, 512, 180];
const inputIcon = 'public/icon.webp';

sizes.forEach(async (size) => {
  const filename = size === 180 ? 'apple-icon.png' : `icon-${size}.png`;
  await sharp(inputIcon)
    .resize(size, size)
    .png()
    .toFile(`public/${filename}`);
  console.log(`✅ Created ${filename}`);
});
```

Run with:
```bash
npm install sharp --save-dev
npx tsx scripts/generate-icons.ts
```

## PWA Configuration Options

### Current Configuration

```typescript
// app/manifest.ts
{
  display: "standalone",        // Looks like native app
  theme_color: "#000000",       // Dark theme
  background_color: "#000000",  // Loading background
  orientation: "portrait-primary"
}
```

### Display Modes

| Mode | Description | Status Bar | Navigation |
|------|-------------|------------|------------|
| `fullscreen` | No browser UI at all | Hidden | Hidden |
| `standalone` | Native app look | Visible | Hidden |
| `minimal-ui` | Minimal browser UI | Visible | Minimal |
| `browser` | Regular browser | Visible | Full |

**Recommended:** `standalone` (current setting)

### Theme Colors

Update to match your brand:

```typescript
// For light theme
theme_color: "#ffffff",
background_color: "#ffffff",

// For dark theme (current)
theme_color: "#000000",
background_color: "#000000",

// For branded theme
theme_color: "#your-brand-color",
background_color: "#your-brand-color",
```

### Shortcuts

Current shortcuts:
1. **Browse Blogs** → `/blogs`
2. **Create Blog** → `/create-blog`

Add more shortcuts:

```typescript
shortcuts: [
  {
    name: "My Profile",
    url: "/profile",
    icons: [{ src: "/icon.webp", sizes: "192x192" }],
  },
  {
    name: "Notifications",
    url: "/notifications",
    icons: [{ src: "/icon.webp", sizes: "192x192" }],
  },
  // ... up to 4 shortcuts recommended
]
```

## Testing Your PWA

### 1. Development Testing

```bash
npm run dev
```

Visit `http://localhost:3000/manifest.webmanifest` to see generated manifest.

### 2. Production Testing

```bash
npm run build
npm start
```

### 3. Chrome DevTools Audit

1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select **Progressive Web App**
4. Click **Generate report**

You should see:
- ✅ Installable
- ✅ PWA Optimized
- ✅ Valid manifest

### 4. Install Test

**Desktop (Chrome):**
1. Visit your site
2. Look for install icon in address bar
3. Click to install

**Mobile (Android):**
1. Visit site in Chrome
2. Tap "Add to Home Screen"
3. App appears on home screen

**Mobile (iOS):**
1. Visit site in Safari
2. Tap Share button
3. Select "Add to Home Screen"

## Advanced PWA Features

### 1. Offline Support (Service Worker)

Next.js doesn't include a service worker by default. To add offline support:

```bash
npm install next-pwa
```

```javascript
// next.config.ts
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // your existing config
});
```

### 2. Push Notifications

Add to manifest:

```typescript
{
  gcm_sender_id: "YOUR_SENDER_ID",
  gcm_user_visible_only: true,
}
```

### 3. Share Target

Allow other apps to share content to your app:

```typescript
share_target: {
  action: "/share",
  method: "POST",
  enctype: "multipart/form-data",
  params: {
    title: "title",
    text: "text",
    url: "url",
  },
}
```

Create handler:

```typescript
// app/share/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get('title');
  const text = formData.get('text');
  const url = formData.get('url');
  
  // Handle shared content
  // Redirect to create blog with pre-filled data
  return Response.redirect(`/create-blog?title=${title}`);
}
```

### 4. File Handling

Allow your PWA to open specific file types:

```typescript
file_handlers: [
  {
    action: "/open-markdown",
    accept: {
      "text/markdown": [".md", ".markdown"],
    },
  },
]
```

## SEO & Discoverability

### Update layout.tsx

Already configured! ✅ Your layout includes:
- Theme color meta tag (auto-generated from manifest)
- Apple mobile web app capable
- Mobile viewport settings

### Additional Meta Tags

Add to `app/layout.tsx` if needed:

```tsx
<head>
  {/* PWA specific meta tags */}
  <meta name="application-name" content="DEVS" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="DEVS" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="msapplication-TileColor" content="#000000" />
  <meta name="msapplication-tap-highlight" content="no" />
</head>
```

## PWA Checklist

### Essential (Required)

- [x] ✅ Create `manifest.ts` file
- [ ] ❌ Create `icon-192.png` (192x192)
- [ ] ❌ Create `icon-512.png` (512x512)
- [ ] ❌ Create `apple-icon.png` (180x180)
- [x] ✅ Set proper theme colors
- [x] ✅ Configure display mode

### Recommended

- [ ] ⚠️ Add screenshots for app stores
- [ ] ⚠️ Test installation on mobile devices
- [ ] ⚠️ Run Lighthouse PWA audit
- [ ] ⚠️ Add service worker for offline support
- [ ] ⚠️ Configure shortcuts for quick actions

### Optional

- [ ] 📝 Add push notifications
- [ ] 📝 Configure share target
- [ ] 📝 Add file handlers
- [ ] 📝 Create splash screens
- [ ] 📝 Add related applications

## Common Issues

### 1. Manifest not showing

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### 2. Install prompt not appearing

**Requirements:**
- HTTPS (or localhost for testing)
- Valid manifest with icons
- Service worker (optional but recommended)
- User engagement (visited site at least twice)

### 3. Icons not displaying

**Check:**
- Icon files exist in `/public`
- Correct file extensions (.png, .webp)
- Proper sizes (192x192, 512x512)
- Valid image format

### 4. iOS not showing "Add to Home Screen"

**iOS Requirements:**
- Must use Safari
- Need `apple-icon.png` (180x180)
- Add Apple-specific meta tags

## Performance Impact

### Bundle Size
- Manifest: ~2KB (minimal impact)
- Icons: Cached after first visit
- No JavaScript overhead

### Load Time
- Manifest loads asynchronously
- Icons load on-demand
- Zero impact on initial page load

### Benefits
- ✅ Faster perceived performance (standalone mode)
- ✅ Offline capability (with service worker)
- ✅ Push notifications support
- ✅ Better mobile UX
- ✅ Installable on all platforms

## Resources

- [Next.js Manifest Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest)
- [MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [Workbox (Service Worker)](https://developers.google.com/web/tools/workbox)

## Next Steps

1. **Create the required icon files** (see "Creating Icons" section)
2. **Test installation** on your mobile device
3. **Run Lighthouse audit** to verify PWA score
4. **Add service worker** for offline support (optional)
5. **Submit to app stores** if desired

---

Your PWA manifest is configured and ready! Just add the icon files to complete the setup. 🚀

