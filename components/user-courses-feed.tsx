'use client';

import { fetchUserPurchasedCourses } from '@/repositories/fetchUserPurchasedCourses';
import { Course } from '@/types.generated';
import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';
import { CourseCard } from './ui/course-card';

interface IUserCourseFeedStateProps {
  userPurchasedCourses: Course[];
}

interface UserCoursesFeedProps {
  userId?: number;
  client?: GraphQLClient;
}

export function UserCoursesFeed({ userId, client }: UserCoursesFeedProps) {
  const [state, setState] = useState<IUserCourseFeedStateProps | null>(null);

  useEffect(() => {
    if (!client || !userId) return;

    fetchUserPurchasedCourses({
      client,
      id: userId,
    }).then((userPurchasedCourses) => setState((prev) => ({ ...prev, userPurchasedCourses })));
  }, []);

  return (
    <div className="flex gap-10">
      {state?.userPurchasedCourses.map((course) => {
        return <CourseCard key={course.id} {...course} />;
      })}
    </div>
  );
}
