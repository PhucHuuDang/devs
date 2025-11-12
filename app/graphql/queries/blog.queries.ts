import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    allPosts {
      id
      title
      mainImage
      description
      content
      votes
      authorId
      categoryId
      createdAt
      updatedAt
      tags
      slug
      views
      isPublished
      isPriority
      isPinned
      isDeleted

      author {
        id
        name
        avatarUrl
        bio
        designation
      }
      category {
        id
        name
      }
    }
  }
`;

export const GET_POSTS_STRING = `
query GetPosts {
    allPosts {
      id
      title
      slug
      tags
      description
      mainImage
      author {
        id
        name
        avatarUrl
        bio
        designation
      }
      category {
        id
        name
      }
    }
  }`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    findPostBySlug(slug: $slug) {
      id
      title
      content
      updatedAt
      createdAt
      description
      mainImage
      author {
        id
        name
        avatarUrl
        bio
        designation
      }
      category {
        id
        name
      }
      tags
      views
      votes
      isPublished
      isPriority
      isPinned
      isDeleted
    }
  }
`;

// export const GET_POST_BY_SLUG_QUERY = gql`
//   query GetPostBySlug($slug: String!) {
//     ${GET_POST_BY_SLUG}
//   }
// `;
