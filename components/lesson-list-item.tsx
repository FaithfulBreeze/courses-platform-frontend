import { formatDuration } from '@/common/utils/formatDuration';
import { Lesson } from '@/types.generated';
import { Check, Clock, Pencil, Trash2 } from 'lucide-react';

export default function LessonListItem({
  lesson,
  canAccess,
  isCurrentLesson = false,
  isCompleted = false,
  isOwner = false,
}: {
  lesson: Lesson;
  canAccess: boolean;
  isCurrentLesson?: boolean;
  isCompleted?: boolean;
  isOwner?: boolean;
}) {
  return (
    <li
      key={lesson.id}
      tabIndex={canAccess ? 0 : -1}
      className={`${isCurrentLesson ? 'outline-2 outline-blue-500' : ''} bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-3 sm:gap-4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
      onClick={() => canAccess && (window.location.href = `/lesson/${lesson.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && canAccess) {
          window.location.href = `/lesson/${lesson.id}`;
        }
      }}
      role="button"
      aria-label={`Open lesson: ${lesson.title}`}
    >
      <div className="relative">
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          className="w-full sm:w-40 h-28 object-cover rounded-lg flex-shrink-0"
          loading="lazy"
        />

        {isCompleted && (
          <div className="absolute top-0 left-0 rounded-lg bg-black/60 w-full h-full grid place-items-center">
            <Check className=" text-blue-500 bg-white p-2 h-8 w-8 rounded-full" scale={24} />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between w-full">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          {lesson.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-1 sm:mb-2">
          {lesson.description}
        </p>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Clock size={12} /> {lesson.duration ? formatDuration(lesson.duration) : '0m'}
        </span>
      </div>

      {isOwner && (
        <div className="flex gap-2 sm:gap-3 self-end sm:self-center mt-2 sm:mt-0">
          <button
            title="Edit Lesson"
            className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 hover:text-blue-500 transition-all duration-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Edit lesson ${lesson.title}`);
            }}
          >
            <Pencil size={20} />
          </button>
          <button
            title="Delete Lesson"
            className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 hover:text-red-500 transition-all duration-100 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              alert(`Delete lesson ${lesson.title}`);
            }}
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </li>
  );
}
