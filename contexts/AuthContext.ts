import { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export interface IAuthContext { user: { id?: string },  setUser?: Dispatch<SetStateAction<{
    id?: string;
} | undefined>> }

export const AuthContext = createContext<IAuthContext>({
  user: {
    id: ""
  },
});
