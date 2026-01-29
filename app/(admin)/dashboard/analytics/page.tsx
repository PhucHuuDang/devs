"use client";

import React from "react";

import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  generateMockAnalytics,
  generateMockCategoryAnalytics,
} from "@/mock/admin";

const viewsChartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--muted-foreground))",
  },
};

const categoryChartConfig = {
  posts: {
    label: "Posts",
    color: "hsl(var(--primary))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--muted-foreground))",
  },
};

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState<string>("30");

  // Mock data - in real app, fetch based on date range
  const analyticsData = React.useMemo(
    () => generateMockAnalytics(parseInt(dateRange)),
    [dateRange],
  );
  const categoryData = React.useMemo(() => generateMockCategoryAnalytics(), []);

  // Calculate totals
  const totals = React.useMemo(() => {
    return analyticsData.reduce(
      (acc, day) => ({
        views: acc.views + day.views,
        visitors: acc.visitors + day.visitors,
        posts: acc.posts + day.posts,
      }),
      { views: 0, visitors: 0, posts: 0 },
    );
  }, [analyticsData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your platform&apos;s performance.
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Views</CardDescription>
            <CardTitle className="text-3xl">
              {totals.views.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Visitors</CardDescription>
            <CardTitle className="text-3xl">
              {totals.visitors.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Posts</CardDescription>
            <CardTitle className="text-3xl">{totals.posts}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Views Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Views Over Time</CardTitle>
          <CardDescription>
            Daily views and unique visitors for the selected period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={viewsChartConfig} className="h-[350px]">
            <AreaChart
              data={analyticsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-views)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-views)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-visitors)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-visitors)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => format(new Date(value), "MMM d")}
                className="text-xs"
              />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--color-views)"
                fillOpacity={1}
                fill="url(#colorViews)"
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--color-visitors)"
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Posts by Category</CardTitle>
          <CardDescription>
            Distribution of posts and views across categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={categoryChartConfig} className="h-[300px]">
            <BarChart
              data={categoryData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={true}
                vertical={false}
              />
              <XAxis type="number" className="text-xs" />
              <YAxis
                dataKey="category"
                type="category"
                className="text-xs"
                width={80}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="posts"
                fill="var(--color-posts)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
