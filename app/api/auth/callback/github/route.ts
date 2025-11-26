import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub OAuth Callback Handler
 * 
 * This route handles the callback from GitHub after user authorizes the app.
 * GitHub will redirect here with a 'code' parameter that needs to be exchanged
 * for an access token via your backend.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle OAuth errors
  if (error) {
    console.error("GitHub OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(
        `/sign-in?error=${encodeURIComponent(error)}&message=${encodeURIComponent(errorDescription || "Authentication failed")}`,
        request.url
      )
    );
  }

  // Ensure we have a code
  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/sign-in?error=no_code&message=No authorization code received",
        request.url
      )
    );
  }

  try {
    // Exchange the code for an access token via your GraphQL backend
    // Update this URL to match your backend endpoint
    const backendUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";
    
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation GitHubCallback($code: String!) {
            gitHubCallback(code: $code) {
              token
              refreshToken
              user {
                id
                email
                name
                avatarUrl
              }
            }
          }
        `,
        variables: {
          code,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(data.errors[0]?.message || "Authentication failed");
    }

    const authData = data.data?.gitHubCallback;

    if (authData?.token) {
      // Create redirect response to blogs page
      const redirectResponse = NextResponse.redirect(
        new URL("/blogs", request.url)
      );

      // Set authentication cookies
      redirectResponse.cookies.set("access_token", authData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      if (authData.refreshToken) {
        redirectResponse.cookies.set("refresh_token", authData.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
      }

      return redirectResponse;
    }

    throw new Error("No authentication token received from backend");
  } catch (error: any) {
    console.error("GitHub callback error:", error);
    return NextResponse.redirect(
      new URL(
        `/sign-in?error=authentication_failed&message=${encodeURIComponent(error.message || "Failed to authenticate with GitHub")}`,
        request.url
      )
    );
  }
}

