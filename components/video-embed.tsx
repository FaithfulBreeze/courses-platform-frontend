'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoEmbedProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
  controls?: boolean;
  hideOverlayControls?: boolean;
}

export default function VideoEmbed({
  src,
  poster,
  autoPlay,
  className,
  controls,
  hideOverlayControls,
}: VideoEmbedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay || false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [autoPlay]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden group ${className}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        playsInline
        controls={controls}
        preload="auto"
      />

      {/* Overlay Controls */}
      {!hideOverlayControls && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={togglePlay}
        >
          <button className="bg-white/80 hover:bg-white rounded-full p-3 shadow-lg">
            {isPlaying ? (
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
