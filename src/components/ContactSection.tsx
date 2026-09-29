import { ArrowUpRight } from 'lucide-react';
import { devLinks, creatorLinks, DEV_EMAIL } from '@/lib/socials';
import SocialIcon from '@/components/SocialIcon';
import Reveal from '@/components/Reveal';

export default function ContactSection() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="scroll-mt-16 border-t border-border">
      <div className="container-page py-24 sm:py-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-3">Contact</p>
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl md:text-6xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            Open to full-stack roles, freelance work and collaborations. The fastest way to reach
            me is email.
          </p>
          <a
            href={`mailto:${DEV_EMAIL}`}
            className="group mt-8 inline-flex items-center gap-2 text-lg font-medium text-fg underline decoration-border-strong underline-offset-8 transition-colors hover:decoration-fg sm:text-2xl"
          >
            {DEV_EMAIL}
            <ArrowUpRight className="h-5 w-5 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
          </a>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Developer</p>
            <ul className="flex flex-col gap-2">
              {devLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <SocialIcon name={link.key} className="h-4 w-4" />
                    <span>{link.label}</span>
                    <span className="text-fg-subtle">{link.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">bigibz</p>
            <ul className="flex flex-col gap-2">
              {creatorLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <SocialIcon name={link.key} className="h-4 w-4" />
                    <span>{link.label}</span>
                    <span className="text-fg-subtle">{link.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Ibrahim Elsawalhi</p>
          <p>Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
