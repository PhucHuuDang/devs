import { Page } from "@playwright/test";

/**
 * Mocks common GraphQL responses for E2E testing
 */
export async function setupMocks(page: Page) {
  await page.route("**/graphql", async (route) => {
    const postData = route.request().postDataJSON();
    const operationName = postData?.operationName;

    if (operationName === "SignInEmail") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            signInEmail: {
              token: "mock-jwt-token",
              user: {
                id: "user-1",
                name: "Test User",
                email: "test@example.com",
                image: "https://github.com/shadcn.png",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                __typename: "User",
              },
              __typename: "AuthPayload",
            },
          },
        }),
      });
    }

    if (operationName === "GetSession") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            getSession: {
              success: true,
              message: "Session retrieved",
              data: {
                session: {
                  token: "mock-jwt-token",
                  expiresAt: new Date(Date.now() + 86400000).toISOString(),
                  userId: "user-1",
                  ipAddress: "127.0.0.1",
                  userAgent: "Playwright",
                  __typename: "Session",
                },
                user: {
                  id: "user-1",
                  name: "Test User",
                  email: "test@example.com",
                  image: "https://github.com/shadcn.png",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  __typename: "User",
                },
                __typename: "SessionData",
              },
              __typename: "SessionResponse",
            },
          },
        }),
      });
    }

    // Default: allow others or return empty list for posts if needed
    if (
      operationName === "GetPosts" ||
      operationName === "Posts" ||
      operationName === "GetPublishedPosts"
    ) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          data: {
            publishedPosts: {
              data: [
                {
                  id: "post-1",
                  title: "E2E Test Post",
                  slug: "e2e-test-post",
                  description: "Content for E2E testing",
                  mainImage:
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                  views: 10,
                  tags: ["test", "e2e"],
                  author: {
                    id: "user-1",
                    name: "Test User",
                    image: "https://github.com/shadcn.png",
                    __typename: "User",
                  },
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  __typename: "Post",
                },
              ],
              meta: {
                total: 1,
                page: 1,
                limit: 10,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
                __typename: "PaginationMeta",
              },
              __typename: "PublishedPostsResponse",
            },
          },
        }),
      });
    }

    // Hand-off remaining requests
    await route.continue();
  });
}
