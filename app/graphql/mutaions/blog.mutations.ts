import { gql } from "@apollo/client";

// TODO: Backend hasn't implemented blog mutations yet
// Uncomment when backend implements: createPost, updatePost, incrementViews

// Placeholder exports to prevent import errors

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: CreatePostInput!) {
    createPost(input: $input) {
      success
      message
      data {
        id
        title
        slug
        createdAt
      }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: String!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      success
      message
      data {
        id
        title
        slug
        createdAt
      }
    }
  }
`;

export const INCREMENT_BLOG_VIEWS = gql`
  mutation incrementViews($id: String!, $identifier: String!) {
    incrementViews(id: $id, identifier: $identifier) {
      
      success
      message

      data: {
        id
      }
    }
  }
`;
