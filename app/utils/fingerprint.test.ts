import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "js-cookie";
import { describe, expect, it, vi, beforeEach } from "vitest";

import {
  getFingerprint,
  getGuestIdentifier,
  GUEST_ID_COOKIE,
} from "./fingerprint";

// Mock FingerprintJS
vi.mock("@fingerprintjs/fingerprintjs", () => ({
  default: {
    load: vi.fn(),
  },
}));

// Mock js-cookie
vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

// Mock other utils
vi.mock("./guestIdentifier", () => ({
  getOrCreateGuestIdentifier: vi.fn(),
}));

describe("fingerprint utility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (FingerprintJS.load as any).mockResolvedValue({
      get: vi.fn().mockResolvedValue({ visitorId: "testvisitorid12345678" }),
    });
    vi.stubGlobal("window", {});
  });

  describe("getFingerprint", () => {
    it("returns visitorId when called in browser", async () => {
      // Mock window
      vi.stubGlobal("window", {});

      const result = await getFingerprint();
      expect(result).toBe("testvisitorid12345678");
    });

    it("throws error when called on server", async () => {
      vi.stubGlobal("window", undefined);
      await expect(getFingerprint()).rejects.toThrow(
        "getFingerprint() just be called in client side!",
      );
    });
  });

  describe("getGuestIdentifier", () => {
    it("returns cached ID if it exists", async () => {
      (Cookies.get as any).mockReturnValue("cached-id");
      const result = await getGuestIdentifier();
      expect(result).toBe("cached-id");
      expect(Cookies.get).toHaveBeenCalledWith(GUEST_ID_COOKIE);
    });

    it("generates and sets new ID if none cached", async () => {
      (Cookies.get as any).mockReturnValue(undefined);
      vi.stubGlobal("window", {});

      const result = await getGuestIdentifier();
      expect(result).toBe("testvisitorid12345678");
      expect(Cookies.set).toHaveBeenCalledWith(
        GUEST_ID_COOKIE,
        "testvisitorid12345678",
        expect.any(Object),
      );
    });

    it("uses fallback UUID if fingerprinting fails", async () => {
      (Cookies.get as any).mockReturnValue(undefined);
      (FingerprintJS.load as any).mockRejectedValue(new Error("Failed"));

      const result = await getGuestIdentifier();
      expect(result).toMatch(/^[0-9a-f-]{36}$/); // matches UUID format
      expect(Cookies.set).toHaveBeenCalled();
    });
  });
});
