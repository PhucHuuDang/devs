"use client";

import { createContext, useContext } from "react";

export interface AuthContextType {
  getCookies: () => Promise<{
    accessToken: string | null | undefined;
    refreshToken: string | null | undefined;
  }>;
  setCookies: (
    accessToken: string,
    sessionToken: string,
    refreshToken: string,
  ) => Promise<void>;
  deleteCookies: () => Promise<void>;
}

interface AuthProviderProps extends AuthContextType {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  getCookies,
  setCookies,
  deleteCookies,
}: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ getCookies, setCookies, deleteCookies }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
