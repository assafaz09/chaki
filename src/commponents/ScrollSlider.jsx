import React, { useState, useEffect } from 'react';

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
      const progress = totalScrollableDistance > 0 ? (scrollTop / totalScrollableDistance) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // קריאה ראשונית

    return () => window.removeEventListener('scroll', handleScroll);
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
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSliderClick(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleSliderClick(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed right-3 top-1/2 -translate-y-1/2 z-50 
        w-2 h-32 
        bg-white/20 backdrop-blur-sm rounded-full 
        border border-white/30
        cursor-pointer
        transition-all duration-300 ease-out
        hover:w-3 hover:bg-white/30 hover:scale-110
        ${isDragging ? 'w-3 bg-white/40 scale-110' : ''}
      `}
      onClick={handleSliderClick}
      onMouseDown={handleMouseDown}
      title={`גלילה: ${Math.round(scrollProgress)}%`}
    >
      {/* המחוון של המיקום הנוכחי */}
      <div 
        className={`
          absolute left-1/2 -translate-x-1/2 
          w-3 h-3 
          bg-white rounded-full 
          transition-all duration-200 ease-out
          border border-white/50
          ${isDragging ? 'scale-125 bg-white shadow-lg' : ''}
          hover:scale-110 hover:bg-white hover:shadow-md
        `}
        style={{
          top: `${scrollProgress}%`,
          transform: 'translateX(-50%) translateY(-50%)'
        }}
      >
        {/* זוהר כשלוחצים */}
        {isDragging && (
          <div className="absolute inset-0 rounded-full bg-white animate-pulse opacity-50"></div>
        )}
      </div>
      
      {/* קו התקדמות */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-1 bg-white/60 rounded-full transition-all duration-200"
        style={{
          height: `${scrollProgress}%`,
          top: 0
        }}
      ></div>
    </div>
  );
};

export default ScrollSlider;