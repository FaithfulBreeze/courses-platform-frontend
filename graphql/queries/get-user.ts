import gql from 'graphql-tag';
import { UserFragment } from '../fragments/user';
import { LessonFragment } from '../fragments/lesson';
import { CourseFragment } from '../fragments/course';

export const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      ...UserFields
      completedLessons {
        ...LessonFields
        course {
          ...CourseFields
        }
      }
      lastWatchedLesson {
        ...LessonFields
      }
    }
  }
  ${LessonFragment}
  ${UserFragment}
  ${CourseFragment}
`;
