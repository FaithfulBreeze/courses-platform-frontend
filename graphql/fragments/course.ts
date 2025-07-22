import { gql } from 'graphql-request';

export const CourseFragment = gql`
  fragment CourseFields on Course {
    id
    title
    description
    thumbnail
    duration
    trailer
    trailerDuration
  }
`;
