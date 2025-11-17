import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  signOut,
  linkSocial,
  refreshToken,
  listAccounts,

  verifyEmail,
} = createAuthClient({
  plugins: [magicLinkClient()],
});

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      vn: string;
    }
  >
>;

const errorCodes = {
  USER_ALREADY_EXISTS: {
    en: "user already exists",
    vn: "tài khoản đã tồn tại",
  },
} satisfies ErrorTypes;

const getErrorMessage = (code: string, lang: "en" | "vn") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};
