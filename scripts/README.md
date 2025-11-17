# Scripts Directory

This directory contains utility scripts for the DEVS project.

## Available Scripts

### 1. `generate-pwa-icons.js`

Generates all required PWA icons from your source image.

**Prerequisites:**
```bash
npm install sharp --save-dev
```

**Usage:**
```bash
node scripts/generate-pwa-icons.js
```

**What it generates:**
- `icon-192.png` - Android icon (192x192)
- `icon-512.png` - Android icon (512x512)
- `apple-icon.png` - iOS icon (180x180)
- `favicon-16x16.png` - Browser favicon (16x16)
- `favicon-32x32.png` - Browser favicon (32x32)

**Source Image:**
- Must be located at: `public/icon.webp`
- Recommended minimum size: 512x512
- Format: Any image format supported by Sharp (PNG, JPG, WEBP, SVG)

## Adding New Scripts

When adding new scripts:

1. **Create the script file** in this directory
2. **Add executable permissions** (if needed):
   ```bash
   chmod +x scripts/your-script.js
   ```
3. **Document it here** in this README
4. **Add to package.json** scripts section if frequently used:
   ```json
   {
     "scripts": {
       "generate-icons": "node scripts/generate-pwa-icons.js"
     }
   }
   ```

## Common Script Patterns

### Node.js Script Template
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Script starting...');
  
  try {
    // Your script logic here
    
    console.log('✅ Success!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
```

### TypeScript Script Template
```typescript
#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';

async function main() {
  console.log('🚀 Script starting...');
  
  try {
    // Your script logic here
    
    console.log('✅ Success!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
```

Run with: `npx tsx scripts/your-script.ts`

## Troubleshooting

### Permission Denied

```bash
chmod +x scripts/your-script.js
```

### Module Not Found

```bash
npm install [missing-package] --save-dev
```

### Script Not Running

Make sure you're in the project root:
```bash
cd /path/to/devs
node scripts/your-script.js
```

