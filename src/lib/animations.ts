'use client';

import { useState, useRef, useEffect } from 'react';

type TitleAnimationResult = {
  activeTitle: string;
  handleTitleHover: (title: string) => void;
  resetTitleWithDelay: () => void;
};

export function useTitleAnimation(defaultTitle: string = 'Technologies'): TitleAnimationResult {
  const [activeTitle, setActiveTitle] = useState(defaultTitle);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset title after delay when not hovering
  const resetTitleWithDelay = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setActiveTitle(defaultTitle);
    }, 2000);
  };

  const handleTitleHover = (title: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveTitle(title);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    activeTitle,
    handleTitleHover,
    resetTitleWithDelay
  };
}