import { graphql, HttpResponse } from "msw";

export const handlers = [
  // Default handler for getSession — returns unauthenticated state
  graphql.query("GetSession", () => {
    return HttpResponse.json({
      data: {
        getSession: {
          success: false,
          data: null,
        },
      },
    });
  }),

  // Default handler for signInEmail — returns success
  graphql.mutation("SignInEmail", ({ variables }) => {
    const { input } = variables as {
      input: { email: string; password: string };
    };

    return HttpResponse.json({
      data: {
        signInEmail: {
          token: "mock-jwt-token.payload.signature",
          user: {
            id: "user-1",
            name: "Test User",
            email: input.email,
            image: null,
          },
        },
      },
    });
  }),

  // Default handler for signOut
  graphql.mutation("SignOut", () => {
    return HttpResponse.json({
      data: {
        signOut: {
          success: true,
        },
      },
    });
  }),
];
