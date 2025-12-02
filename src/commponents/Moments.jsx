import React, { useState, useRef, useCallback } from "react";

export default function Moments({ videos = [] }) {
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

  // Touch handlers for vertical swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 100;
    const isDownSwipe = distance < -100;

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

  // Handle mouse wheel scrolling (vertical)
  const handleWheel = useCallback(
    (e) => {
      // Prevent default scrolling to keep scroll only inside the section
      e.preventDefault();
      e.stopPropagation();

      if (isScrolling) return;

      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 50) return;

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

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    },
    [currentVideoIndex, videoList.length, isScrolling]
  );

  // Set up passive: false for wheel event to allow preventDefault
  const sectionRef = useRef(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel, { passive: false });
    };
  }, [handleWheel]);

  return (
    <div
      className="w-full max-w-4xl mx-auto h-[600px] overflow-hidden bg-black relative rounded-lg"
      ref={sectionRef}
      // Do not set onWheel here, we control wheel listener above
    >
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
        style={{ touchAction: "pan-y" }}
      >
        <div
          className="flex flex-col h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(-${currentVideoIndex * 100}%)`,
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
                  <div className="w-15 h-15 flex items-center justify-center">
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
