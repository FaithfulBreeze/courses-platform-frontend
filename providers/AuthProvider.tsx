'use client';

import { AuthContext } from '@/contexts/AuthContext';
import { User } from '@/types.generated';
import { useState } from 'react';

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<Partial<User>>({});

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
