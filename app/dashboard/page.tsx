'use client';

import { UserLastPurchasedCoursesSlide } from '@/components/user-last-purchased-courses-slide';
import { AuthContext } from '@/contexts/AuthContext';
import { ClientContext } from '@/contexts/ClientContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useContext, useEffect } from 'react';

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const { client } = useContext(ClientContext);

  useEffect(() => {
    useProtectedRoute(authContext);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Masthead / CTA for last watched lesson */}
      <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg min-h-[240px] flex items-center justify-between p-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, {authContext.user?.name} 👋</h2>
          <p className="text-lg text-gray-300">Ready to continue where you left off?</p>
        </div>
        <div className="w-48 h-28 bg-black/30 rounded-lg flex items-center justify-center">
          {/* Replace with dynamic thumbnail */}
          <span className="text-white text-sm">Last watched lesson</span>
        </div>
      </section>

      {/* Purchased Courses Carousel */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Recently Purchased Courses
          </h3>
          <button className="text-sm text-blue-600 hover:underline">View all</button>
        </div>
        <UserLastPurchasedCoursesSlide userId={authContext.user?.id} client={client} />
      </section>

      {/* Course Feed Placeholder */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Explore New Courses
          </h3>
          <p className="text-sm text-gray-500">Curated suggestions just for you</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-40 flex items-center justify-center text-gray-400 text-sm">
          Course Feed Component Coming Soon...
        </div>
      </section>

      {/* Top Rated Users / Community Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Top Rated Creators
          </h3>
          <p className="text-sm text-gray-500">Learn from the best on the platform</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-40 flex items-center justify-center text-gray-400 text-sm">
          Top Users Component Coming Soon...
        </div>
      </section>

      {/* Future Widget Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-40 flex items-center justify-center text-gray-400 text-sm">
            Stats / Analytics Widget
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-40 flex items-center justify-center text-gray-400 text-sm">
            Upcoming Events or Reminders
          </div>
        </div>
      </section>
    </main>
  );
}
