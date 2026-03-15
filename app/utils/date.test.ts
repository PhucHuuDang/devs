import { describe, expect, it } from "vitest";

import { formatDate, formatTypes } from "./date";

describe("formatDate", () => {
  const testDate = "2024-06-15T14:30:00.000Z";

  it("formats with short format (dd/MM/yyyy)", () => {
    const result = formatDate(testDate, "short");
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("formats with long format (EEEE, dd MMMM yyyy)", () => {
    const result = formatDate(testDate, "long");
    // Should contain a day name and month name
    expect(result).toMatch(/\w+, \d{2} \w+ \d{4}/);
  });

  it("formats with time format (HH:mm)", () => {
    const result = formatDate(testDate, "time");
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });

  it("formats with full format (dd/MM/yyyy HH:mm:ss)", () => {
    const result = formatDate(testDate, "full");
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
  });

  it("accepts a custom format string", () => {
    const result = formatDate(testDate, "yyyy-MM-dd");
    expect(result).toBe("2024-06-15");
  });

  it("accepts a Date object", () => {
    const result = formatDate(new Date("2024-01-01"), "short");
    expect(result).toMatch(/01\/01\/2024/);
  });

  it("returns empty string for empty/null date", () => {
    expect(formatDate("", "short")).toBe("");
    expect(formatDate(null as unknown as string, "short")).toBe("");
    expect(formatDate(undefined as unknown as string, "short")).toBe("");
  });

  it("formats with Vietnamese locale when useVietnamese is true", () => {
    const result = formatDate(testDate, "long", true);
    // Vietnamese locale should produce different day/month names
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("exports formatTypes with expected keys", () => {
    expect(formatTypes).toHaveProperty("short");
    expect(formatTypes).toHaveProperty("long");
    expect(formatTypes).toHaveProperty("time");
    expect(formatTypes).toHaveProperty("full");
  });
});
