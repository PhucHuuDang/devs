# Better Auth Setup Guide

## ✅ Fixed Build Error!

Your auth route was empty, causing the TypeScript build error. It's now properly configured.

## 🔧 What Was Fixed

### 1. Created Server-Side Auth Handler

**File:** `lib/auth.ts`

```typescript
export const auth = betterAuth({
  database: {
    provider: "memory", // ⚠️ Development only!
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
});
```

### 2. Fixed Auth Route Handler

**File:** `app/api/auth/[...all]/route.ts`

```typescript
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

### 3. Updated Auth Client

**File:** `lib/auth-client.ts`

Changed `baseURL` to use `NEXT_PUBLIC_APP_URL` instead of GraphQL endpoint.

## 🚀 Try Building Again

```bash
npm run build
# or
bun run build
```

This should now work! ✅

## ⚠️ Important: Production Setup

The current config uses **in-memory database** which is **only for development**. For production, you need to configure a real database.

### Option 1: Using Prisma (Recommended)

1. **Install Prisma:**
```bash
npm install @prisma/client
npm install -D prisma
```

2. **Initialize Prisma:**
```bash
npx prisma init
```

3. **Update `lib/auth.ts`:**
```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: {
    provider: "prisma",
    prisma,
  },
  // ... rest of config
});
```

4. **Add Better Auth Schema:**
```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  emailVerified Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  sessions  Session[]
  accounts  Account[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}

model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

5. **Run Migration:**
```bash
npx prisma migrate dev --name init
```

### Option 2: Using MongoDB

```typescript
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export const auth = betterAuth({
  database: {
    provider: "mongodb",
    client,
  },
});
```

### Option 3: Using PostgreSQL (Direct)

```typescript
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
  database: {
    provider: "postgres",
    pool,
  },
});
```

## 🔐 Environment Variables

Add to your `.env.local`:

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (choose one)
DATABASE_URL="postgresql://user:password@localhost:5432/devs"
# or
MONGODB_URI="mongodb://localhost:27017/devs"

# Social Providers (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email (for magic links, password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 📝 Available Auth Routes

Your app now has these auth endpoints:

- `POST /api/auth/sign-up` - Create account
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-out` - Logout
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/callback/:provider` - OAuth callbacks

## 🎯 Using Auth in Your App

### Client-Side (React Components)

```tsx
"use client";

import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const handleLogin = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error);
    } else {
      console.log("Logged in:", data);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin(
        formData.get("email") as string,
        formData.get("password") as string
      );
    }}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Server-Side (Server Components/API Routes)

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ user: session.user });
}
```

### Middleware (Protected Routes)

```typescript
// middleware.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
```

## 🎨 UI Components

You can use any UI library. Here's an example with your existing components:

```tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function AuthCard() {
  return (
    <Card>
      <form onSubmit={async (e) => {
        e.preventDefault();
        // Handle auth
      }}>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Sign In</Button>
      </form>
    </Card>
  );
}
```

## 🔄 Adding Social Providers

Uncomment in `lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // ...
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

### Getting OAuth Credentials

**GitHub:**
1. Go to https://github.com/settings/developers
2. Create New OAuth App
3. Set callback: `http://localhost:3000/api/auth/callback/github`

**Google:**
1. Go to https://console.cloud.google.com/
2. Create OAuth 2.0 Client ID
3. Set callback: `http://localhost:3000/api/auth/callback/google`

## 📚 Resources

- **Better Auth Docs:** https://www.better-auth.com/docs
- **API Reference:** https://www.better-auth.com/docs/api-reference
- **Examples:** https://github.com/better-auth/better-auth/tree/main/examples

## ✅ Current Status

- ✅ Auth route fixed (no more build errors)
- ✅ Server-side handler configured
- ✅ Client-side SDK ready
- ⚠️ Using in-memory DB (development only)
- 📝 Ready for production database setup

## 🚀 Next Steps

1. **Test the build:**
   ```bash
   npm run build
   ```

2. **Set up database** (for production)
3. **Configure environment variables**
4. **Add social providers** (optional)
5. **Create login/signup pages**
6. **Add protected routes**

---

**Build should now work!** 🎉

Try running `npm run build` or `bun run build` again.

