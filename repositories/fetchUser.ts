import { GET_USER } from '@/graphql/queries/get-user';
import { GetUserQuery, GetUserQueryVariables, User } from '@/types.generated';
import { GraphQLClient } from 'graphql-request';

export const fetchUser = async ({ client, id }: { client: GraphQLClient; id: number }) => {
  const response = await client.request<GetUserQuery, GetUserQueryVariables>(GET_USER, { id });

  return response.user as User;
};
