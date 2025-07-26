'use client';

import { useEffect, useRef } from 'react';
import { PlayCircle, Clock, User2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoEmbed from '@/components/video-embed';
import { Course } from '@/types.generated';

interface CourseTrailerProps {
  course?: Course;
  isPlaying: boolean;
  onPlay: () => void;
  onEnd: () => void;
}

export default function CourseTrailer({ course, isPlaying, onPlay, onEnd }: CourseTrailerProps) {
  const trailerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && course?.trailerDuration) {
      trailerTimeoutRef.current = setTimeout(() => {
        onEnd();
      }, course.trailerDuration * 1000);
    }

    return () => {
      if (trailerTimeoutRef.current) {
        clearTimeout(trailerTimeoutRef.current);
        trailerTimeoutRef.current = null;
      }
    };
  }, [isPlaying, course?.trailerDuration]);

  return (
    <section className="relative rounded-xl overflow-hidden aspect-video w-full shadow-xl bg-black">
      <AnimatePresence>
        {!isPlaying ? (
          <motion.div
            key="thumbnail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              className="absolute inset-0 object-cover w-full h-full"
              src={course?.thumbnail || '/fallback-thumbnail.jpg'}
              alt={`Thumbnail for course: ${course?.title}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

            {course?.trailer && (
              <div className="absolute inset-0 flex items-center justify-center sm:pt-0">
                <button
                  onClick={onPlay}
                  className="text-white/80 hover:text-white hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  aria-label="Play course trailer"
                >
                  <PlayCircle
                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20"
                    strokeWidth={1}
                  />
                </button>
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 md:px-8 pb-3 sm:pb-4">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-white drop-shadow-md leading-tight line-clamp-2">
                {course?.title}
              </h1>
              <div className="mt-2 hidden sm:flex flex-wrap gap-y-1 gap-x-4 text-white/80 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {course?.duration || '0m'}
                </span>
                <span className="flex items-center gap-1">
                  <User2 size={14} />
                  <a
                    href={`/user/${course?.owner?.id}`}
                    className="hover:underline truncate max-w-[180px] sm:max-w-none"
                  >
                    {course?.owner?.name}
                  </a>
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <VideoEmbed
              className="w-full h-full"
              hideOverlayControls
              autoPlay
              src={`${course?.trailer}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
