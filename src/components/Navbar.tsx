'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { allLinks } from '@/lib/socials';
import SocialIcon from '@/components/SocialIcon';

const NAV_ITEMS = [
  { href: '#content', label: 'Content' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

const quickLinks = allLinks.filter((l) =>
  ['github', 'linkedin', 'youtube'].includes(l.key),
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu when the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-border bg-bg/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="relative flex h-16 items-center px-5 sm:px-6" aria-label="Primary">
        {/* The logo itself is rendered by IntroWrapper and lands in this slot. */}
        <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
          <span className="block h-11 w-11 shrink-0" aria-hidden />
          <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">
            Ibrahim Elsawalhi
          </span>
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {quickLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="rounded-full p-2 text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              <SocialIcon name={link.key} className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto rounded-full p-2 text-fg-muted transition-colors hover:bg-white/5 hover:text-fg md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-t border-border px-5 pb-6 pt-4 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-base text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-border pt-4">
              <p className="eyebrow mb-3">Find me</p>
              <div className="flex flex-wrap gap-2">
                {allLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                  >
                    <SocialIcon name={link.key} className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
