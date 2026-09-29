import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
