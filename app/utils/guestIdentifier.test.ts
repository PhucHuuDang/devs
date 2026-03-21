import Cookies from "js-cookie";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  COOKIE_EXPIRY,
  getGuestId,
  getOrCreateGuestIdentifier,
  GUEST_ID_COOKIE,
  hasGuestIdentifier,
  refreshGuestIdentifier,
} from "./guestIdentifier";

// Mock js-cookie
vi.mock("js-cookie", () => {
  const store: Record<string, string> = {};
  return {
    default: {
      get: vi.fn((key: string) => store[key]),
      set: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      remove: vi.fn((key: string) => {
        delete store[key];
      }),
    },
  };
});

// Mock uuid
vi.mock("uuid", () => ({
  v4: vi.fn(() => "mock-uuid-1234"),
}));

describe("guestIdentifier", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("constants", () => {
    it("exports correct cookie name", () => {
      expect(GUEST_ID_COOKIE).toBe("guest_id");
    });

    it("exports correct cookie expiry", () => {
      expect(COOKIE_EXPIRY).toBe(365);
    });
  });

  describe("getOrCreateGuestIdentifier", () => {
    it("creates a new guest ID when no cookie exists", () => {
      vi.mocked(Cookies.get).mockReturnValue(undefined as any);

      const result = getOrCreateGuestIdentifier();

      expect(result).toBe("mock-uuid-1234");
      expect(Cookies.set).toHaveBeenCalledWith(
        "guest_id",
        "mock-uuid-1234",
        expect.objectContaining({
          expires: 365,
          sameSite: "lax",
          path: "/",
        }),
      );
    });

    it("returns existing guest ID when cookie exists", () => {
      vi.mocked(Cookies.get).mockReturnValue("existing-guest-id" as any);

      const result = getOrCreateGuestIdentifier();

      expect(result).toBe("existing-guest-id");
      expect(Cookies.set).not.toHaveBeenCalled();
    });
  });

  describe("getGuestId", () => {
    it("returns the guest ID from cookie", () => {
      vi.mocked(Cookies.get).mockReturnValue("some-guest-id" as any);

      expect(getGuestId()).toBe("some-guest-id");
    });

    it("returns undefined when no cookie exists", () => {
      vi.mocked(Cookies.get).mockReturnValue(undefined as any);

      expect(getGuestId()).toBeUndefined();
    });
  });

  describe("refreshGuestIdentifier", () => {
    it("removes existing cookie and creates a new one", async () => {
      vi.mocked(Cookies.get).mockReturnValue(undefined as any);

      await refreshGuestIdentifier();

      expect(Cookies.remove).toHaveBeenCalledWith("guest_id");
      expect(Cookies.set).toHaveBeenCalled();
    });
  });

  describe("hasGuestIdentifier", () => {
    it("returns true when cookie exists", () => {
      vi.mocked(Cookies.get).mockReturnValue("some-id" as any);

      expect(hasGuestIdentifier()).toBe(true);
    });

    it("returns false when cookie does not exist", () => {
      vi.mocked(Cookies.get).mockReturnValue(undefined as any);

      expect(hasGuestIdentifier()).toBe(false);
    });
  });
});
