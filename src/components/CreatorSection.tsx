import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { creatorLinks, CREATOR_EMAIL, CREATOR_HANDLE, CREATOR_SITE } from '@/lib/socials';
import SocialIcon, { BRAND_HEX } from '@/components/SocialIcon';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function CreatorSection() {
  return (
    <section id="content" className="scroll-mt-16 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow={CREATOR_HANDLE}
              title="I also make things on camera."
              description="Homelab builds, 3D printing and tech reviews. Follow along on whichever platform you already use, or join the Discord to talk shop."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CREATOR_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-white"
              >
                Visit bigibz.com
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CREATOR_EMAIL}`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-white/5"
              >
                {CREATOR_EMAIL}
              </a>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {creatorLinks.map((link, index) => (
              <Reveal key={link.key} delay={index * 0.06}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ '--brand': BRAND_HEX[link.key] } as CSSProperties}
                  className="group flex h-full items-center gap-4 rounded-card border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-bg text-fg-muted transition-colors group-hover:text-[var(--brand)]">
                    <SocialIcon name={link.key} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">{link.label}</span>
                    <span className="block truncate text-sm text-fg-subtle">{link.handle}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
