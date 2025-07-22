import gql from 'graphql-tag';
import { CourseFragment } from '../fragments/course';
import { UserFragment } from '../fragments/user';
import { LessonFragment } from '../fragments/lesson';
import { ReviewFragment } from '../fragments/review';

export const GET_COURSE = gql`
  query GetCourse($id: Int!) {
    course(id: $id) {
      ...CourseFields
      students {
        ...UserFields
        completedLessons {
          ...LessonFields
          course {
            ...CourseFields
          }
        }
      }
      lessons {
        ...LessonFields
      }
      owner {
        ...UserFields
      }
      reviews {
        ...ReviewFields
        reviewer {
          ...UserFields
        }
      }
    }
  }
  ${CourseFragment}
  ${UserFragment}
  ${LessonFragment}
  ${ReviewFragment}
`;
