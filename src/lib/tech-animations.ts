'use client';

import { useState, useRef, useEffect } from 'react';

type TechAnimationResult = {
  activeTitle: string;
  activeTech: string | null;
  handleTechClick: (techName: string) => void;
  handleHoverStart: (techName: string) => void;
  handleHoverEnd: () => void;
  cleanupAnimations: () => void;
};

export function useTechAnimations(defaultTitle: string = 'Technologies'): TechAnimationResult {
  const [activeTitle, setActiveTitle] = useState(defaultTitle);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const titleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const techTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef<boolean>(false);

  // Handle technology click
  const handleTechClick = (techName: string) => {
    // Clear any existing timers
    if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    if (techTimerRef.current) clearTimeout(techTimerRef.current);

    // If clicking the same tech, toggle it off
    if (activeTech === techName) {
      setActiveTech(null);
      setActiveTitle(defaultTitle);
    } else {
      // Otherwise, set this tech as active
      setActiveTech(techName);
      setActiveTitle(techName);
      
      // Set timers to reset both after 2 seconds
      titleTimerRef.current = setTimeout(() => {
        setActiveTitle(defaultTitle);
      }, 2000);
      
      techTimerRef.current = setTimeout(() => {
        setActiveTech(null);
      }, 2000);
    }
  };

  // Handle hover start
  const handleHoverStart = (techName: string) => {
    isHoveringRef.current = true;
    
    // Clear previous title timer if exists
    if (titleTimerRef.current) {
      clearTimeout(titleTimerRef.current);
    }
    
    // Update title to tech name
    setActiveTitle(techName);
  };

  // Handle hover end
  const handleHoverEnd = () => {
    isHoveringRef.current = false;
    
    // Set timer to reset title after 2 seconds
    if (titleTimerRef.current) {
      clearTimeout(titleTimerRef.current);
    }
    
    titleTimerRef.current = setTimeout(() => {
      // Only reset if no tech is active (from clicking)
      if (!activeTech) {
        setActiveTitle(defaultTitle);
      }
    }, 2000);
  };

  // Cleanup function
  const cleanupAnimations = () => {
    if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    if (techTimerRef.current) clearTimeout(techTimerRef.current);
  };

  // Cleanup on unmount
  useEffect(() => {
    return cleanupAnimations;
  }, []);

  return {
    activeTitle,
    activeTech,
    handleTechClick,
    handleHoverStart,
    handleHoverEnd,
    cleanupAnimations
  };
}