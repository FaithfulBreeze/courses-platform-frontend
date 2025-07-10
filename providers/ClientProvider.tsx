"use client";

import { ClientContext } from "@/contexts/ClientContext";
import { GraphQLClient } from "graphql-request";

export function ClientProvider({ children }: React.PropsWithChildren) {
  const client = new GraphQLClient(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  );
  return (
    <ClientContext.Provider value={{ client }}>
      {children}
    </ClientContext.Provider>
  );
}
