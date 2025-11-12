import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
export const GUEST_ID_COOKIE = "guest_id";
export const COOKIE_EXPIRY = 365;

export const getOrCreateGuestIdentifier = () => {
  let guestId = Cookies.get(GUEST_ID_COOKIE);

  if (!guestId) {
    guestId = uuidv4();
    Cookies.set(GUEST_ID_COOKIE, guestId, {
      expires: COOKIE_EXPIRY,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",

      path: "/",
    });
  }

  return guestId;
};

export const getGuestId = (): string | undefined => {
  return Cookies.get(GUEST_ID_COOKIE);
};

export const refreshGuestIdentifier = async () => {
  Cookies.remove(GUEST_ID_COOKIE);
  return getOrCreateGuestIdentifier();
};

export const hasGuestIdentifier = () => {
  return !!Cookies.get(GUEST_ID_COOKIE);
};
