import React, { useState, useRef, useCallback } from "react";

export default function HorizontalVideoCarousel({ videos = [] }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const videoRefs = useRef([]);
  const scrollTimeout = useRef(null);

  // Default videos placeholder - החלף את אלה עם הסרטונים שלך
  const defaultVideos = [
    "VIDEO_URL_1",
    "VIDEO_URL_2",
    "VIDEO_URL_3",
    "VIDEO_URL_4",
    "VIDEO_URL_5",
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  // Toggle play/pause
  const togglePlay = async () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      try {
        if (isPlaying) {
          currentVideo.pause();
          setIsPlaying(false);
        } else {
          currentVideo.muted = false; // הפעל את הסאונד
          await currentVideo.play();
          setIsPlaying(true);
        }
      } catch {
        console.log("Video play/pause interrupted");
      }
    }
  };

  // Touch handlers for horizontal swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentVideoIndex < videoList.length - 1) {
      // Swipe left - next video
      setCurrentVideoIndex((prev) => prev + 1);
      setIsPlaying(false);
    } else if (isRightSwipe && currentVideoIndex > 0) {
      // Swipe right - previous video
      setCurrentVideoIndex((prev) => prev - 1);
      setIsPlaying(false);
    }
  };

  // Pause all videos when switching
  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentVideoIndex) {
        try {
          video.pause();
        } catch {
          // Ignore pause errors
        }
      }
    });
    setIsPlaying(false);
  }, [currentVideoIndex]);

  // Pause videos when they go out of view (using Intersection Observer)
  React.useEffect(() => {
    const observers = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              // Video is out of view - pause it
              try {
                video.pause();
                // If this was the current playing video, update isPlaying state
                if (index === currentVideoIndex) {
                  setIsPlaying(false);
                }
              } catch {
                // Ignore pause errors
              }
            }
            // When video comes back into view, don't auto-play
            // User needs to click play manually
          });
        },
        {
          threshold: 0.5, // Consider out of view when less than 50% visible
          rootMargin: "0px",
        }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [videoList.length, currentVideoIndex]);

  // Handle mouse wheel scrolling
  const handleWheel = useCallback(
    (e) => {
      e.stopPropagation();

      if (isScrolling) return;

      const delta = e.deltaX || e.deltaY;
      if (Math.abs(delta) < 50) return;

      setIsScrolling(true);

      if (delta > 0 && currentVideoIndex < videoList.length - 1) {
        // Scroll right - next video
        setCurrentVideoIndex((prev) => prev + 1);
        setIsPlaying(false);
      } else if (delta < 0 && currentVideoIndex > 0) {
        // Scroll left - previous video
        setCurrentVideoIndex((prev) => prev - 1);
        setIsPlaying(false);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    },
    [currentVideoIndex, videoList.length, isScrolling]
  );

  return (
    <div className="w-full max-w-4xl mx-auto h-[245px] overflow-hidden bg-black relative rounded-lg">
      {/* Swipe Hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/60 text-sm">
        <div className="flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
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
        style={{ touchAction: "pan-x" }}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentVideoIndex * 100}%)`,
          }}
        >
          {videoList.map((videoSrc, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play/Pause Button - only show on current video */}
              {index === currentVideoIndex && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-15 h-15 rounded-full bg-black/50 flex items-center justify-center">
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

      {/* Video Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {videoList.map((_, index) => (
          <div
            key={index}
            className={` rounded-full transition-colors ${
              index === currentVideoIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
