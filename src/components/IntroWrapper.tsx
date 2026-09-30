'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Intro timeline:
 *   1. assemble  – the four logo pieces draw in over a solid overlay
 *   2. dock      – logo shrinks into the nav slot while the overlay and content cross-fade
 *   3. done      – overlay unmounted; logo stays fixed in the nav
 *
 * Every element that wraps page content stays mounted for the whole timeline so the
 * children never remount (a remount would replay their entrance animations).
 */
type Step = 1 | 2 | 3;

const ASSEMBLE_MS = 1400;
const DOCK_MS = 800;

const IntroContext = createContext(false);

/** True once the overlay starts lifting; hero-style entrance animations should wait for it. */
export function useIntroReady() {
  return useContext(IntroContext);
}

const LOGO_PIECES = [
  {
    d: 'm 126.58012,259.82589 c 0,0 8.11545,-24.30593 17.70266,-52.82053 l 17.4313,-51.84472 19.29314,-6.43532 c 10.61122,-3.53942 18.68434,-6.26103 20.44446,-6.78216 -5.95371,19.07325 -34.6408,110.24637 -34.6408,110.24637 0,0 -6.2968,1.20547 -13.73113,2.61654 -7.43434,1.41105 -16.09033,3.16471 -19.78494,3.86876 -4.25757,0.81133 -6.71469,1.15106 -6.71469,1.15106 z',
    from: { x: '-1.5vw', y: '1.5vh' },
    delay: 0,
  },
  {
    d: 'm 267.13157,141.32183 c -1.24093,2.69247 -10.33022,23.79229 -14.45041,32.6062 -16.40644,0.0521 -32.96055,0.0416 -49.37519,0.0963 3.42618,-13.48444 7.20256,-24.93175 9.5597,-32.49301 0,0 35.72846,-0.16385 54.2659,-0.20949 z',
    from: { x: '1.5vw', y: '-1.5vh' },
    delay: 0.05,
  },
  {
    d: 'm 201.21803,181.05045 c 17.5105,0.12819 29.98519,0.0511 47.29129,0.0557 -0.0346,3.59533 -0.0201,8.82739 -0.0444,14.20787 -0.0241,5.38046 0.0117,10.90502 0.005,15.15248 -9.70604,0.0863 -19.75439,0.12955 -29.48831,0.15492 -9.05497,0.0156 -26.82618,0.0627 -26.82618,0.0627 3.03677,-9.81281 9.0626,-29.63367 9.0626,-29.63367 z',
    from: { x: '1.5vw', y: '0.5vh' },
    delay: 0.1,
  },
  {
    d: 'M 272.71994,251.60744 C 270.72508,248.53022 260.93999,233.6027 260.80647,233.384 l -9.66566,-15.83355 c -12.24354,-0.0426 -41.1323,-0.034 -61.10725,-0.0365 0,0 -9.34665,29.75777 -10.76271,34.26941 0,0 83.29348,-0.109 93.44909,-0.17593 z',
    from: { x: '0.5vw', y: '1.5vh' },
    delay: 0.15,
  },
];

const CENTER = { width: 320, height: 320, top: '50%', left: '50%', x: '-50%', y: '-50%' };
// Matches the 44px slot the Navbar reserves at top:10px / left:20px.
const DOCKED = { width: 44, height: 44, top: '10px', left: '20px', x: '0%', y: '0%' };

const WHITE_CLEAR = 'rgba(255, 255, 255, 0)';
const WHITE = 'rgba(255, 255, 255, 1)';

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const dock = setTimeout(() => setStep(2), ASSEMBLE_MS);
    const done = setTimeout(() => setStep(3), ASSEMBLE_MS + DOCK_MS);
    return () => {
      clearTimeout(dock);
      clearTimeout(done);
    };
  }, []);

  const assembling = step === 1;

  return (
    <IntroContext.Provider value={step >= 2}>
      {/* Logo: one element for the whole timeline, ends parked in the nav. */}
      <motion.div
        className="pointer-events-none fixed z-50"
        initial={CENTER}
        animate={assembling ? CENTER : DOCKED}
        transition={{ duration: DOCK_MS / 1000, ease: 'easeInOut' }}
        aria-hidden
      >
        <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {LOGO_PIECES.map((piece) => (
            <motion.path
              key={piece.delay}
              d={piece.d}
              stroke="white"
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0, ...piece.from, fill: WHITE_CLEAR }}
              animate={
                assembling
                  ? {
                      pathLength: [0, 1],
                      opacity: [0, 1],
                      x: [piece.from.x, '0vw'],
                      y: [piece.from.y, '0vh'],
                      fill: [WHITE_CLEAR, WHITE_CLEAR, WHITE],
                    }
                  : { pathLength: 1, opacity: 1, x: '0vw', y: '0vh', fill: WHITE }
              }
              transition={
                assembling
                  ? { duration: 1.6, times: [0, 0.6, 1], ease: 'easeOut', delay: piece.delay }
                  : { duration: 0 }
              }
            />
          ))}
        </svg>
      </motion.div>

      {/* Solid overlay that hides the page while the logo assembles. */}
      {step < 3 && (
        <motion.div
          className="fixed inset-0 z-40 bg-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: assembling ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          aria-hidden
        />
      )}

      {/* Page content: always the same wrapper so children never remount. */}
      <motion.div
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: assembling ? 0 : 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut', delay: assembling ? 0 : 0.3 }}
      >
        {children}
      </motion.div>
    </IntroContext.Provider>
  );
}
