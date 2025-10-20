import React, { useState, useRef, useEffect } from "react";

export default function Gallery({ images = [] }) {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

  // תמונות דיפולטיות אם לא התקבלו
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

  // גלילה אוטומטית
  useEffect(() => {
    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
        // אם הגענו לסוף, חזור להתחלה
        if (
          scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 2500); // כל 1 שניה

    return () => clearInterval(autoScrollInterval.current);
  }, []);

  // עצור גלילה אוטומטית כשהמשתמש גולל ידנית
  const handleUserScroll = () => {
    clearInterval(autoScrollInterval.current);
    // חזור לגלילה אוטומטית אחרי 20 שניות
    setTimeout(() => {
      autoScrollInterval.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
          // אם הגענו לסוף, חזור להתחלה
          if (
            scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
            scrollRef.current.scrollWidth
          ) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          }
        }
      }, 2500);
    }, 20000);
  };

  const openFullscreen = (imageSrc) => setFullscreenImage(imageSrc);
  const closeFullscreen = () => setFullscreenImage(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] mb-6 text-center">
        Gallery
      </h2>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-2"
        style={{ width: "100%", maxWidth: "100vw" }}
        onScroll={handleUserScroll}
        onTouchStart={handleUserScroll}
        onMouseDown={handleUserScroll}
      >
        {imageList.map((src, idx) => (
          <div
            key={idx}
            className="w-32 h-40 sm:w-40 sm:h-56 md:w-48 md:h-64 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
            onClick={() => openFullscreen(src)}
          >
            <img
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* מודאל תמונה */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
          onClick={closeFullscreen}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] p-4 flex items-center justify-center">
            <img
              src={fullscreenImage}
              alt="Full size gallery image"
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
  );
}
