import React, { useState, useEffect } from "react";

export default function Press({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [mouseStart, setMouseStart] = useState(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Default images if none provided
  const defaultImages = [
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample2.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample3.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample4.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample5.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample6.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample7.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample8.jpg",
    "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_300/sample9.jpg",
  ];

  const imageList = images.length > 0 ? images : defaultImages;
  const imagesPerView = 2; // Show 2 images at a time
  const totalSlides = Math.ceil(imageList.length / imagesPerView);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds (slower)
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, totalSlides]);

  // Hide scroll hint after first interaction
  useEffect(() => {
    if (isDragging) {
      setShowScrollHint(false);
    }
  }, [isDragging]);

  // Show scroll hint again after 3 seconds of inactivity
  useEffect(() => {
    if (!isDragging && !showScrollHint) {
      const timer = setTimeout(() => {
        setShowScrollHint(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDragging, showScrollHint]);

  // Touch handlers for mobile swipe with dynamic animation
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentTouch = e.targetTouches[0].clientX;
    const deltaX = currentTouch - touchStart;
    setDragOffset(deltaX);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragOffset(0);

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mouse handlers for desktop drag
  const handleMouseDown = (e) => {
    e.preventDefault();
    setMouseStart(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !mouseStart) return;

    const deltaX = e.clientX - mouseStart;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging || !mouseStart) return;

    setIsDragging(false);
    setDragOffset(0);

    const distance = mouseStart - (mouseStart + dragOffset);
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const openFullscreen = (imageSrc) => {
    setFullscreenImage(imageSrc);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black] mb-6 text-center">
          New Module
        </h2>

        <div className="relative">
          {/* Dynamic Scroll Hint */}

          {/* Touch/Swipe Container */}
          <div
            className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Images Container */}
            <div
              className={`flex ${
                isDragging
                  ? "transition-none"
                  : "transition-transform duration-500 ease-out"
              }`}
              style={{
                transform: `translateX(calc(-${
                  currentIndex * 100
                }% + ${dragOffset}px))`,
              }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 flex gap-2 p-2"
                >
                  {imageList
                    .slice(
                      slideIndex * imagesPerView,
                      (slideIndex + 1) * imagesPerView
                    )
                    .map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="flex-1 aspect-square rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => openFullscreen(image)}
                      >
                        <img
                          src={image}
                          alt={`Press image ${
                            slideIndex * imagesPerView + imgIndex + 1
                          }`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeFullscreen}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <img
              src={fullscreenImage}
              alt="Full size press image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close fullscreen"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
