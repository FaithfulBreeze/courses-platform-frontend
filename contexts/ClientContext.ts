import { GraphQLClient } from 'graphql-request';
import { createContext } from 'react';

export const ClientContext = createContext<{ client?: GraphQLClient }>({});
