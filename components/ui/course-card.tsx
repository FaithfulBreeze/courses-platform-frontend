import { Course } from '@/types.generated';
import { Card, CardDescription } from './card';

interface ICourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
}

export function CourseCard({ course, showProgress = false, progress = 0 }: ICourseCardProps) {
  return (
    <a href={`/course/${course?.id}`}>
      <Card className="group p-0 relative overflow-hidden  border-gray-300 aspect-video w-full rounded-xl shadow-lg  hover:shadow-2xl transition-shadow duration-300 cursor-pointer ">
        <div className="relative w-full h-full overflow-hidden">
          {/* Thumbnail */}
          <img
            src={course?.thumbnail || '/placeholder-course.jpg'}
            alt={`Thumbnail for course ${course?.name}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />

          {/* Gradient overlay behind name and icons */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 py-6 min-h-[80px] flex justify-between items-end z-10 rounded-b-xl">
            <h3 className="text-xl font-semibold text-white line-clamp-1 drop-shadow-md">
              {course?.name}
            </h3>

            {/* Play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-black/40 p-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          {/* Description overlay: only visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-black/70 to-black/80 backdrop-blur-sm p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl z-20">
            <CardDescription className="text-gray-300 text-sm line-clamp-3 mb-3">
              {course?.description}
            </CardDescription>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                {/* User icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rounded-full bg-black/30 p-[2px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a7 7 0 0 1 13 0" />
                </svg>
                <a className="hover:underline" href={`/user/${course?.owner.id}`}>
                  {course?.owner?.name || 'Instructor'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                {/* Clock icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 rounded-full bg-black/30 p-[2px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span>{course?.duration || '0m'}</span>
              </div>
            </div>
          </div>
        </div>

        {!showProgress && (
          <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gray-800/70 rounded-b-xl overflow-hidden shadow-inner z-30">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress || 40}%` }}
            />
          </div>
        )}
      </Card>
    </a>
  );
}
