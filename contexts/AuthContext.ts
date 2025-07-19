import { User } from '@/types.generated';
import { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export interface IAuthContext {
  user: Partial<User>;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
}

export const AuthContext = createContext<IAuthContext>({
  user: {},
  setUser: () => null,
});
