import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    allPosts {
      id
      title
      description
      mainImage
      createdAt
    }
  }
`;
