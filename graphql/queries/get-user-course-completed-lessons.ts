import gql from 'graphql-tag';
import { LessonFragment } from '../fragments/lesson';

export const GET_USER_COURSE_COMPLETED_LESSONS = gql`
  query GetUserCourseCompletedLessons($id: Int!, $courseId: Int!) {
    user(id: $id) {
      completedCourseLessons(courseId: $courseId) {
        ...LessonFields
      }
    }
  }
  ${LessonFragment}
`;
