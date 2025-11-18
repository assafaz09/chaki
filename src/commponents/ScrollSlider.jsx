import React, { useState, useEffect } from "react";

const ScrollSlider = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // הצגת הסליידר רק אחרי גלילה קטנה
      setIsVisible(scrollTop > 50);

      // חישוב אחוז הגלילה
      const totalScrollableDistance = documentHeight - windowHeight;
      const progress =
        totalScrollableDistance > 0
          ? (scrollTop / totalScrollableDistance) * 100
          : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // קריאה ראשונית

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSliderClick = (e) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - sliderRect.top;
    const sliderHeight = sliderRect.height;
    const clickPercentage = (clickY / sliderHeight) * 100;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = documentHeight - windowHeight;
    const targetScrollTop = (clickPercentage / 100) * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderClick(e);

    // הוספת מאזין לתנועת עכבר כדי לשפר רגישות
    document.body.style.userSelect = "none";
  };

  // טיפול בגלילת עכבר מעל הסליידר
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const scrollSpeed = 100; // מהירות גלילה
    const delta = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;

    window.scrollBy({
      top: delta,
      behavior: "smooth",
    });
  };

  // טיפול בלחיצה ארוכה ורגישות משופרת
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const touch = e.touches[0];
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const touchY = touch.clientY - sliderRect.top;
    const sliderHeight = sliderRect.height;
    const clickPercentage = (touchY / sliderHeight) * 100;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = documentHeight - windowHeight;
    const targetScrollTop = (clickPercentage / 100) * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      if (!isDragging) return;
      handleSliderClick(e);
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
    };

    if (isDragging) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);

      return () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      };
    }
  }, [isDragging]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed right-3 top-1/2 -translate-y-1/2 z-50 
        w-6 h-32 
        bg-white/20 backdrop-blur-sm rounded-full 
        border border-white/30
        cursor-pointer
        transition-all duration-300 ease-out
        hover:w-7 hover:bg-white/30 hover:scale-105
        ${isDragging ? "w-7 bg-white/40 scale-105" : ""}
        hidden md:block
      `}
      onClick={handleSliderClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
      data-scroll-slider
      title={`גלילה: ${Math.round(scrollProgress)}%`}
    >
      {/* המחוון של המיקום הנוכחי */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 
          w-4 h-4
          bg-white rounded-full 
          transition-all duration-200 ease-out
          border border-white/40
          ${isDragging ? "scale-110 bg-white shadow-md" : ""}
          hover:scale-105 hover:bg-white hover:shadow-sm
        `}
        style={{
          top: `${scrollProgress}%`,
          transform: "translateX(-50%) translateY(-50%)",
        }}
      >
        {/* זוהר כשלוחצים */}
        {isDragging && (
          <div className="absolute inset-0 rounded-full bg-white animate-pulse opacity-30"></div>
        )}
      </div>

      {/* קו התקדמות */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-4 bg-white/50 rounded-full transition-all duration-200"
        style={{
          height: `${scrollProgress}%`,
          top: 0,
        }}
      ></div>
    </div>
  );
};

export default ScrollSlider;
