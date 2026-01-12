import { redirect } from "next/navigation";

import HomeBackgroundClient from "@/shader/home-background";

import { getAuthCookies } from "../utils/cookies";

// Server component - can be statically generated
export default async function HomePage() {
  const cookies = await getAuthCookies();

  if (!cookies.accessToken || !cookies.sessionToken || !cookies.refreshToken) {
    redirect("/blogs");
  }
  return (
    <>
      <div>
        <HomeBackgroundClient />
      </div>
    </>
  );
}
