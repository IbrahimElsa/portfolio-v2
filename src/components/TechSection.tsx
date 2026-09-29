'use client';

import { motion } from 'framer-motion';
import { TextMorph } from '@/components/ui/text-morph';
import { useTechAnimations } from '@/lib/tech-animations';
import { technologies } from '@/lib/data';
import TechIcon from '@/components/TechIcon';
import Reveal from '@/components/Reveal';

export default function TechSection() {
  const { activeTitle, activeTech, handleTechClick, handleHoverStart, handleHoverEnd } =
    useTechAnimations('Stack', technologies);

  return (
    <section id="stack" className="scroll-mt-16 py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow mb-3">Technologies</p>
          <TextMorph
            as="h2"
            className="text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl md:text-5xl"
          >
            {activeTitle}
          </TextMorph>
          <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            The tools I reach for most. Hover or tap one to highlight it.
          </p>
        </Reveal>

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {technologies.map((tech, index) => (
            <motion.li
              key={tech.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
            >
              <button
                type="button"
                data-active={activeTech === tech.name}
                onClick={() => handleTechClick(tech.name)}
                onMouseEnter={() => handleHoverStart(tech.name)}
                onMouseLeave={handleHoverEnd}
                aria-pressed={activeTech === tech.name}
                className="tech-tile flex w-full flex-col items-center gap-3 rounded-card border border-border bg-surface px-3 py-5 transition-colors hover:border-border-strong hover:bg-surface-hover"
              >
                <span className="flex h-10 items-center justify-center">
                  <TechIcon tech={tech} size={36} />
                </span>
                <span className="text-xs text-fg-muted sm:text-sm">{tech.name}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
