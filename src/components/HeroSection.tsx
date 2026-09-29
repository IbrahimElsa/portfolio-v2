'use client';

import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { allLinks, CREATOR_HANDLE } from '@/lib/socials';
import SocialIcon from '@/components/SocialIcon';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 * i },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden
      />

      <div className="container-page relative py-24 sm:py-32">
        <motion.p
          className="eyebrow mb-6 flex items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Full Stack Developer · Content Creator
        </motion.p>

        <motion.h1
          className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-fg sm:text-6xl md:text-7xl lg:text-8xl"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          Ibrahim Elsawalhi
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          I build full-stack web apps with React, Next.js and Node, and I share
          homelab builds, 3D printing and tech reviews as{' '}
          <span className="font-medium text-fg">{CREATOR_HANDLE}</span>.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
        >
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            View work
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="/IbrahimElsawalhiResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 text-sm font-medium text-fg transition-colors hover:bg-white/5"
          >
            <FileText className="h-4 w-4" />
            Resume
            <ArrowUpRight className="h-4 w-4 text-fg-subtle" />
          </a>
        </motion.div>

        <motion.ul
          className="mt-12 flex flex-wrap items-center gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          aria-label="Social links"
        >
          {allLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-fg-muted transition-all hover:-translate-y-0.5 hover:border-border-strong hover:text-fg"
              >
                <SocialIcon name={link.key} className="h-[18px] w-[18px]" />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
