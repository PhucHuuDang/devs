# GitHub OAuth Configuration Guide

## The Problem

The error **"The redirect_uri is not associated with this application"** occurs when the redirect URI in your GitHub OAuth app settings doesn't match the redirect URI being sent in the authorization request.

## Solution Steps

### 1. Configure Your Backend

Your backend needs to generate the correct GitHub OAuth URL with the proper redirect_uri. Make sure your backend has these environment variables:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/callback/github
```

**For Production:**
```env
GITHUB_CALLBACK_URL=https://yourdomain.com/api/auth/callback/github
```

### 2. Configure Your GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "OAuth Apps" → Your App
3. Set the following:

**For Development:**
- **Application name:** Your App Name (Dev)
- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

**For Production:**
- **Application name:** Your App Name
- **Homepage URL:** `https://yourdomain.com`
- **Authorization callback URL:** `https://yourdomain.com/api/auth/callback/github`

⚠️ **IMPORTANT:** The callback URL must match EXACTLY (including protocol, domain, port, and path)

### 3. Create the Callback API Route (If Missing)

Create this file: `app/api/auth/callback/github/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    // Handle OAuth error
    return NextResponse.redirect(
      new URL(`/sign-in?error=${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/sign-in?error=no_code", request.url)
    );
  }

  try {
    // Exchange code for access token via your backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_URL}/auth/github/callback?code=${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.token) {
      // Set the auth cookies
      const redirectResponse = NextResponse.redirect(
        new URL("/blogs", request.url)
      );

      redirectResponse.cookies.set("access_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return redirectResponse;
    }

    throw new Error("No token received");
  } catch (error) {
    console.error("GitHub callback error:", error);
    return NextResponse.redirect(
      new URL("/sign-in?error=authentication_failed", request.url)
    );
  }
}
```

### 4. Backend GraphQL Mutation (Example)

Your backend should generate a URL like this:

```typescript
// Backend code example (NestJS/GraphQL)
@Mutation(() => GitHubUserResponse)
async gitHub() {
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;

  return {
    redirect: true,
    url: authUrl,
  };
}
```

### 5. Common Issues & Solutions

#### Issue: Port mismatch
❌ Backend sends: `http://localhost:3000/api/auth/callback/github`
❌ GitHub OAuth configured: `http://localhost:3001/api/auth/callback/github`

✅ **Solution:** Ensure both use the same port

#### Issue: Protocol mismatch
❌ Backend sends: `http://example.com/callback`
❌ GitHub OAuth configured: `https://example.com/callback`

✅ **Solution:** Use `https://` for production, `http://` for localhost

#### Issue: Path mismatch
❌ Backend sends: `/api/auth/github/callback`
❌ GitHub OAuth configured: `/api/auth/callback/github`

✅ **Solution:** Match the exact path

#### Issue: Missing trailing slash
❌ Backend sends: `/callback/`
❌ GitHub OAuth configured: `/callback`

✅ **Solution:** Be consistent with trailing slashes

### 6. Debugging Checklist

- [ ] Check the URL in browser when clicking "Sign in with GitHub"
- [ ] Extract the `redirect_uri` parameter from the URL
- [ ] Compare it with your GitHub OAuth app settings
- [ ] Ensure they match EXACTLY
- [ ] Check backend environment variables
- [ ] Verify the callback route exists
- [ ] Test with both development and production URLs

### 7. Testing

1. Click "Sign in with GitHub"
2. Check the URL in the address bar
3. Look for the `redirect_uri` parameter
4. It should match your GitHub OAuth app settings EXACTLY

Example URL:
```
https://github.com/login/oauth/authorize?client_id=Ov23li...&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgithub&scope=user:email
```

Decoded `redirect_uri`:
```
http://localhost:3000/api/auth/callback/github
```

This must match your GitHub OAuth app's "Authorization callback URL" setting.

---

## Quick Fix Checklist

1. ✅ Updated frontend to use `window.location.href` instead of `router.push()`
2. ⚠️ Check your backend GitHub mutation returns correct redirect URL
3. ⚠️ Verify GitHub OAuth app callback URL matches backend URL
4. ⚠️ Create callback API route if missing
5. ⚠️ Test the flow end-to-end

## Need More Help?

If you're still having issues, check:
1. Your backend logs for the generated OAuth URL
2. The network tab to see the actual redirect_uri being sent
3. Your GitHub OAuth app settings one more time

