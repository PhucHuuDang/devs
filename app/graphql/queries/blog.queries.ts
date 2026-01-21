import { gql } from "@apollo/client";

// export const GET_POSTS = gql`
//   query GetPosts($filters: PostFiltersInput) {
//     posts(filters: $filters) {
//       data {
//         id
//         title
//         slug
//         description
//         mainImage
//         tags
//         views
//         isPublished
//         createdAt

//         author {
//           id
//           name
//           image
//         }

//         category {
//           id
//           name
//         }
//       }
//       meta {
//         total
//         page
//         limit
//         totalPages
//       }
//     }
//   }
// `;

export const GET_PUBLISHED_POSTS = gql`
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
        content
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
  }
`;

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
      content
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

// query GetPostBySlug($slug: String!) {
//   postBySlug(slug: $slug) {
//     success
//     message
//     data {
//       id
//       title
//       slug
//     }
// }

// query GetPostBySlug($slug: String!) {
//   postBySlug(slug: $slug) {
//     success
//     message
//     data {
//       id
//       title
//       slug
//       content
//       description
//       mainImage
//       createdAt
//       updatedAt
//       author {
//         id
//         name
//         image
//       }
//       category {
//         id
//         name
//       }
//     }
//   }
// }

// id
//         title
//         content
//         updatedAt
//         createdAt
//         description
//         mainImage
//         author {
//           id
//           name
//           image
//         }
//         category {
//           id
//           name
//         }
//         tags
//         views
//         votes
//         isPublished
//         isPriority
//         isPinned
//         isDeleted

// export const GET_POST_BY_SLUG_QUERY = gql`
//   query GetPostBySlug($slug: String!) {
//     ${GET_POST_BY_SLUG}
//   }
// `;
