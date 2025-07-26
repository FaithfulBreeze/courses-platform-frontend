import { useEffect, useState } from 'react';
import { fetchUser } from '@/repositories/fetchUser';
import { Course, Lesson } from '@/types.generated';
import { CourseCard } from './course-card';
import { GraphQLClient } from 'graphql-request';
import { Carousel } from './carousel';
import { fetchUserLastPurchasedCourses } from '@/repositories/fetchUserLastPurchasedCourses';

interface UserLastPurchasedCoursesSlideProps {
  userId?: number;
  client?: GraphQLClient;
}

export function UserLastPurchasedCoursesSlide({
  userId,
  client,
}: UserLastPurchasedCoursesSlideProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!client || !userId) return;

    const fetchData = async () => {
      setIsLoading(true);
      const [fetchedCourses, user] = await Promise.all([
        fetchUserLastPurchasedCourses({ client, id: userId }),
        fetchUser({ client, id: userId }),
      ]);

      setCourses(fetchedCourses);
      setCompletedLessons(user.completedLessons || []);
      setIsLoading(false);
    };

    fetchData();
  }, [client, userId]);

  return (
    <Carousel
      items={courses}
      loading={isLoading}
      renderItem={(course) => {
        const courseLessons = course.lessons?.length || 0;
        const completed = completedLessons.filter((l) => l.course.id === course.id).length;
        const progress = courseLessons ? Math.round((completed / courseLessons) * 100) : 0;

        return <CourseCard course={course} showProgress={true} progress={progress} />;
      }}
    />
  );
}
