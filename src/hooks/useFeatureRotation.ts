import { useState, useEffect } from "react";
import { Feature } from "../types/Feature";

// hooks/useFeatureRotation.ts
export function useFeatureRotation(features: Feature[], interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % features.length);
    }, interval);
    return () => clearInterval(timer);
  }, [features.length, interval]);

  return {
    currentIndex,
    visibleFeatures: [
      features[currentIndex],
      features[(currentIndex + 1) % features.length],
      features[(currentIndex + 2) % features.length]
    ]
  };
}