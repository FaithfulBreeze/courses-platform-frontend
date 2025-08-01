import { GET_LESSON } from '@/graphql/queries/get-lesson';
import { GetLessonQuery, GetLessonQueryVariables, Lesson } from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchLesson = async ({ client, id }: { client: GraphQLClient; id: number }) => {
  const response = await client.request<GetLessonQuery, GetLessonQueryVariables>(GET_LESSON, {
    id,
  });

  return response.lesson as Lesson;
};
