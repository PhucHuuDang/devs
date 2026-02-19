import { gql } from "@apollo/client";

export const INCREMENT_BLOG_VIEWS = gql`
  mutation IncrementViews($id: String!, $identifier: String!) {
    incrementViews(id: $id, identifier: $identifier) {
      success
      message
      data {
        id
        views
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      success
      message
    }
  }
`;
