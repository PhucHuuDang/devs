This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Testing

### Unit & Component Tests (Vitest + React Testing Library)

```bash
# Run all unit + component tests
npm test

# Run in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
```

Tests are co-located with source files (`*.test.ts` / `*.test.tsx`). Test setup is in `src/test/`.

### E2E Tests (Playwright)

```bash
# Install Playwright browsers (first time only)
npx playwright install --with-deps chromium

# Run E2E tests
npm run test:e2e

# Run E2E tests with interactive UI
npm run test:e2e:ui
```

#### Required Environment Variables

Create a `.env` file (see `.env.example`):

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Frontend URL for E2E | `http://localhost:3000` |
| `E2E_EMAIL` | Test user email | `test@example.com` |
| `E2E_PASSWORD` | Test user password | `Test@123` |

> **Note**: E2E tests require a running dev server (`npm run dev`) and backend (`http://localhost:3001`). Tests will skip gracefully if the backend is unavailable.

### Other Commands

```bash
# Type check
npm run typecheck

# Lint
npm run lint
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
