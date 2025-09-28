import React, { useState, useEffect } from "react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a short delay
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Progress animation
    const progressTimer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          // Complete loading after 5 seconds total
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Main Image */}
        <div className="mb-8 ">
          <img
            src="https://res.cloudinary.com/dpgnqgyxe/image/upload/v1759079734/%D7%A2%D7%99%D7%A6%D7%95%D7%91_%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_9_vl48li.png"
            alt="CHAKI Loading"
            className="w-72 h-72 mx-auto rounded-full object-cover animate-pulse"
          />
        </div>

        {/* CHAKI Text */}
        <h1 className="text-4xl font-bold text-white mb-8 animate-bounce">
          CHAKI
        </h1>

        {/* Loading Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"
            style={{
              animationDuration: "1s",
            }}
          ></div>
        </div>

        {/* Progress Bar */}
        {showContent && (
          <div className="w-64 mx-auto mb-4">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-white/80 text-sm mt-2">{loadingProgress}%</p>
          </div>
        )}

        {/* Loading Text */}
        {showContent && (
          <p className="text-white/60 text-lg animate-pulse">
            Loading amazing content...
          </p>
        )}
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/5 rounded-full animate-ping"></div>
        <div
          className="absolute top-1/4 -right-10 w-16 h-16 bg-white/5 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-10 w-12 h-12 bg-white/5 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-10 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-ping"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;