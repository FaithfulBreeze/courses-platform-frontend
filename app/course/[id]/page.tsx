'use client';

import { AuthContext } from '@/contexts/AuthContext';
import { ClientContext } from '@/contexts/ClientContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { fetchCourse } from '@/repositories/fetchCourse';
import { Course, User } from '@/types.generated';
import { useContext, useEffect, useRef, useState } from 'react';
import { Clock, User2, PlayCircle, Star, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GoBack from '@/components/go-back';
import VideoEmbed from '@/components/video-embed';
import Tab from '@/components/tab';
import ReviewList from '@/components/review-list';
import LessonProgressBar from '@/components/lesson-progress-bar';
import LessonList from '@/components/lesson-list';
import { fetchUser } from '@/repositories/fetchUser';

interface ICoursePageProps {
  params: Promise<{ id: string }>;
}

interface ICoursePageStateProps {
  id?: number;
  course?: Course;
  currentUser?: User;
}

export default function CoursePage({ params }: ICoursePageProps) {
  const [state, setState] = useState<ICoursePageStateProps>({});
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'lessons' | 'reviews'>('lessons');
  const trailerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const authContext = useContext(AuthContext);
  const { client } = useContext(ClientContext);

  useEffect(() => {
    useProtectedRoute(authContext);
    params.then(({ id }) => {
      setState((prev) => ({ ...prev, id: parseInt(id) }));
    });
  }, []);

  useEffect(() => {
    if (!state.id || !client) return;
    fetchCourse({ id: state.id, client }).then((course) => {
      setState((prev) => ({ ...prev, course }));
    });
  }, [state.id]);

  useEffect(() => {
    if (!state.id || !client) return;

    if (authContext.user.id)
      fetchUser({ id: authContext.user.id, client }).then((user) => {
        setState((prev) => ({ ...prev, currentUser: user }));
      });
  }, [state.course]);

  const course = state.course;
  const currentUser = state.currentUser;

  useEffect(() => {
    if (isTrailerPlaying && course?.trailerDuration) {
      trailerTimeoutRef.current = setTimeout(() => {
        setIsTrailerPlaying(false);
      }, course.trailerDuration * 1000);
    }

    return () => {
      if (trailerTimeoutRef.current) {
        clearTimeout(trailerTimeoutRef.current);
        trailerTimeoutRef.current = null;
      }
    };
  }, [isTrailerPlaying, course?.trailerDuration]);

  return (
    <>
      <GoBack />

      <Tab
        tabs={[
          { key: 'lessons', label: 'Lessons', icon: BookOpen },
          { key: 'reviews', label: 'Reviews', icon: Star },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Video Section */}
        <section className="relative rounded-xl overflow-hidden aspect-video w-full shadow-xl bg-black">
          <AnimatePresence>
            {!isTrailerPlaying ? (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  className="absolute inset-0 object-cover w-full h-full"
                  src={course?.thumbnail}
                  alt={`Thumbnail for course: ${course?.title}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

                {course?.trailer && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsTrailerPlaying(true)}
                      className="text-white/80 hover:text-white hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                      aria-label="Play course trailer"
                    >
                      <PlayCircle size={96} strokeWidth={1} />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h1 className="text-4xl font-bold text-white drop-shadow-md">{course?.title}</h1>
                  <div className="mt-3 flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {course?.duration || '0m'}
                    </span>
                    <span className="flex items-center gap-1">
                      <User2 size={16} />
                      <a href={`/user/${course?.owner?.id}`} className="hover:underline">
                        {course?.owner?.name}
                      </a>
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <VideoEmbed
                  className="w-full h-full"
                  hideOverlayControls={true}
                  autoPlay={true}
                  src={`${course?.trailer}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {activeTab === 'lessons' && (
          <>
            {currentUser && course && <LessonProgressBar course={course} user={currentUser} />}

            {currentUser && course && <LessonList user={currentUser} course={course} />}
          </>
        )}

        {activeTab === 'reviews' && course?.reviews && (
          <ReviewList heading="Course Reviews" reviews={course.reviews} />
        )}
      </main>
    </>
  );
}
