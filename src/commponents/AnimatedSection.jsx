import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(30px)";
      case "down":
        return "translateY(-30px)";
      case "left":
        return "translateX(30px)";
      case "right":
        return "translateX(-30px)";
      case "scale":
        return "scale(0.95)";
      default:
        return "translateY(30px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting
          ? "translateY(0) translateX(0) scale(1)"
          : getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;




