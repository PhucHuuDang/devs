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

// id: 'cmhqjg8a20002gn3rmhi4y0x8',
// title: 'Bài viết test đầu tiên',
// mainImage: 'https://example.com/test-image.jpg',
// description: 'Đây là mô tả của bài viết test',
// content: [Object],
// votes: 10,
// authorId: 'cmhqi5ks60000gn5l82a3q268',
// categoryId: 'cmhqj0jfs0000gnvlfw6uknbc',
// createdAt: 2025-11-08T17:08:20.331Z,
// updatedAt: 2025-11-08T17:08:20.331Z,
// tags: [Array],
// slug: 'bai-viet-test-dau-tien-1',
// views: 0,
// isPublished: false,
// isPriority: false,
// isPinned: false,
// isDeleted: false

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
