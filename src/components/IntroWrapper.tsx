'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [animationStep, setAnimationStep] = useState(1); // 1: intro, 2: moving/showing content
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Step 1: Assembly animation - faster now (1.8s instead of 3s)
    const step2Timer = setTimeout(() => {
      setAnimationStep(2); // Start moving to corner and show content
    }, 1800);
    
    // Complete animation after transition to corner
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2700);
    
    return () => {
      clearTimeout(step2Timer);
      clearTimeout(completeTimer);
    };
  }, []);
  
  // If animation is complete, just show the content with logo in corner
  if (animationComplete) {
    return (
      <>
        {/* Just the final logo in corner - with exact positioning */}
        <div
          style={{ 
            position: 'fixed',
            top: '0px',
            left: '0px',
            width: '120px',
            height: '120px',
            zIndex: 50,
            pointerEvents: 'none'
          }}
        >
          <svg
            version="1.1"
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m 126.58012,259.82589 c 0,0 8.11545,-24.30593 17.70266,-52.82053 l 17.4313,-51.84472 19.29314,-6.43532 c 10.61122,-3.53942 18.68434,-6.26103 20.44446,-6.78216 -5.95371,19.07325 -34.6408,110.24637 -34.6408,110.24637 0,0 -6.2968,1.20547 -13.73113,2.61654 -7.43434,1.41105 -16.09033,3.16471 -19.78494,3.86876 -4.25757,0.81133 -6.71469,1.15106 -6.71469,1.15106 z"
              fill="white"
            />
            <path
              d="m 267.13157,141.32183 c -1.24093,2.69247 -10.33022,23.79229 -14.45041,32.6062 -16.40644,0.0521 -32.96055,0.0416 -49.37519,0.0963 3.42618,-13.48444 7.20256,-24.93175 9.5597,-32.49301 0,0 35.72846,-0.16385 54.2659,-0.20949 z"
              fill="white"
            />
            <path
              d="m 201.21803,181.05045 c 17.5105,0.12819 29.98519,0.0511 47.29129,0.0557 -0.0346,3.59533 -0.0201,8.82739 -0.0444,14.20787 -0.0241,5.38046 0.0117,10.90502 0.005,15.15248 -9.70604,0.0863 -19.75439,0.12955 -29.48831,0.15492 -9.05497,0.0156 -26.82618,0.0627 -26.82618,0.0627 3.03677,-9.81281 9.0626,-29.63367 9.0626,-29.63367 z"
              fill="white"
            />
            <path
              d="M 272.71994,251.60744 C 270.72508,248.53022 260.93999,233.6027 260.80647,233.384 l -9.66566,-15.83355 c -12.24354,-0.0426 -41.1323,-0.034 -61.10725,-0.0365 0,0 -9.34665,29.75777 -10.76271,34.26941 0,0 83.29348,-0.109 93.44909,-0.17593 z"
              fill="white"
            />
          </svg>
        </div>
        
        {/* Children content */}
        <div className="min-h-screen">
          {children}
        </div>
      </>
    );
  }
  
  // Animation in progress
  return (
    <>
      {/* Logo Animation - visible only during animation */}
      {!animationComplete && (
        <motion.div
          className="fixed z-50"
          initial={{ 
            width: "320px", 
            height: "320px",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%"
          }}
          animate={
            animationStep === 1 ? {
              width: "320px", 
              height: "320px",
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%"
            } : {
              width: "120px", 
              height: "120px",
              top: "0px",
              left: "0px",
              x: "0%",
              y: "0%"
            }
          }
          transition={{ 
            duration: 0.9,
            ease: "easeInOut"
          }}
        >
          <svg
            version="1.1"
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left part of logo - flies in from left */}
            <motion.path
              d="m 126.58012,259.82589 c 0,0 8.11545,-24.30593 17.70266,-52.82053 l 17.4313,-51.84472 19.29314,-6.43532 c 10.61122,-3.53942 18.68434,-6.26103 20.44446,-6.78216 -5.95371,19.07325 -34.6408,110.24637 -34.6408,110.24637 0,0 -6.2968,1.20547 -13.73113,2.61654 -7.43434,1.41105 -16.09033,3.16471 -19.78494,3.86876 -4.25757,0.81133 -6.71469,1.15106 -6.71469,1.15106 z"
              fill="transparent"
              strokeWidth={2}
              stroke="white"
              initial={{ 
                pathLength: 0, 
                opacity: 0,
                x: "-1.5vw",
                y: "1.5vh",
                fill: 'rgba(255, 255, 255, 0)'
              }}
              animate={
                animationStep === 1 ? { 
                  pathLength: [0, 1],
                  opacity: [0, 1],
                  x: ["-1.5vw", "0vw"],
                  y: ["1.5vh", "0vh"],
                  fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                } : {
                  pathLength: 1,
                  opacity: 1,
                  x: "0vw",
                  y: "0vh",
                  fill: 'rgba(255, 255, 255, 1)'
                }
              }
              transition={{ 
                duration: animationStep === 1 ? 1.6 : 0,
                times: animationStep === 1 ? [0, 0.6, 1] : [0, 1],
                ease: "easeOut"
              }}
            />
            
            {/* Middle-top part of logo - flies in from top */}
            <motion.path
              d="m 267.13157,141.32183 c -1.24093,2.69247 -10.33022,23.79229 -14.45041,32.6062 -16.40644,0.0521 -32.96055,0.0416 -49.37519,0.0963 3.42618,-13.48444 7.20256,-24.93175 9.5597,-32.49301 0,0 35.72846,-0.16385 54.2659,-0.20949 z"
              fill="transparent"
              strokeWidth={2}
              stroke="white"
              initial={{ 
                pathLength: 0, 
                opacity: 0,
                y: "-1.5vh",
                x: "1.5vw",
                fill: 'rgba(255, 255, 255, 0)'
              }}
              animate={
                animationStep === 1 ? { 
                  pathLength: [0, 1],
                  opacity: [0, 1],
                  y: ["-1.5vh", "0vh"],
                  x: ["1.5vw", "0vw"],
                  fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                } : {
                  pathLength: 1,
                  opacity: 1,
                  y: "0vh",
                  x: "0vw",
                  fill: 'rgba(255, 255, 255, 1)'
                }
              }
              transition={{ 
                duration: animationStep === 1 ? 1.6 : 0,
                times: animationStep === 1 ? [0, 0.6, 1] : [0, 1],
                ease: "easeOut",
                delay: animationStep === 1 ? 0.05 : 0
              }}
            />
            
            {/* Middle part of logo - flies in from right */}
            <motion.path
              d="m 201.21803,181.05045 c 17.5105,0.12819 29.98519,0.0511 47.29129,0.0557 -0.0346,3.59533 -0.0201,8.82739 -0.0444,14.20787 -0.0241,5.38046 0.0117,10.90502 0.005,15.15248 -9.70604,0.0863 -19.75439,0.12955 -29.48831,0.15492 -9.05497,0.0156 -26.82618,0.0627 -26.82618,0.0627 3.03677,-9.81281 9.0626,-29.63367 9.0626,-29.63367 z"
              fill="transparent"
              strokeWidth={2}
              stroke="white"
              initial={{ 
                pathLength: 0, 
                opacity: 0,
                x: "1.5vw",
                y: "0.5vh",
                fill: 'rgba(255, 255, 255, 0)'
              }}
              animate={
                animationStep === 1 ? { 
                  pathLength: [0, 1],
                  opacity: [0, 1],
                  x: ["1.5vw", "0vw"],
                  y: ["0.5vh", "0vh"],
                  fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                } : {
                  pathLength: 1,
                  opacity: 1,
                  x: "0vw",
                  y: "0vh",
                  fill: 'rgba(255, 255, 255, 1)'
                }
              }
              transition={{ 
                duration: animationStep === 1 ? 1.6 : 0,
                times: animationStep === 1 ? [0, 0.6, 1] : [0, 1],
                ease: "easeOut",
                delay: animationStep === 1 ? 0.1 : 0
              }}
            />
            
            {/* Bottom part of logo - flies in from bottom */}
            <motion.path
              d="M 272.71994,251.60744 C 270.72508,248.53022 260.93999,233.6027 260.80647,233.384 l -9.66566,-15.83355 c -12.24354,-0.0426 -41.1323,-0.034 -61.10725,-0.0365 0,0 -9.34665,29.75777 -10.76271,34.26941 0,0 83.29348,-0.109 93.44909,-0.17593 z"
              fill="transparent"
              strokeWidth={2}
              stroke="white"
              initial={{ 
                pathLength: 0, 
                opacity: 0,
                y: "1.5vh",
                x: "0.5vw",
                fill: 'rgba(255, 255, 255, 0)'
              }}
              animate={
                animationStep === 1 ? { 
                  pathLength: [0, 1],
                  opacity: [0, 1],
                  y: ["1.5vh", "0vh"],
                  x: ["0.5vw", "0vw"],
                  fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
                } : {
                  pathLength: 1,
                  opacity: 1,
                  y: "0vh",
                  x: "0vw",
                  fill: 'rgba(255, 255, 255, 1)'
                }
              }
              transition={{ 
                duration: animationStep === 1 ? 1.6 : 0,
                times: animationStep === 1 ? [0, 0.6, 1] : [0, 1],
                ease: "easeOut",
                delay: animationStep === 1 ? 0.15 : 0
              }}
            />
          </svg>
        </motion.div>
      )}
      
      {/* Background overlay - only during assembly, fades when moving to corner */}
      {!animationComplete && (
        <motion.div 
          className="fixed inset-0 z-40 bg-zinc-900"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: animationStep === 1 ? 1 : 0 
          }}
          transition={{ 
            duration: 0.7,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Main content - shows during transition to corner */}
      <motion.div 
        className="min-h-screen" 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: animationStep === 1 ? 0 : 1 
        }}
        transition={{ 
          duration: 0.7,
          ease: "easeInOut",
          delay: 0.5 // Delay showing content by 0.5 seconds
        }}
      >
        {children}
      </motion.div>
    </>
  );
}