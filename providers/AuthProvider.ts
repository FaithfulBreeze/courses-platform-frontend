import { createContext, Dispatch, SetStateAction } from "react";

export const AuthProvider = createContext<{ user: { id?: string },  setUser?: Dispatch<SetStateAction<{
    id?: string;
} | undefined>> }>({
  user: {
    id: ""
  },
});
