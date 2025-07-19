'use client';

import { UserCoursesFeed } from '@/components/user-courses-feed';
import { AuthContext } from '@/contexts/AuthContext';
import { ClientContext } from '@/contexts/ClientContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useContext, useEffect } from 'react';

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const { client } = useContext(ClientContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useProtectedRoute(authContext);
  }, []);

  return <UserCoursesFeed userId={authContext.user.id} client={client} />;
}
