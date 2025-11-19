# Web Vitals Configuration Reference

## Quick Configuration Checklist

### 1. Google Analytics Setup (Required)

**File:** `app/layout.tsx`

Replace `G-XXX` with your actual Google Analytics 4 Measurement ID:

```tsx
// Find this in layout.tsx (lines 98-116)
<Script
  strategy="afterInteractive"
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"  // ← Change here
/>

<Script
  id="gtag-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YOUR-ACTUAL-ID', {  // ← And here
        send_page_view: true,
        page_path: window.location.pathname,
      });
    `,
  }}
/>
```

### 2. Enable Development Monitor (Optional)

**File:** `app/layout.tsx`

Add this to see real-time metrics while developing:

```tsx
import { WebVitalsMonitor } from "@/components/common/web-vitals-monitor";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {process.env.NODE_ENV === "development" && <WebVitalsMonitor />}
        {children}
      </body>
    </html>
  );
}
```

### 3. Batch Size Configuration (Optional)

**File:** `components/common/web-vitals.tsx`

Adjust how many metrics are batched before sending:

```tsx
// Line 120 - Default is 5 metrics
if (metricQueue.length >= 5) {
  // ← Change this number
  flushMetrics();
} else {
  flushTimer = setTimeout(flushMetrics, 1000); // ← Or change timeout
}
```

**Recommendations:**

- **High traffic sites:** Use 3-5 metrics (current setting)
- **Low traffic sites:** Use 10 metrics
- **Real-time monitoring:** Use 1 metric (disable batching)

### 4. Custom Thresholds (Optional)

**File:** `components/common/web-vitals.tsx`

Adjust the thresholds for your specific needs:

```tsx
// Lines 33-40 - Google's defaults
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};
```

**Note:** Using Google's defaults is recommended for SEO.

### 5. Package Import Optimization (Optional)

**File:** `next.config.ts`

Add more packages to optimize:

```tsx
experimental: {
  optimizePackageImports: [
    "web-vitals",
    "lucide-react",
    "@radix-ui/*",
    // Add your large packages here
    "lodash",
    "date-fns",
    // etc.
  ],
}
```

## Advanced Configurations

### Database Integration

**File:** `app/api/analytics/web-vitals/route.ts`

Uncomment and configure database storage:

```tsx
// Example with Prisma (lines 76-87)
await prisma.webVital.create({
  data: {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    pathname: data.pathname || metric.pathname,
    userAgent: data.userAgent || metric.userAgent,
    timestamp: new Date(data.timestamp || metric.timestamp),
    connection: data.connection,
    deviceMemory: data.deviceMemory,
  },
});
```

**Database Schema Example:**

```prisma
model WebVital {
  id           String   @id @default(uuid())
  name         String   // LCP, FID, CLS, etc.
  value        Float
  rating       String   // good, needs-improvement, poor
  pathname     String
  userAgent    String
  timestamp    DateTime
  connection   String?
  deviceMemory Int?
  createdAt    DateTime @default(now())

  @@index([name, timestamp])
  @@index([pathname, timestamp])
  @@index([rating, timestamp])
}
```

### External Analytics Integration

**File:** `app/api/analytics/web-vitals/route.ts`

Send metrics to other services:

```tsx
// Lines 99-101
// TODO: Send to external analytics (optional)
await sendToDatadog(validMetrics);
await sendToNewRelic(validMetrics);
await sendToSentry(validMetrics);
```

**Example Implementations:**

```typescript
// DataDog
async function sendToDatadog(metrics: WebVitalMetric[]) {
  const { StatsD } = await import("hot-shots");
  const dogstatsd = new StatsD();

  for (const metric of metrics) {
    dogstatsd.histogram(
      `webvitals.${metric.name.toLowerCase()}`,
      metric.value,
      {
        tags: [`rating:${metric.rating}`, `pathname:${metric.pathname}`],
      }
    );
  }
}

// Sentry
async function sendToSentry(metrics: WebVitalMetric[]) {
  const Sentry = await import("@sentry/nextjs");

  for (const metric of metrics) {
    if (metric.rating === "poor") {
      Sentry.captureMessage(`Poor Web Vital: ${metric.name}`, {
        level: "warning",
        extra: metric,
      });
    }
  }
}

// Custom Webhook
async function sendToSlack(metrics: WebVitalMetric[]) {
  const poorMetrics = metrics.filter((m) => m.rating === "poor");

  if (poorMetrics.length > 0) {
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: "POST",
      body: JSON.stringify({
        text: `⚠️ Poor Web Vitals detected:\n${poorMetrics
          .map((m) => `• ${m.name}: ${m.value} on ${m.pathname}`)
          .join("\n")}`,
      }),
    });
  }
}
```

### Custom Metric Handlers

**File:** `components/common/web-vitals.tsx`

Add custom logic for specific metrics:

```tsx
const handleMetric = useCallback((metric: any) => {
  // ... existing code ...

  // Custom handlers
  if (metric.name === "LCP" && metric.value > 4000) {
    console.error("Critical: LCP is over 4 seconds!");
    // Send alert, trigger notification, etc.
  }

  if (metric.name === "CLS" && metric.value > 0.25) {
    console.warn("Layout shift detected. Check your components.");
  }

  // Track specific routes
  if (window.location.pathname.startsWith("/blog/")) {
    // Special handling for blog posts
    sendToBlogAnalytics(metric);
  }
}, []);
```

### Environment-Specific Configuration

**File:** `components/common/web-vitals.tsx`

Different behavior per environment:

```tsx
// Disable in test environments
if (process.env.NODE_ENV === "test") {
  return null;
}

// More verbose logging in staging
const isDevelopment = process.env.NODE_ENV === "development";
const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";

if (isDevelopment || isStaging) {
  logMetricToConsole(enhancedMetric);
}

// Only send to external services in production
if (process.env.NODE_ENV === "production") {
  sendToAnalyticsAPI(enhancedMetric);
}
```

## Configuration Matrix

| Feature       | Default          | Conservative | Aggressive       |
| ------------- | ---------------- | ------------ | ---------------- |
| Batch Size    | 5 metrics        | 10 metrics   | 2 metrics        |
| Flush Timeout | 1000ms           | 2000ms       | 500ms            |
| GA Strategy   | afterInteractive | lazyOnload   | afterInteractive |
| Font Preload  | true             | false        | true             |
| Source Maps   | false            | true (dev)   | false            |

## Performance Presets

### Development Preset

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ["web-vitals"],
  clientSegmentCache: false,  // Easier debugging
  prerenderEarlyExit: false,
},
productionBrowserSourceMaps: true,
```

### Production Preset (Current)

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ["web-vitals", "lucide-react", "@radix-ui/*"],
  clientSegmentCache: true,
  prerenderEarlyExit: true,
},
productionBrowserSourceMaps: false,
compress: true,
```

### High-Performance Preset

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: ["web-vitals", "lucide-react", "@radix-ui/*", "framer-motion"],
  clientSegmentCache: true,
  prerenderEarlyExit: true,
  optimizeCss: true,
},
productionBrowserSourceMaps: false,
compress: true,
swcMinify: true,
```

## Testing Your Configuration

### 1. Local Development

```bash
npm run dev
# Open http://localhost:3000
# Check browser console for metrics
```

### 2. Production Build

```bash
npm run build
npm start
# Run Lighthouse audit
```

### 3. API Testing

```bash
# Test single metric
curl -X POST http://localhost:3000/api/analytics/web-vitals \
  -H "Content-Type: application/json" \
  -d '{"name":"LCP","value":1500,"rating":"good","id":"test-1","delta":1500,"navigationType":"navigate"}'

# Test batch metrics
curl -X POST http://localhost:3000/api/analytics/web-vitals \
  -H "Content-Type: application/json" \
  -d '{"batch":true,"metrics":[{"name":"LCP","value":1500,"rating":"good"},{"name":"FCP","value":1200,"rating":"good"}],"url":"http://localhost:3000","pathname":"/"}'

# Retrieve metrics
curl http://localhost:3000/api/analytics/web-vitals?pathname=/
```

## Common Configurations

### Disable Analytics in Development

```tsx
// components/common/web-vitals.tsx
function sendToAnalyticsAPI(metric: Metric) {
  if (process.env.NODE_ENV === "development") return;
  // ... rest of the code
}
```

### Track Custom Events

```tsx
// Add custom tracking
if (metric.name === "LCP") {
  window.dataLayer?.push({
    event: "lcp_measurement",
    lcp_value: metric.value,
    lcp_rating: metric.rating,
  });
}
```

### Session-Based Tracking

```tsx
// Track metrics per session
const sessionId = sessionStorage.getItem("sessionId") || crypto.randomUUID();
sessionStorage.setItem("sessionId", sessionId);

// Include in metric payload
const body = JSON.stringify({
  ...metric,
  sessionId, // ← Add session tracking
});
```

## Troubleshooting

### Metrics Not Batching

- Check `metricQueue` is being populated
- Verify `flushMetrics()` is being called
- Check network tab for batched requests

### GA Not Receiving Events

- Verify GA ID is correct
- Check `window.gtag` exists
- Enable GA debug mode: `?ga_debug=1`

### High Memory Usage

- Reduce batch size
- Decrease flush timeout
- Clear `metricsStore` periodically

### Poor Scores Despite Optimizations

- Run Lighthouse for detailed analysis
- Check for render-blocking resources
- Optimize images and fonts
- Review third-party scripts

---

**Need more help?** Check the [Optimization Guide](./WEB_VITALS_OPTIMIZATION_GUIDE.md)
