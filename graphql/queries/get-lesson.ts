import gql from 'graphql-tag';
import { LessonFragment } from '../fragments/lesson';
import { CourseFragment } from '../fragments/course';
import { UserFragment } from '../fragments/user';

export const GET_LESSON = gql`
  query GetLesson($id: Int!) {
    lesson(id: $id) {
      ...LessonFields
      course {
        ...CourseFields
        owner {
          ...UserFields
        }
        students {
          ...UserFields
        }
      }
    }
  }
  ${UserFragment}
  ${CourseFragment}
  ${LessonFragment}
`;
