import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUpEmail($input: SignUpInput!) {
    signUpEmail(signUpInput: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signInEmail($input: SignInInput!) {
    signInEmail(signInInput: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      success
    }
  }
`;

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
