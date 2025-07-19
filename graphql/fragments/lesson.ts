import { gql } from 'graphql-request';

export const LessonFragment = gql`
  fragment LessonFields on Lesson {
    id
    url
    thumbnail
    title
    description
    duration
  }
`;
