"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useEffect, useRef, useCallback } from "react";

/**
 * Enhanced Web Vitals Component - Optimized
 *
 * Tracks Core Web Vitals for SEO and performance monitoring:
 * - LCP (Largest Contentful Paint) - Loading performance
 * - FID (First Input Delay) - Interactivity
 * - CLS (Cumulative Layout Shift) - Visual stability
 * - FCP (First Contentful Paint) - Initial load
 * - TTFB (Time to First Byte) - Server response time
 * - INP (Interaction to Next Paint) - Responsiveness
 *
 * Optimizations:
 * - Batched metric reporting
 * - Request deduplication
 * - Minimal re-renders
 */

interface Metric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
}

// Core Web Vitals thresholds (Google's recommendations)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint
};

function getRating(
  name: string,
  value: number
): "good" | "needs-improvement" | "poor" {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return "good";

  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

// Optimized: Batch metrics to reduce network requests
const metricQueue: Metric[] = [];
let flushTimer: NodeJS.Timeout | null = null;

function sendToGoogleAnalytics(metric: Metric) {
  if (typeof window === "undefined" || !(window as any).gtag) return;

  // Send to Google Analytics with proper event tracking
  (window as any).gtag("event", metric.name, {
    value: Math.round(
      metric.name === "CLS" ? metric.value * 1000 : metric.value
    ),
    event_label: metric.id,
    event_category: "Web Vitals",
    metric_rating: metric.rating,
    metric_delta: metric.delta,
    non_interaction: true,
  });
}

function flushMetrics() {
  if (metricQueue.length === 0) return;

  const url = "/api/analytics/web-vitals";
  const metrics = [...metricQueue];
  metricQueue.length = 0; // Clear queue

  const body = JSON.stringify({
    metrics,
    batch: true,
    url: window.location.href,
    pathname: window.location.pathname,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    connection: (navigator as any).connection?.effectiveType || "unknown",
    deviceMemory: (navigator as any).deviceMemory || null,
  });

  // Use sendBeacon for reliability (works even if user navigates away)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true, // Keep request alive even if page closes
    }).catch((err) => {
      // Fail silently in production
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to send web vitals:", err);
      }
    });
  }
}

function sendToAnalyticsAPI(metric: Metric) {
  // Add to queue
  metricQueue.push(metric);

  // Clear existing timer
  if (flushTimer) {
    clearTimeout(flushTimer);
  }

  // Flush after 1 second or when queue is full
  if (metricQueue.length >= 5) {
    flushMetrics();
  } else {
    flushTimer = setTimeout(flushMetrics, 1000);
  }
}

function logMetricToConsole(metric: Metric) {
  if (process.env.NODE_ENV !== "development") return;

  const emoji = {
    good: "✅",
    "needs-improvement": "⚠️",
    poor: "❌",
  };

  const logs = {
    [`${emoji[metric.rating]} ${metric.name}`]: {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    },
  };

  // console.group(`${emoji[metric.rating]} ${metric.name}`);
  // console.log("Value:", metric.value);
  // console.log("Rating:", metric.rating);
  // console.log("Delta:", metric.delta);
  // console.log("ID:", metric.id);
  // console.groupEnd();

  console.info(logs);
}

export const WebVitals = () => {
  const metricsRef = useRef<Map<string, Metric>>(new Map());
  const reportedMetrics = useRef<Set<string>>(new Set());

  // Memoized metric handler
  const handleMetric = useCallback((metric: any) => {
    // Prevent duplicate reports
    const metricKey = `${metric.name}-${metric.id}`;
    if (reportedMetrics.current.has(metricKey)) return;
    reportedMetrics.current.add(metricKey);

    const enhancedMetric: Metric = {
      ...metric,
      rating: getRating(metric.name, metric.value),
    };

    // Store metric
    metricsRef.current.set(metric.name, enhancedMetric);

    // Dispatch custom event for monitoring component (dev only)
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      window.dispatchEvent(
        new CustomEvent("web-vital", {
          detail: {
            name: metric.name,
            value: metric.value,
            rating: enhancedMetric.rating,
            timestamp: Date.now(),
          },
        })
      );
    }

    // Log in development
    logMetricToConsole(enhancedMetric);

    // Send to Google Analytics (async, non-blocking)
    requestIdleCallback(() => {
      sendToGoogleAnalytics(enhancedMetric);
    });

    // Send to analytics API (batched)
    sendToAnalyticsAPI(enhancedMetric);

    // Warn about poor metrics in development
    if (
      process.env.NODE_ENV === "development" &&
      enhancedMetric.rating === "poor"
    ) {
      console.warn(
        `⚠️ Poor ${metric.name} detected! This may hurt your SEO ranking.`,
        `\nCurrent: ${metric.value}`,
        `\nTarget: < ${
          THRESHOLDS[metric.name as keyof typeof THRESHOLDS]?.good
        }`
      );
    }
  }, []);

  useReportWebVitals(handleMetric);

  // Performance monitoring in development
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const timer = setTimeout(() => {
      const metrics = Array.from(metricsRef.current.values());
      const poorMetrics = metrics.filter((m) => m.rating === "poor");

      if (poorMetrics.length > 0) {
        console.warn(
          "⚠️ Performance Alert: You have poor Core Web Vitals metrics.",
          "\nThese affect your SEO ranking. Check the console for details."
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Flush remaining metrics on unmount
  useEffect(() => {
    return () => {
      flushMetrics();
    };
  }, []);

  return null;
};
