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
