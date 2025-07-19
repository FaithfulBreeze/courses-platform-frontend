import { gql } from 'graphql-request';

export const UserFragment = gql`
  fragment UserFields on User {
    id
    name
    email
    avatar
  }
`;
