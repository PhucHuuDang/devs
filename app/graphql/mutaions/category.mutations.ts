import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryDto!) {
    createCategory(input: $input) {
      success
      message
      data {
        id
        name
        slug
        createdAt
      }
    }
  }
`;
