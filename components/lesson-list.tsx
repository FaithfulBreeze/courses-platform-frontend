'use client';

import { Course, Lesson, User } from '@/types.generated';
import { useContext, useEffect, useState } from 'react';
import { fetchCourseLessons } from '@/repositories/fetchCourseLessons';
import { fetchUserCourseCompletedLessons } from '@/repositories/fetchUserCourseCompletedLessons';
import { ClientContext } from '@/contexts/ClientContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import LessonProgressBar from './lesson-progress-bar';
import LessonListItem from './lesson-list-item';
import { PaginatedList } from './paginated-list';

interface ILessonListProps {
  user: User;
  course: Course;
  currentLesson?: Lesson;
}

interface ILessonListStateProps {
  completedLessons?: Lesson[];
  lessons?: Lesson[];
}

export default function LessonList({ course, user, currentLesson }: ILessonListProps) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<ILessonListStateProps>({});

  const LESSONS_PER_PAGE = 10;

  const { client } = useContext(ClientContext);

  useEffect(() => {
    if (!course || !user || !client) return;

    fetchUserCourseCompletedLessons({ client, id: user.id, courseId: course.id }).then(
      (completedLessons) => {
        setState((prev) => ({ ...prev, completedLessons }));
      },
    );
  }, []);

  useEffect(() => {
    if (!course || !user || !client || !page) return;

    fetchCourseLessons({
      client,
      id: course.id,
      page,
    }).then((lessons) => {
      setState((prev) => ({
        ...prev,
        lessons,
      }));
    });
  }, [page]);

  const isOwner = course?.owner.id === user?.id;
  const isStudent = course?.students?.some((s) => s.id === user?.id);
  const canAccess = isOwner || isStudent;

  return (
    <>
      <LessonProgressBar
        user={user}
        course={course}
        lessonsCount={course.lessonsCount}
        completedLessonsCount={state.completedLessons?.length || 0}
        canAccess={canAccess}
      />
      <section className="relative space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-sm sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Course Lessons
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {course.lessonsCount} lesson{course.lessonsCount !== 1 ? 's' : ''}
            </p>
          </div>

          {isOwner && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg shadow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Add Lesson"
            >
              + Add Lesson
            </button>
          )}
        </div>

        <AnimatePresence>
          {!canAccess && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                <Lock size={32} />
                <p className="text-center font-medium">Purchase or enroll to access lessons</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <PaginatedList
          items={state.lessons || []}
          totalCount={course.lessonsCount}
          currentPage={page}
          pageSize={LESSONS_PER_PAGE}
          onPageChange={(p) => setPage(p)}
          isLoading={!state.lessons}
          renderItem={(lesson) => (
            <LessonListItem
              lesson={lesson}
              canAccess={canAccess}
              isCurrentLesson={currentLesson?.id === lesson.id}
              isCompleted={state.completedLessons?.some((l) => l.id === lesson.id)}
              isOwner={isOwner}
            />
          )}
        />
      </section>
    </>
  );
}
