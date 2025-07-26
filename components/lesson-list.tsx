import { Lock, Clock, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course, User } from '@/types.generated';

interface ILessonListProps {
  user: User;
  course: Course;
}

export default function LessonList({ course, user }: ILessonListProps) {
  const isOwner = course?.owner.id === user?.id;
  const isStudent = course?.students?.some((s) => s.id === user?.id);
  const canAccess = isOwner || isStudent;

  return (
    <section className="relative space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-sm sm:text-2xl font-semibold text-gray-900 dark:text-white">
            Course Lessons
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {course?.lessons.length} lesson{course?.lessons.length !== 1 ? 's' : ''}
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

      <ul
        className={`space-y-4 sm:space-y-6 transition-all ${
          !canAccess ? 'blur-sm pointer-events-none select-none' : ''
        }`}
      >
        {course?.lessons?.map((lesson) => (
          <li
            key={lesson.id}
            tabIndex={canAccess ? 0 : -1}
            className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-3 sm:gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onClick={() => canAccess && (window.location.href = `/lesson/${lesson.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canAccess) {
                window.location.href = `/lesson/${lesson.id}`;
              }
            }}
            role="button"
            aria-label={`Open lesson: ${lesson.title}`}
          >
            <img
              src={lesson.thumbnail}
              alt={lesson.title}
              className="w-full sm:w-40 h-28 object-cover rounded-lg flex-shrink-0"
              loading="lazy"
            />

            <div className="flex-1 flex flex-col justify-between w-full">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-1 sm:mb-2">
                {lesson.description}
              </p>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock size={12} /> {lesson.duration || '0m'}
              </span>
            </div>

            {isOwner && (
              <div className="flex gap-2 sm:gap-3 self-end sm:self-center mt-2 sm:mt-0">
                <button
                  title="Edit Lesson"
                  className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Edit lesson ${lesson.title}`);
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button
                  title="Delete Lesson"
                  className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Delete lesson ${lesson.title}`);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
