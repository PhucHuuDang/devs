import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001/auth",
  plugins: [magicLinkClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  linkSocial,
  refreshToken,
  listAccounts,
  accountInfo,
  listSessions,
  verifyEmail,
} = authClient;

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
