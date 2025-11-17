# PWA Manifest Quick Start

## ✅ What's Done

Your PWA manifest has been created at `app/manifest.ts`!

Next.js will automatically:
- Generate `/manifest.webmanifest` at build time
- Link it in your pages
- Enable PWA installation

## 🚀 Quick Setup (3 Steps)

### Step 1: Generate Icons

**Option A: Using the provided script**

```bash
# Install sharp (image processing library)
npm install sharp --save-dev

# Generate all required icons
npm run generate:icons
```

**Option B: Manual creation**

Create these files in `/public`:
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)
- `apple-icon.png` (180×180)

Use online tools like:
- https://realfavicongenerator.net/
- https://favicon.io/

### Step 2: Test Your PWA

```bash
# Build and start
npm run build
npm start

# View manifest
# Visit: http://localhost:3000/manifest.webmanifest
```

### Step 3: Test Installation

**Desktop (Chrome/Edge):**
1. Visit your site
2. Look for install icon in address bar (⊕)
3. Click to install

**Mobile (Android):**
1. Open in Chrome
2. Menu → "Add to Home Screen"

**Mobile (iOS):**
1. Open in Safari
2. Share button → "Add to Home Screen"

## 📋 Configuration Checklist

### Required ✅

- [x] ✅ `manifest.ts` created
- [ ] ❌ Generate `icon-192.png`
- [ ] ❌ Generate `icon-512.png`
- [ ] ❌ Generate `apple-icon.png`
- [ ] ❌ Test installation on mobile

### Optional 📝

- [ ] Add screenshots to `public/screenshots/`
- [ ] Run Lighthouse PWA audit
- [ ] Add service worker for offline support
- [ ] Configure environment variables
- [ ] Update shortcuts in manifest

## 🎨 Customization

### Update App Name

Edit `app/manifest.ts`:

```typescript
{
  name: "Your App Name",
  short_name: "App",
}
```

### Change Theme Color

```typescript
{
  theme_color: "#your-color",
  background_color: "#your-color",
}
```

### Add/Edit Shortcuts

```typescript
shortcuts: [
  {
    name: "Your Action",
    url: "/your-path",
    icons: [{ src: "/icon.webp", sizes: "192x192" }],
  },
]
```

## 🔍 Testing & Debugging

### Check Manifest

```bash
# After build, visit:
http://localhost:3000/manifest.webmanifest
```

### Run Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"

**Target scores:**
- ✅ Installable
- ✅ PWA Optimized
- ✅ Fast and Reliable (with service worker)

### Verify Icons

```bash
ls -la public/icon-*.png public/apple-icon.png
```

## 🐛 Troubleshooting

### Install prompt not showing?

**Requirements:**
- ✅ HTTPS (or localhost)
- ✅ Valid manifest with icons
- ✅ User visited site at least twice
- ⚠️ Service worker (optional but recommended)

### Icons not loading?

**Check:**
```bash
# Verify files exist
ls -la public/icon-192.png public/icon-512.png

# Check file sizes (should be ~5-50KB)
du -h public/icon-*.png
```

### Manifest not updating?

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Resources

- **Full Guide:** [PWA_SETUP_GUIDE.md](./PWA_SETUP_GUIDE.md)
- **Scripts:** [scripts/README.md](./scripts/README.md)
- **Next.js Docs:** https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
- **PWA Builder:** https://www.pwabuilder.com/

## 🎯 Next Steps

1. **Generate icons** using `npm run generate:icons`
2. **Test installation** on your mobile device
3. **Run Lighthouse** to verify PWA score
4. **Add service worker** for offline support (optional)
5. **Create screenshots** for better app store presentation

## 💡 Tips

- Use high-quality source image (512×512 minimum)
- Test on real devices (not just desktop)
- Enable service worker for better scores
- Add screenshots for app store submission
- Monitor Core Web Vitals for performance

## 🚨 Important Notes

- **HTTPS Required:** PWAs only work on HTTPS (or localhost)
- **Icons Required:** Must have 192px and 512px icons
- **iOS Specific:** Needs `apple-icon.png` for iOS home screen
- **Caching:** May need to clear cache to see updates

---

**Need help?** Check the [PWA_SETUP_GUIDE.md](./PWA_SETUP_GUIDE.md) for detailed instructions.

**Ready to go?** Run `npm run generate:icons` to get started! 🚀

