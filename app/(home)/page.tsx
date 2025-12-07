import HomeBackgroundClient from "@/components/shader/home-background";
import { getAuthCookies } from "../utils/cookies";
import { redirect } from "next/navigation";

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
