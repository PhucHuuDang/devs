import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($filters: PostFiltersInput) {
    posts(filters: $filters) {
      data {
        id
        title
        slug
        description
        mainImage
        tags
        views
        isPublished
        createdAt

        user {
          id
          name
          avatarUrl
        }

        category {
          id
          name
        }
      }
      meta {
        total
        page
        limit
        totalPages
      }
    }
  }
`;

export const GET_POSTS_STRING = `
query GetPosts($filters: PostFiltersInput) {
    posts(filters: $filters) {
      data {
      id
      title
      slug
      tags
      description
      mainImage
      user {
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
