import { gql } from "@apollo/client";

export const GET_POSTS_STRING = `
query GetPublishedPosts($filters: PostFiltersInput!) {
  publishedPosts(filters: $filters) {
    success
    message
    data {
      id
      title
      slug
      isPublished
      isPriority
      createdAt
      updatedAt
      description
      mainImage
      views
      tags
      author {
        id
        name
        image
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
      hasNext
      hasPrev
    }
  }
}`;

export const GET_POST_BY_SLUG = `
 query GetPostBySlug($slug: String!) {
  postBySlug(slug: $slug) {
    success
    message
    data {
      id
      title
      slug
      content
      description
      mainImage
      createdAt
      updatedAt
      author {
        id
        name
        image
        createdAt
      }
      category {
        id
        name
      }
    }
  }
}
`;
