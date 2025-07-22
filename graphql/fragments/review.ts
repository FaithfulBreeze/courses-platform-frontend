import { gql } from 'graphql-request';

export const ReviewFragment = gql`
  fragment ReviewFields on Review {
    id
    content
    rate
  }
`;
