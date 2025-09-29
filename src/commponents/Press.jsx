import React, { useState } from "react";

export default function Press({ images = [] }) {
  const [fullscreenImage, setFullscreenImage] = useState(null);

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

  const openFullscreen = (imageSrc) => setFullscreenImage(imageSrc);
  const closeFullscreen = () => setFullscreenImage(null);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-2xl text-white drop-shadow-[0_0_8px_black] [text-shadow:0_0_16px_black,0_0_24px_black] mb-6 text-center">
          New module
        </h2>
        {/* גלריה אופקית חופשית */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2">
          {imageList.map((src, idx) => (
            <div
              key={idx}
              className="w-48 h-64 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
              onClick={() => openFullscreen(src)}
            >
              <img
                src={src}
                alt={`Press image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
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
    </>
  );
}
