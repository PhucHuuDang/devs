import { NextRequest, NextResponse } from "next/server";

/**
 * Web Vitals Analytics API Endpoint
 *
 * This endpoint receives Web Vitals metrics from the client
 * and stores them for analysis and monitoring.
 *
 * You can integrate this with:
 * - Your database (PostgreSQL, MongoDB, etc.)
 * - Analytics services (Google Analytics, Vercel Analytics, etc.)
 * - Monitoring tools (DataDog, New Relic, etc.)
 */

interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
  url: string;
  pathname: string;
  userAgent: string;
  timestamp: number;
  connection: string;
  deviceMemory: number | null;
}

// In-memory storage for development (replace with database in production)
const metricsStore: WebVitalMetric[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Support both single metric and batch metrics
    const isBatch = data.batch === true;
    const metrics: WebVitalMetric[] = isBatch ? data.metrics : [data];

    // Validate metrics
    const validMetrics = metrics.filter(
      (metric) => metric.name && metric.value
    );

    if (validMetrics.length === 0) {
      return NextResponse.json(
        { error: "Invalid metric data" },
        { status: 400 }
      );
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `📊 Web Vitals received (${isBatch ? "batch" : "single"}):`,
        validMetrics.map((m) => ({
          name: m.name,
          value: m.value,
          rating: m.rating,
        }))
      );
    }

    // Process each metric
    for (const metric of validMetrics) {
      // Store metric (in production, save to database)
      metricsStore.push({
        ...metric,
        url: data.url || metric.url,
        pathname: data.pathname || metric.pathname,
        userAgent: data.userAgent || metric.userAgent,
        timestamp: data.timestamp || metric.timestamp,
        connection: data.connection || metric.connection,
        deviceMemory: data.deviceMemory ?? metric.deviceMemory,
      });

      // TODO: Save to your database
      // Example with Prisma:
      // await prisma.webVital.create({
      //   data: {
      //     name: metric.name,
      //     value: metric.value,
      //     rating: metric.rating,
      //     pathname: data.pathname || metric.pathname,
      //     userAgent: data.userAgent || metric.userAgent,
      //     timestamp: new Date(data.timestamp || metric.timestamp),
      //   },
      // });

      // Check if metrics are poor and trigger alerts
      if (metric.rating === "poor") {
        await handlePoorMetric({
          ...metric,
          pathname: data.pathname || metric.pathname,
          timestamp: data.timestamp || metric.timestamp,
        });
      }
    }

    // TODO: Send to external analytics (optional)
    // await sendToDatadog(validMetrics);
    // await sendToNewRelic(validMetrics);

    return NextResponse.json(
      {
        success: true,
        processed: validMetrics.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing web vitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pathname = searchParams.get("pathname");
    const metric = searchParams.get("metric");

    let filteredMetrics = [...metricsStore];

    // Filter by pathname
    if (pathname) {
      filteredMetrics = filteredMetrics.filter((m) => m.pathname === pathname);
    }

    // Filter by metric name
    if (metric) {
      filteredMetrics = filteredMetrics.filter((m) => m.name === metric);
    }

    // Calculate statistics
    const stats = calculateStats(filteredMetrics);

    return NextResponse.json({
      metrics: filteredMetrics.slice(-100), // Last 100 metrics
      stats,
      total: filteredMetrics.length,
    });
  } catch (error) {
    console.error("Error fetching web vitals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Calculate statistics for metrics
 */
function calculateStats(metrics: WebVitalMetric[]) {
  if (metrics.length === 0) {
    return null;
  }

  const groupedByName = metrics.reduce((acc, metric) => {
    if (!acc[metric.name]) {
      acc[metric.name] = [];
    }
    acc[metric.name].push(metric.value);
    return acc;
  }, {} as Record<string, number[]>);

  const stats: Record<string, any> = {};

  for (const [name, values] of Object.entries(groupedByName)) {
    const sorted = values.sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const p75 = sorted[Math.floor(sorted.length * 0.75)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];

    stats[name] = {
      count: values.length,
      average: Math.round(avg),
      median: Math.round(median),
      p75: Math.round(p75),
      p95: Math.round(p95),
      min: Math.round(Math.min(...values)),
      max: Math.round(Math.max(...values)),
    };
  }

  return stats;
}

/**
 * Handle poor metrics - send alerts, log issues, etc.
 */
async function handlePoorMetric(metric: WebVitalMetric) {
  // Log poor metrics for monitoring
  console.warn(`⚠️ Poor ${metric.name} detected:`, {
    value: metric.value,
    pathname: metric.pathname,
    timestamp: new Date(metric.timestamp).toISOString(),
  });

  // TODO: Send alerts via email, Slack, etc.
  // if (metric.name === "LCP" && metric.value > 4000) {
  //   await sendSlackAlert(
  //     `🚨 Critical: LCP is ${metric.value}ms on ${metric.pathname}`
  //   );
  // }

  // TODO: Track in error monitoring
  // if (typeof Sentry !== "undefined") {
  //   Sentry.captureMessage(`Poor Web Vital: ${metric.name}`, {
  //     level: "warning",
  //     extra: metric,
  //   });
  // }
}
