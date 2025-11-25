"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Web Vitals Monitor Component
 *
 * A development-only component that displays real-time Web Vitals metrics
 * in a floating panel. Helps developers monitor and improve Core Web Vitals.
 *
 * Usage:
 * Add to your root layout (development only):
 *
 * {process.env.NODE_ENV === 'development' && <WebVitalsMonitor />}
 */

interface Metric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  timestamp: number;
}

const METRIC_INFO = {
  LCP: {
    label: "LCP",
    fullName: "Largest Contentful Paint",
    description: "Loading performance",
    unit: "ms",
    goodThreshold: 2500,
    poorThreshold: 4000,
  },
  FID: {
    label: "FID",
    fullName: "First Input Delay",
    description: "Interactivity",
    unit: "ms",
    goodThreshold: 100,
    poorThreshold: 300,
  },
  CLS: {
    label: "CLS",
    fullName: "Cumulative Layout Shift",
    description: "Visual stability",
    unit: "",
    goodThreshold: 0.1,
    poorThreshold: 0.25,
  },
  FCP: {
    label: "FCP",
    fullName: "First Contentful Paint",
    description: "Initial load",
    unit: "ms",
    goodThreshold: 1800,
    poorThreshold: 3000,
  },
  TTFB: {
    label: "TTFB",
    fullName: "Time to First Byte",
    description: "Server response",
    unit: "ms",
    goodThreshold: 800,
    poorThreshold: 1800,
  },
  INP: {
    label: "INP",
    fullName: "Interaction to Next Paint",
    description: "Responsiveness",
    unit: "ms",
    goodThreshold: 200,
    poorThreshold: 500,
  },
};

export function WebVitalsMonitor() {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({});
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Listen for custom events from the WebVitals component
    const handleMetric = (event: CustomEvent) => {
      const metric = event.detail;
      setMetrics((prev) => ({
        ...prev,
        [metric.name]: metric,
      }));
    };

    window.addEventListener("web-vital" as any, handleMetric);

    return () => {
      window.removeEventListener("web-vital" as any, handleMetric);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[99999] max-w-md">
      <Card className="border-2 border-gray-700 bg-gray-900/95 p-4 shadow-2xl backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-2 animate-pulse rounded-full bg-green-500" />
            <h3 className="text-sm font-semibold text-white">
              Core Web Vitals Monitor
            </h3>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {isMinimized ? "+" : "−"}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="space-y-2">
            {Object.keys(METRIC_INFO).map((metricName) => {
              const info = METRIC_INFO[metricName as keyof typeof METRIC_INFO];
              const metric = metrics[metricName];

              return <MetricRow key={metricName} info={info} metric={metric} />;
            })}

            <div className="mt-4 border-t border-gray-700 pt-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>SEO Impact</span>
                <span>{calculateSEOScore(metrics)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all"
                  style={{ width: `${calculateSEOScore(metrics)}%` }}
                />
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              💡 Tip: Press F12 to see detailed metrics in console
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function MetricRow({
  info,
  metric,
}: {
  info: (typeof METRIC_INFO)[keyof typeof METRIC_INFO];
  metric?: Metric;
}) {
  if (!metric) {
    return (
      <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-2">
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-400">{info.label}</div>
          <div className="text-[10px] text-gray-600">{info.description}</div>
        </div>
        <Badge variant="outline" className="text-xs text-gray-500">
          Waiting...
        </Badge>
      </div>
    );
  }

  const value =
    info.unit === "ms"
      ? `${Math.round(metric.value)}ms`
      : metric.value.toFixed(3);

  const ratingColors = {
    good: "bg-green-500/20 text-green-400 border-green-500",
    "needs-improvement": "bg-yellow-500/20 text-yellow-400 border-yellow-500",
    poor: "bg-red-500/20 text-red-400 border-red-500",
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-2">
      <div className="flex-1">
        <div className="text-xs font-medium text-white">{info.label}</div>
        <div className="text-[10px] text-gray-500">{info.description}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-white">{value}</div>
        <Badge
          variant="outline"
          className={`text-[10px] ${ratingColors[metric.rating]}`}
        >
          {metric.rating}
        </Badge>
      </div>
    </div>
  );
}

function calculateSEOScore(metrics: Record<string, Metric>): number {
  const coreMetrics = ["LCP", "FID", "CLS"];
  const availableMetrics = coreMetrics.filter((name) => metrics[name]);

  if (availableMetrics.length === 0) return 0;

  const goodCount = availableMetrics.filter(
    (name) => metrics[name].rating === "good"
  ).length;
  const needsImprovementCount = availableMetrics.filter(
    (name) => metrics[name].rating === "needs-improvement"
  ).length;

  // Good = 100%, Needs Improvement = 60%, Poor = 20%
  const score =
    (goodCount * 100 +
      needsImprovementCount * 60 +
      (availableMetrics.length - goodCount - needsImprovementCount) * 20) /
    availableMetrics.length;

  return Math.round(score);
}
