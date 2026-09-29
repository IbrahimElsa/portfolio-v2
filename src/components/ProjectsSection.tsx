import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import TechIcon from '@/components/TechIcon';

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-16 py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects"
            description="A few things I've shipped or am building right now."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => {
            const isLink = project.link !== '#';
            const external = project.link.startsWith('http');
            const body = (
              <>
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg-elevated">
                  {project.imageFit === 'contain' ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={160}
                        height={160}
                        className="h-28 w-28 object-contain opacity-90 transition-transform duration-500 group-hover:scale-105 sm:h-32 sm:w-32"
                      />
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  {project.status === 'in-progress' && (
                    <span className="absolute left-4 top-4 rounded-full border border-border bg-bg/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-muted backdrop-blur">
                      In progress
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight text-fg">{project.title}</h3>
                    {isLink && (
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    )}
                  </div>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-fg-muted sm:text-base">
                    {project.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2 pt-1" aria-label="Technologies used">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech.name}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-bg/60 px-2.5 py-1 text-xs text-fg-muted"
                      >
                        <TechIcon tech={tech} size={14} />
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );
            const cardClass = cn(
              'project-card group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface transition-all duration-300',
              isLink && 'hover:-translate-y-1 hover:border-border-strong hover:bg-surface-hover',
            );

            return (
              <Reveal key={project.title} delay={(index % 2) * 0.08}>
                {isLink ? (
                  <a
                    href={project.link}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className={cardClass}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
