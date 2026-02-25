import { gql } from "@apollo/client";

export const GITHUB = gql`
  mutation gitHub {
    gitHub {
      redirect
      url
    }
  }
`;

export const GET_SESSION = gql`
  query getSession {
    getSession {
      success
      message
      data {
        session {
          token
          expiresAt
          userId
          ipAddress
          userAgent
        }
        user {
          id
          email
          name
          image
        }
      }
    }
  }
`;

export const GET_SESSION_STRING = `
  query getSession {
    getSession {
      session {
        token
        expiresAt
        userId
        ipAddress
        userAgent
        createdAt
        updatedAt
      }
      user {
        id
        email
        name
        avatarUrl
        createdAt
        updatedAt
        image
      }
    }
  }
`;
