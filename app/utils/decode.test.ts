import { describe, expect, it } from "vitest";

import { decodeData } from "./decode";

// A real JWT-shaped token for testing (header.payload.signature)
// This is a valid base64-encoded JWT structure (not cryptographically valid, but decodable)
const createTestJwt = (payload: Record<string, unknown>): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const signature = "test-signature";
  return `${header}.${body}.${signature}`;
};

describe("decodeData", () => {
  it("decodes a valid JWT token and returns the payload", () => {
    const payload = { sub: "user-123", name: "Test User", iat: 1717000000 };
    const token = createTestJwt(payload);

    const result = decodeData<typeof payload>(token);

    expect(result.sub).toBe("user-123");
    expect(result.name).toBe("Test User");
    expect(result.iat).toBe(1717000000);
  });

  it("throws an error for a string without dots (not a JWT)", () => {
    expect(() => decodeData("not-a-jwt")).toThrow("Not a valid JWT token");
  });

  it("throws an error for an empty string", () => {
    expect(() => decodeData("")).toThrow("Not a valid JWT token");
  });

  it("decodes JWT with complex nested payload", () => {
    const payload = {
      user: { id: 1, roles: ["admin", "user"] },
      exp: 9999999999,
    };
    const token = createTestJwt(payload);

    const result = decodeData<typeof payload>(token);

    expect(result.user.id).toBe(1);
    expect(result.user.roles).toEqual(["admin", "user"]);
    expect(result.exp).toBe(9999999999);
  });
});
