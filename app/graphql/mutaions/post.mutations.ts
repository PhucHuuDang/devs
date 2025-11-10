import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog(
    $title: String!
    $description: String!
    $slug: String!
    $mainImage: String!
    $categoryId: String!
    $tags: [String!]!
    $content: JSON!
    $authorId: String!
    $isPublished: Boolean!
  ) {
    createPost(
      title: $title
      description: $description
      slug: $slug
      mainImage: $mainImage
      tags: $tags
      content: $content
      isPublished: $isPublished
      authorId: $authorId
      categoryId: $categoryId
    ) {
      id
      title
      slug
      createdAt
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      slug
      createdAt
    }
  }
`;
