// utils/fingerprint.ts
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "js-cookie";
import { getOrCreateGuestIdentifier } from "./guestIdentifier";
import { v4 as uuidv4 } from "uuid";

export const GUEST_ID_COOKIE = "guest_id";
export const COOKIE_EXPIRY = 365; // days

let fpPromise: Promise<any> | null = null;

export const getFingerprint = async (visitorId = false) => {
  if (typeof window === "undefined") {
    throw new Error("getFingerprint() just be called in client side!");
  }

  if (!fpPromise) {
    fpPromise = FingerprintJS.load();
  }

  const fp = await FingerprintJS.load();
  const result = await fp.get();

  // console.log({ result });

  return result.visitorId;
};

export const getGuestIdentifier = async () => {
  const cacheId = Cookies.get(GUEST_ID_COOKIE);

  if (cacheId) {
    return cacheId;
  }

  try {
    const fingerprint = await getFingerprint(true);
    if (!/^[a-zA-Z0-9]{20,}$/.test(fingerprint as string)) {
      throw new Error("Invalid fingerprint format");
    }

    Cookies.set(GUEST_ID_COOKIE, fingerprint as string, {
      expires: COOKIE_EXPIRY,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return fingerprint;
  } catch (error) {
    console.error({ error });
    const fallbackId = uuidv4();

    Cookies.set(GUEST_ID_COOKIE, fallbackId, {
      expires: COOKIE_EXPIRY,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return fallbackId;
  }
};
