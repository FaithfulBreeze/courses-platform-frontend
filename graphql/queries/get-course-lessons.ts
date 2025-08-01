import gql from 'graphql-tag';
import { LessonFragment } from '../fragments/lesson';

export const GET_COURSE_LESSONS = gql`
  query GetCourseLessons($id: Int!, $limit: Int!, $page: Int!) {
    course(id: $id) {
      lessons(limit: $limit, page: $page) {
        ...LessonFields
      }
    }
  }
  ${LessonFragment}
`;
