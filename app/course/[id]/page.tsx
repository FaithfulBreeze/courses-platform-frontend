'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ClientContext } from '@/contexts/ClientContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { fetchCourse } from '@/repositories/fetchCourse';
import { fetchUser } from '@/repositories/fetchUser';
import { Course, User } from '@/types.generated';

import { BookOpen, Star } from 'lucide-react';

import GoBack from '@/components/go-back';
import Tab from '@/components/tab';
import LessonProgressBar from '@/components/lesson-progress-bar';
import LessonList from '@/components/lesson-list';
import ReviewList from '@/components/review-list';

import { Container } from '@/components/container';
import { SectionGroup } from '@/components/section-group';
import CourseTrailer from '@/components/video-trailer';

interface ICoursePageProps {
  params: Promise<{ id: string }>;
}

export default function CoursePage({ params }: ICoursePageProps) {
  const [state, setState] = useState<{ id?: number; course?: Course; currentUser?: User }>({});
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'lessons' | 'reviews'>('lessons');
  const trailerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const authContext = useContext(AuthContext);
  const { client } = useContext(ClientContext);

  useEffect(() => {
    useProtectedRoute(authContext);
    params.then(({ id }) => setState((prev) => ({ ...prev, id: parseInt(id) })));
  }, []);

  useEffect(() => {
    if (!state.id || !client) return;
    fetchCourse({ id: state.id, client }).then((course) => {
      setState((prev) => ({ ...prev, course }));
    });
  }, [state.id]);

  useEffect(() => {
    if (!state.course || !authContext.user?.id || !client) return;
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
        classNames="mt-12"
      />
      <Container className="py-10">
        <SectionGroup spacing={16}>
          {/* Video / Trailer Section */}
          <CourseTrailer
            course={course}
            isPlaying={isTrailerPlaying}
            onPlay={() => setIsTrailerPlaying(true)}
            onEnd={() => setIsTrailerPlaying(false)}
          />

          {/* Lessons */}
          {activeTab === 'lessons' && currentUser && course && (
            <>
              <LessonProgressBar user={currentUser} course={course} />

              <LessonList user={currentUser} course={course} />
            </>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && course?.reviews && (
            <ReviewList heading="Course Reviews" reviews={course.reviews} />
          )}
        </SectionGroup>
      </Container>
    </>
  );
}
