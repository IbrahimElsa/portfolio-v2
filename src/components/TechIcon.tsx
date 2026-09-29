import Image from 'next/image';
import type { Tech } from '@/lib/data';
import { cn } from '@/lib/utils';

/** Renders a devicon glyph, or the custom SVG for logos devicon lacks. */
export default function TechIcon({
  tech,
  size = 40,
  className,
}: {
  tech: Tech;
  size?: number;
  className?: string;
}) {
  if (tech.customIcon) {
    return (
      <Image
        src={tech.customIcon}
        alt=""
        width={size}
        height={size}
        className={cn('chip-icon brightness-0 invert', className)}
        style={{ width: size, height: size }}
        aria-hidden
      />
    );
  }
  return (
    <i
      className={cn('devicon', tech.icon, 'colored', className)}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden
    />
  );
}
