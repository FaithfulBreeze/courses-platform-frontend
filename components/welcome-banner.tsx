import { Lesson } from '@/types.generated';

interface WelcomeBannerProps {
  name: string;
  lastWatchedLesson?: Lesson;
}

export function WelcomeBanner({ name, lastWatchedLesson }: WelcomeBannerProps) {
  const renderLessonPreview = () => {
    if (lastWatchedLesson) {
      return (
        <a
          href={`/lesson/${lastWatchedLesson.id}`}
          className="group relative w-full sm:w-56 md:w-72 lg:w-96 rounded-xl border-gray-200 overflow-hidden shadow-lg aspect-video cursor-pointer transition-transform hover:scale-[1.01]"
          aria-label={`Continue watching: ${lastWatchedLesson.title}`}
        >
          <img
            src={lastWatchedLesson.thumbnail}
            alt={`Thumbnail for lesson ${lastWatchedLesson.title}`}
            className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-10">
            <h3 className="text-sm sm:text-base font-semibold line-clamp-1">
              {lastWatchedLesson.title}
            </h3>
          </div>
        </a>
      );
    }

    return (
      <div className="w-full sm:w-56 md:w-72 lg:w-96 bg-black/30 rounded-xl flex items-center justify-center aspect-video text-white text-sm sm:text-base text-center">
        {name ? 'No lesson to continue yet' : ''}
      </div>
    );
  };

  const renderSkeleton = () => (
    <div className="w-full sm:w-56 md:w-72 lg:w-96 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl aspect-video" />
  );

  return (
    <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg min-h-[200px] sm:min-h-[240px] flex flex-col sm:flex-row items-center justify-between p-4 sm:p-8 gap-4">
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
          {name ? `Welcome back, ${name} 👋` : 'Welcome back!'}
        </h2>
        <p className="text-sm sm:text-lg text-gray-300">Ready to continue where you left off?</p>
      </div>

      {name ? renderLessonPreview() : renderSkeleton()}
    </section>
  );
}
