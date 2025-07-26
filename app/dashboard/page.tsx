'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ClientContext } from '@/contexts/ClientContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import { WelcomeBanner } from '@/components/welcome-banner';
import { SectionBlock } from '@/components/section-block';
import { SectionGroup } from '@/components/section-group';
import { UserLastPurchasedCoursesSlide } from '@/components/user-last-purchased-courses-slide';
import { PlaceholderPanel } from '@/components/placeholder-pannel';
import { Container } from '@/components/container';

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const { client } = useContext(ClientContext);

  useEffect(() => {
    useProtectedRoute(authContext);
  }, []);

  return (
    <Container>
      <SectionGroup spacing={12}>
        <WelcomeBanner name={authContext.user.name || ''} />

        <SectionBlock
          title="Recently Purchased Courses"
          action={
            <button className="text-xs sm:text-sm text-blue-600 hover:underline">View all</button>
          }
        >
          <UserLastPurchasedCoursesSlide userId={authContext.user?.id} client={client} />
        </SectionBlock>

        <SectionBlock title="Explore New Courses" subtitle="Curated suggestions just for you">
          <PlaceholderPanel text="Course Feed Component Coming Soon..." />
        </SectionBlock>

        <SectionBlock title="Top Rated Creators" subtitle="Learn from the best on the platform">
          <PlaceholderPanel text="Top Users Component Coming Soon..." />
        </SectionBlock>

        <SectionBlock title="Dashboard Widgets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <PlaceholderPanel text="Stats / Analytics Widget" />
            <PlaceholderPanel text="Upcoming Events or Reminders" />
          </div>
        </SectionBlock>
      </SectionGroup>
    </Container>
  );
}
