import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetCommentsByPost($postId: String!) {
    commentsByPost(postId: $postId) {
      success
      message
      count
      data {
        id
        content
        createdAt
        updatedAt
        isEdited
        isDeleted
        parentId
        postId
        userId
        user {
          id
          email
          name
          image
        }
        replies {
          id
          content
          createdAt
          updatedAt
          isEdited
          isDeleted
          parentId
          userId
          user {
            id
            email
            name
            image
          }
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      message
      data {
        id
        content
        createdAt
        user {
          id
          name
          image
        }
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: String!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      success
      message
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      success
      message
      deletedId
    }
  }
`;
