import gql from 'graphql-tag';
import { ReviewFragment } from '../fragments/review';
import { UserFragment } from '../fragments/user';

export const GET_LESSON_REVIEWS = gql`
  query GetLessonReviews($id: Int!, $limit: Int!, $page: Int!) {
    lesson(id: $id) {
      reviews(limit: $limit, page: $page) {
        ...ReviewFields
        reviewer {
          ...UserFields
        }
      }
    }
  }
  ${UserFragment}
  ${ReviewFragment}
`;
