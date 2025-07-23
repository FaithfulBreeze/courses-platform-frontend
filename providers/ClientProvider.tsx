'use client';

import { BACKEND_URL } from '@/common/constants';
import { ClientContext } from '@/contexts/ClientContext';
import { GraphQLClient } from 'graphql-request';

export function ClientProvider({ children }: React.PropsWithChildren) {
  const client = new GraphQLClient(`${BACKEND_URL}/graphql`, {
    credentials: 'include',
  });
  return <ClientContext.Provider value={{ client }}>{children}</ClientContext.Provider>;
}
