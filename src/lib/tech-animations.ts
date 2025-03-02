'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type TechItem = {
  name: string;
  icon?: string;
  hoverClass?: string;
};

type TechAnimationResult = {
  activeTitle: string;
  activeTech: string | null;
  handleTechClick: (techName: string) => void;
  handleHoverStart: (techName: string) => void;
  handleHoverEnd: () => void;
  cleanupAnimations: () => void;
};

export function useTechAnimations(
  defaultTitle: string = 'Technologies',
  technologies: TechItem[] = []
): TechAnimationResult {
  const [activeTitle, setActiveTitle] = useState(defaultTitle);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const titleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const techTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef<boolean>(false);
  
  // New refs for random engagement feature
  const userInteractedRef = useRef<boolean>(false);
  const randomEngagementTimerRef = useRef<NodeJS.Timeout | null>(null);
  const randomIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobileRef = useRef<boolean>(false);
  const isRandomEngagingRef = useRef<boolean>(false);
  
  // Define startRandomEngagement with useCallback to make it stable between renders
  const startRandomEngagement = useCallback(() => {
    if (userInteractedRef.current || !isMobileRef.current || technologies.length === 0) {
      return;
    }
    
    isRandomEngagingRef.current = true;
    
    // Track shown technologies to ensure all are displayed before repeating
    const shownTechs = new Set<string>();
    
    // Pick initial technology
    let currentTech = technologies[Math.floor(Math.random() * technologies.length)].name;
    shownTechs.add(currentTech);
    
    // Simulate a click on first tech
    setActiveTech(currentTech);
    setActiveTitle(currentTech);
    
    // Set up interval to change tech every 2 seconds
    randomIntervalRef.current = setInterval(() => {
      if (userInteractedRef.current) {
        // Stop if user has interacted
        if (randomIntervalRef.current) {
          clearInterval(randomIntervalRef.current);
          isRandomEngagingRef.current = false;
        }
        return;
      }
      
      // If all technologies have been shown, reset the tracking
      if (shownTechs.size >= technologies.length) {
        shownTechs.clear();
        // Keep the last shown tech in the set to avoid immediate repetition
        shownTechs.add(currentTech);
      }
      
      // Get available technologies that haven't been shown yet
      const availableTechs = technologies.filter(tech => !shownTechs.has(tech.name));
      
      // Pick a random tech from the available ones
      const nextTech = availableTechs[Math.floor(Math.random() * availableTechs.length)].name;
      currentTech = nextTech;
      shownTechs.add(currentTech);
      
      // Directly transition to the next tech without going back to default
      setActiveTech(currentTech);
      setActiveTitle(currentTech);
      
    }, 2000); // Switch to a new tech every 2 seconds
  }, [technologies, setActiveTech, setActiveTitle]);
  
  // Check if device is mobile on mount and set up random engagement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Detect if we're on mobile
      isMobileRef.current = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
      
      // For mobile only: Start random engagement after 3 seconds if no interaction
      if (isMobileRef.current && technologies.length > 0) {
        randomEngagementTimerRef.current = setTimeout(() => {
          if (!userInteractedRef.current) {
            startRandomEngagement();
          }
        }, 3000);
      }
    }
    
    return () => {
      cleanupAnimations();
    };
  }, [technologies, startRandomEngagement]);

  // Handle technology click
  const handleTechClick = (techName: string) => {
    // Mark that user has interacted
    userInteractedRef.current = true;
    
    // Clear any random engagement timers
    if (randomEngagementTimerRef.current) {
      clearTimeout(randomEngagementTimerRef.current);
    }
    
    if (randomIntervalRef.current) {
      clearInterval(randomIntervalRef.current);
      isRandomEngagingRef.current = false;
    }
    
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

  // Handle hover start (primarily for desktop)
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
    if (randomEngagementTimerRef.current) clearTimeout(randomEngagementTimerRef.current);
    if (randomIntervalRef.current) clearInterval(randomIntervalRef.current);
  };

  return {
    activeTitle,
    activeTech,
    handleTechClick,
    handleHoverStart,
    handleHoverEnd,
    cleanupAnimations
  };
}