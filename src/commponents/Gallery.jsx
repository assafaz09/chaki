import React, { useState, useEffect, useRef } from "react";

export default function Gallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

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

  // Touch handlers for mobile swipe
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
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black] mb-6 text-center">
        Press
      </h2>

      <div className="relative">
        {/* Touch/Swipe Container */}
        <div
          ref={sliderRef}
          className="relative overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images Container */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
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
                        alt={`Gallery image ${
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

        {/* Fullscreen Modal */}
        {fullscreenImage && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
            onClick={closeFullscreen}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] p-4 flex items-center justify-center">
              <img
                src={fullscreenImage}
                alt="Full size press image"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFullscreen();
                }}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 text-white text-3xl hover:bg-black/90 transition-colors"
                aria-label="סגור תמונה"
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
