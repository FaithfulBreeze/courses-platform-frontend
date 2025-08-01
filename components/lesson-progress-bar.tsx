import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ILessonProgressBar {
  lessonsCount: number;
  completedLessonsCount: number;
  canAccess: boolean;
}

export default function LessonProgressBar({
  lessonsCount,
  completedLessonsCount,
  canAccess,
}: ILessonProgressBar) {
  const progressPercent =
    lessonsCount === 0 ? 0 : Math.round((completedLessonsCount / lessonsCount) * 100);

  return (
    canAccess && (
      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Your Progress
          </h2>
          {progressPercent === 100 && (
            <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium gap-1">
              <CheckCircle size={14} />
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
          className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden"
        >
          <motion.div
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <p className="mt-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">{completedLessonsCount}</span>{' '}
          of <span className="font-medium text-gray-900 dark:text-white">{lessonsCount}</span>{' '}
          lessons completed ({progressPercent}%)
        </p>
      </section>
    )
  );
}
