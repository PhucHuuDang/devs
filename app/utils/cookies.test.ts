import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { describe, expect, it, vi, beforeEach } from "vitest";

import { fetchGraphql } from "@/lib/graph-fetch";

import {
  getAuthCookies,
  setAuthCookies,
  deleteCookies,
  getSession,
  requireAuth,
} from "./cookies";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

// Mock graph-fetch
vi.mock("@/lib/graph-fetch", () => ({
  fetchGraphql: vi.fn(),
}));

describe("cookies utility", () => {
  const mockCookieStore = {
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (cookies as any).mockReturnValue(Promise.resolve(mockCookieStore));
  });

  it("getSession fetches session data", async () => {
    const mockData = { getSession: { success: true, message: "OK" } };
    (fetchGraphql as any).mockResolvedValue(mockData);

    const result = await getSession();
    expect(result).toEqual(mockData.getSession);
  });

  it("requireAuth redirects if no user", async () => {
    (fetchGraphql as any).mockResolvedValue({
      getSession: { data: { user: null } },
    });

    await requireAuth();
    expect(redirect).toHaveBeenCalledWith("/auth");
  });

  it("requireAuth returns data if user exists", async () => {
    const mockData = { getSession: { data: { user: { id: "1" } } } };
    (fetchGraphql as any).mockResolvedValue(mockData);

    const result = await requireAuth();
    expect(result).toEqual(mockData.getSession);
    expect(redirect).not.toHaveBeenCalled();
  });

  it("getAuthCookies returns tokens from storage", async () => {
    mockCookieStore.get.mockImplementation((name: string) => {
      if (name === "devs:access-token") return { value: "access" };
      if (name === "devs:session-token") return { value: "session" };
      if (name === "devs:refresh-token") return { value: "refresh" };
      return null;
    });

    const result = await getAuthCookies();
    expect(result).toEqual({
      accessToken: "access",
      sessionToken: "session",
      refreshToken: "refresh",
    });
  });

  it("getAuthCookies returns null for missing tokens", async () => {
    mockCookieStore.get.mockReturnValue(null);

    const result = await getAuthCookies();
    expect(result).toEqual({
      accessToken: null,
      sessionToken: null,
      refreshToken: null,
    });
  });

  it("setAuthCookies sets all tokens", async () => {
    await setAuthCookies("access", "session", "refresh");

    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "devs:access-token",
      "access",
      expect.any(Object),
    );
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "devs:session-token",
      "session",
      expect.any(Object),
    );
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "devs:refresh-token",
      "refresh",
      expect.any(Object),
    );
  });

  it("deleteCookies removes all tokens", async () => {
    await deleteCookies();

    expect(mockCookieStore.delete).toHaveBeenCalledWith("devs:access-token");
    expect(mockCookieStore.delete).toHaveBeenCalledWith("devs:session-token");
    expect(mockCookieStore.delete).toHaveBeenCalledWith("devs:refresh-token");
  });

  describe("getSessionData", () => {
    it("returns null values when cookies are missing", async () => {
      mockCookieStore.get.mockReturnValue(null);
      const { getSessionData } = await import("./cookies");
      const result = await getSessionData();
      expect(result).toEqual({ sessionData: null, sessionToken: null });
    });

    it("returns values when cookies exist", async () => {
      mockCookieStore.get.mockImplementation((name: string) => {
        if (name === "") return { value: "data" };
        if (name === "devs:session-token") return { value: "token" };
        return null;
      });
      const { getSessionData } = await import("./cookies");
      const result = await getSessionData();
      expect(result).toEqual({ sessionData: "data", sessionToken: "token" });
    });
  });
});
