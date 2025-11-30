import { jwtDecode } from "jwt-decode";

export const decodeData = <T>(data: string) => {
  if (!data.includes(".")) {
    throw new Error("Not a valid JWT token");
  }
  return jwtDecode<T>(data) as T;
};
