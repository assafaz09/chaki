import React, { useRef, useEffect, useState } from "react";

export default function InfiniteCarousel({
  images,
  speed = 40,
  pauseOnHover = true,
  className = "",
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(null);
  const frameRef = useRef();
  const resumeTimeout = useRef();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Measure content width with ResizeObserver
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;

    const updateWidth = () => {
      const width = el.scrollWidth / 2;
      setContentWidth(width);
    };

    updateWidth();

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(el);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [images]);

  // Animation loop
  useEffect(() => {
    if (reduceMotion || paused || !contentWidth) return;

    const step = (now) => {
      if (lastTimeRef.current == null) lastTimeRef.current = now;
      const dt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      offsetRef.current += speed * dt;
      if (offsetRef.current >= contentWidth) {
        offsetRef.current -= contentWidth;
      }

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      lastTimeRef.current = null;
      cancelAnimationFrame(frameRef.current);
    };
  }, [paused, speed, contentWidth, reduceMotion]);

  // Reset transform when motion reduced or width changes
  useEffect(() => {
    if (!contentRef.current) return;
    if (!contentWidth || reduceMotion) {
      offsetRef.current = 0;
      contentRef.current.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    offsetRef.current = offsetRef.current % contentWidth;
    contentRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
  }, [contentWidth, reduceMotion]);

  // Pause on scroll/wheel/touchmove/user drag
  useEffect(() => {
    function pause() {
      setPaused(true);
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = setTimeout(() => setPaused(false), 400);
    }
    const containerEl = containerRef.current;
    window.addEventListener("scroll", pause, { passive: true });
    window.addEventListener("wheel", pause, { passive: true });
    window.addEventListener("touchmove", pause, { passive: true });
    if (containerEl) {
      containerEl.addEventListener("mousedown", pause);
      containerEl.addEventListener("touchstart", pause);
      containerEl.addEventListener("scroll", pause);
    }
    return () => {
      window.removeEventListener("scroll", pause);
      window.removeEventListener("wheel", pause);
      window.removeEventListener("touchmove", pause);
      if (containerEl) {
        containerEl.removeEventListener("mousedown", pause);
        containerEl.removeEventListener("touchstart", pause);
        containerEl.removeEventListener("scroll", pause);
      }
      clearTimeout(resumeTimeout.current);
    };
  }, []);

  // Pause on hover
  useEffect(() => {
    if (!pauseOnHover) return;
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [pauseOnHover]);

  // Pause on tab hidden
  useEffect(() => {
    function handleVisibility() {
      setPaused(document.visibilityState !== "visible");
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(resumeTimeout.current);
    };
  }, []);

  // Render images twice for seamless loop
  const allImages = [...images, ...images];

  // Manual scroll support
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    function onMouseDown(e) {
      isDragging = true;
      startX = e.pageX;
      scrollStart = el.scrollLeft;
      setPaused(true);
    }
    function onMouseMove(e) {
      if (!isDragging) return;
      const dx = e.pageX - startX;
      el.scrollLeft = scrollStart - dx;
    }
    function onMouseUp() {
      isDragging = false;
      setPaused(false);
    }
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support
    let touchStartX = 0;
    let touchScrollStart = 0;
    function onTouchStart(e) {
      isDragging = true;
      touchStartX = e.touches[0].pageX;
      touchScrollStart = el.scrollLeft;
      setPaused(true);
    }
    function onTouchMove(e) {
      if (!isDragging) return;
      const dx = e.touches[0].pageX - touchStartX;
      el.scrollLeft = touchScrollStart - dx;
    }
    function onTouchEnd() {
      isDragging = false;
      setPaused(false);
    }
    el.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Image carousel (autoscroll)"
      className={`relative overflow-hidden w-full ${className}`}
      style={{ touchAction: "pan-x" }} // גלילה אופקית בלבד
    >
      <div
        ref={contentRef}
        className="flex gap-4"
        style={{
          transition: paused || reduceMotion ? "none" : undefined,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {allImages.map((src, i) => {
          const lower = typeof src === "string" ? src.toLowerCase() : "";
          const isVideo =
            lower.endsWith(".mp4") ||
            lower.endsWith(".mov") ||
            lower.includes("/video/");
          return (
            <div
              key={i}
              className="flex-shrink-0 h-40 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setFullscreenImage(src)}
            >
              {isVideo ? (
                <video
                  src={src}
                  className="h-full w-auto object-cover block"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={src}
                  alt=""
                  className="h-full w-auto object-cover block"
                  draggable={false}
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
      {/* מודאל תמונה */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] p-4 flex items-center justify-center">
            {(() => {
              const lower =
                typeof fullscreenImage === "string"
                  ? fullscreenImage.toLowerCase()
                  : "";
              const isVideo =
                lower.endsWith(".mp4") ||
                lower.endsWith(".mov") ||
                lower.includes("/video/");
              return isVideo ? (
                <video
                  src={fullscreenImage}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={fullscreenImage}
                  alt="Full size carousel image"
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              );
            })()}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(null);
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

// Usage example:
{
  /* 
<InfiniteCarousel
  images={[
    "https://images.unsplash.com/photo-1",
    "https://images.unsplash.com/photo-2",
    "https://images.unsplash.com/photo-3",
    "https://images.unsplash.com/photo-4",
  ]}
/>
*/
}
