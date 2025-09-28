import React, { useState, useRef, useEffect, useCallback } from "react";

export default function Tiktok({ videos = [] }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const videoRefs = useRef([]);
  const scrollTimeout = useRef(null);

  // Default videos if none provided
  const defaultVideos = [
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_20mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_30mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_40mb.mp4",
    "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_50mb.mp4",
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  // Touch handlers for vertical swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    // Prevent page scrolling when touching the video section
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
    // Prevent page scrolling during touch move
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentVideoIndex < videoList.length - 1) {
      // Swipe up - next video
      setCurrentVideoIndex((prev) => prev + 1);
      setIsPlaying(false);
    } else if (isDownSwipe && currentVideoIndex > 0) {
      // Swipe down - previous video
      setCurrentVideoIndex((prev) => prev - 1);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Pause all videos when switching
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        video.pause();
      }
    });
    setIsPlaying(false);
  }, [currentVideoIndex]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Handle mouse wheel scrolling with debouncing
  const handleWheel = useCallback(
    (e) => {
      e.stopPropagation();

      // If already scrolling, ignore additional wheel events
      if (isScrolling) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 50) return; // Ignore small wheel movements

      setIsScrolling(true);

      if (delta > 0 && currentVideoIndex < videoList.length - 1) {
        // Scroll down - next video
        setCurrentVideoIndex((prev) => prev + 1);
        setIsPlaying(false);
      } else if (delta < 0 && currentVideoIndex > 0) {
        // Scroll up - previous video
        setCurrentVideoIndex((prev) => prev - 1);
        setIsPlaying(false);
      }

      // Reset scrolling flag after animation completes
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // Match the CSS transition duration
    },
    [currentVideoIndex, videoList.length, isScrolling]
  );

  return (
    <div className="w-full h-[700px] overflow-hidden bg-black relative touch-none">
      {/* Scroll Indicator */}

      {/* Swipe Hint */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/60 text-sm">
        <div className="flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
          <span className="text-xs">Swipe</span>
        </div>
      </div>

      <div
        className="relative h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div
          className="flex flex-col h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(-${currentVideoIndex * 100}%)`,
          }}
        >
          {videoList.map((video, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                muted={false}
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play/Pause Button - only show on current video */}
              {index === currentVideoIndex && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center">
                    {isPlaying ? (
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
