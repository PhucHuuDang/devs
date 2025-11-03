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

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    findPostBySlug(slug: $slug) {
      id
      title
      description
      mainImage
      createdAt
    }
  }
`;
