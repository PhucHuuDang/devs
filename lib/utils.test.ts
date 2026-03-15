import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges multiple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(undefined, null as unknown as string)).toBe("");
  });

  it("resolves tailwind class conflicts (last wins)", () => {
    // tailwind-merge should resolve conflicting utilities
    expect(cn("px-4", "px-8")).toBe("px-8");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles conditional classes via clsx", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
    expect(cn("base", true && "visible")).toBe("base visible");
  });

  it("merges array of classes", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("handles object syntax via clsx", () => {
    expect(cn({ hidden: true, flex: false })).toBe("hidden");
    expect(cn("base", { "text-red-500": true })).toBe("base text-red-500");
  });
});
