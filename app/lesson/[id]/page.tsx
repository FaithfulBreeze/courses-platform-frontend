'use client';

import { Container } from '@/components/container';
import GoBack from '@/components/go-back';
import LessonList from '@/components/lesson-list';
import ReviewList from '@/components/review-list';
import { SectionGroup } from '@/components/section-group';
import Tab from '@/components/tab';
import VideoJS from '@/components/video-player';
import { AuthContext } from '@/contexts/AuthContext';
import { ClientContext } from '@/contexts/ClientContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { fetchLesson } from '@/repositories/fetchLesson';
import { fetchUser } from '@/repositories/fetchUser';
import { Lesson, User } from '@/types.generated';
import { BookOpen, Star } from 'lucide-react';
import { useState, useRef, useContext, useEffect, useMemo } from 'react';
import Player from 'video.js/dist/types/player';

interface ILessonPageProps {
  params: Promise<{ id: string }>;
}

interface ILessonPageStateProps {
  id?: number;
  lesson?: Lesson;
  currentUser?: User;
}

export default function LessonPage({ params }: ILessonPageProps) {
  const [state, setState] = useState<ILessonPageStateProps>({});
  const [activeTab, setActiveTab] = useState<'lessons' | 'reviews'>('lessons');
  const playerRef = useRef<Player>(null);

  const authContext = useContext(AuthContext);
  const { client } = useContext(ClientContext);

  useEffect(() => {
    useProtectedRoute(authContext);
    params.then(({ id }) => setState((prev) => ({ ...prev, id: parseInt(id) })));
  }, []);

  useEffect(() => {
    if (!state.id || !client) return;
    fetchUser({ client, id: state.id }).then((user) => {
      setState((prev) => ({ ...prev, currentUser: user }));
    });
    fetchLesson({ client, id: state.id }).then((lesson) => {
      setState((prev) => ({ ...prev, lesson }));
    });
  }, [authContext.user?.id]);

  const videoJsOptions = useMemo(
    () => ({
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      poster: state.lesson?.thumbnail,
      sources: [
        {
          src: state.lesson?.url,
          type: 'application/x-mpegURL',
        },
      ],
    }),
    [state.lesson?.url],
  );

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;
  };

  return (
    <>
      {state.lesson?.course && (
        <GoBack label={`Go to course`} href={`/course/${state.lesson?.course.id}`} />
      )}
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
        <SectionGroup>
          {state.lesson && state.lesson.url ? (
            <div className="rounded-lg overflow-hidden shadow-lg aspect-video xl">
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>
          ) : (
            <div className="rounded-lg animate-pulse duration-[10s] bg-gray-200 dark:bg-gray-700 shadow-lg aspect-video h-full w-full"></div>
          )}
          {/* Lessons */}
          {activeTab === 'lessons' && state.currentUser && state.lesson && (
            <LessonList
              user={state.currentUser}
              course={state.lesson.course}
              currentLesson={state.lesson}
            />
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && state.lesson?.reviews && <ReviewList lesson={state.lesson} />}
        </SectionGroup>
      </Container>
    </>
  );
}
