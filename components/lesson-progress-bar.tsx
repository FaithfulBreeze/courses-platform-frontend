import { Course, User } from '@/types.generated';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ILessonProgressBar {
  user: User;
  course: Course;
}

export default function LessonProgressBar({ user, course }: ILessonProgressBar) {
  const completedLessonsCount =
    user.completedLessons.filter((lesson) => lesson?.course?.id == course?.id).length || 0;
  const totalLessons = course?.lessons?.length || 0;
  const progressPercent =
    totalLessons === 0 ? 0 : Math.round((completedLessonsCount / totalLessons) * 100);
  const isOwner = course?.owner.id === user?.id;
  const isStudent = course?.students?.some((s) => s.id === user?.id);
  const canAccess = isOwner || isStudent;

  return (
    canAccess && (
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Progress</h2>
          {progressPercent === 100 && (
            <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium gap-1">
              <CheckCircle size={18} />
              Completed!
            </div>
          )}
        </div>

        {/* Animated Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Course progress"
          className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-5 overflow-hidden"
        >
          <motion.div
            className="h-5 bg-blue-600 dark:bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">{completedLessonsCount}</span>{' '}
          of <span className="font-medium text-gray-900 dark:text-white">{totalLessons}</span>{' '}
          lessons completed ({progressPercent}%)
        </p>
      </section>
    )
  );
}
