import {
  siDiscord,
  siFacebook,
  siGithub,
  siInstagram,
  siTiktok,
  siYoutube,
} from 'simple-icons';
import { Mail } from 'lucide-react';
import type { SocialKey } from '@/lib/socials';
import { cn } from '@/lib/utils';

// LinkedIn is no longer shipped by simple-icons, so the glyph lives here.
const LINKEDIN_PATH =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';

const PATHS: Record<Exclude<SocialKey, 'email'>, string> = {
  github: siGithub.path,
  linkedin: LINKEDIN_PATH,
  youtube: siYoutube.path,
  tiktok: siTiktok.path,
  instagram: siInstagram.path,
  facebook: siFacebook.path,
  discord: siDiscord.path,
};

/** Brand colour used for hover accents. */
export const BRAND_HEX: Record<SocialKey, string> = {
  github: '#e6edf3',
  linkedin: '#0a66c2',
  email: '#a78bfa',
  youtube: `#${siYoutube.hex}`,
  tiktok: '#69c9d0',
  instagram: `#${siInstagram.hex}`,
  facebook: `#${siFacebook.hex}`,
  discord: `#${siDiscord.hex}`,
};

export default function SocialIcon({
  name,
  className,
}: {
  name: SocialKey;
  className?: string;
}) {
  if (name === 'email') {
    return <Mail className={cn('h-5 w-5', className)} strokeWidth={1.75} aria-hidden />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-5 w-5 fill-current', className)}
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
