import { describe, expect, it } from "vitest";

import { signInSchema } from "./use-sign-in";

// Password must be 8-20 chars, with uppercase, lowercase, digit, and special char
const VALID_PASSWORD = "Test@123";

describe("signInSchema", () => {
  it("validates correct sign-in data", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: VALID_PASSWORD,
      rememberMe: false,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    const result = signInSchema.safeParse({
      email: "not-an-email",
      password: VALID_PASSWORD,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find(
        (issue) => issue.path[0] === "email",
      );
      expect(emailError).toBeDefined();
    }
  });

  it("rejects empty email", () => {
    const result = signInSchema.safeParse({
      email: "",
      password: VALID_PASSWORD,
    });

    expect(result.success).toBe(false);
  });

  it("rejects short passwords (less than 8 characters)", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "Ab1!",
    });

    expect(result.success).toBe(false);
  });

  it("rejects passwords without uppercase letter", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "test@123456",
    });

    expect(result.success).toBe(false);
  });

  it("rejects passwords without special character", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "Test12345",
    });

    expect(result.success).toBe(false);
  });

  it("accepts password with exactly 8 characters meeting all rules", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "Te$t1234",
    });

    expect(result.success).toBe(true);
  });

  it("rememberMe defaults to false when omitted", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: VALID_PASSWORD,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rememberMe).toBe(false);
    }
  });

  it("accepts rememberMe as true", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: VALID_PASSWORD,
      rememberMe: true,
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.rememberMe).toBe(true);
    }
  });
});
