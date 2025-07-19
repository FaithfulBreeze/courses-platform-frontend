'use client';

import { AuthContext } from '@/contexts/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Home() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    useProtectedRoute(authContext);
  }, []);

  useEffect(() => {
    const isLogged = authContext.user;
    if (!isLogged) redirect('/auth');
    if (isLogged) redirect('/dashboard');
  }, [authContext.user]);
}
