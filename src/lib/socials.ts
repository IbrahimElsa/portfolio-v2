export type SocialKey =
  | 'github'
  | 'linkedin'
  | 'email'
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'discord';

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
  /** Short handle or address shown next to the label. */
  handle: string;
}

export const DEV_EMAIL = 'ibrahimelsawalhi0@gmail.com';
export const CREATOR_EMAIL = 'ibrahim@bigibz.com';
export const CREATOR_SITE = 'https://bigibz.com';
export const CREATOR_HANDLE = '@bigibz1';

/** Developer / professional links. */
export const devLinks: SocialLink[] = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/IbrahimElsa',
    handle: 'IbrahimElsa',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ibrahim-elsawalhi',
    handle: 'ibrahim-elsawalhi',
  },
  {
    key: 'email',
    label: 'Email',
    href: `mailto:${DEV_EMAIL}`,
    handle: DEV_EMAIL,
  },
];

/** bigibz content-creator links. */
export const creatorLinks: SocialLink[] = [
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@bigibz1',
    handle: CREATOR_HANDLE,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@bigibz1',
    handle: CREATOR_HANDLE,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/bigibz1',
    handle: CREATOR_HANDLE,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/people/BigIbz/61587917195561/',
    handle: 'BigIbz',
  },
  {
    key: 'discord',
    label: 'Discord',
    href: 'https://discord.gg/Mz7AYhUK59',
    handle: 'Join the server',
  },
];

export const allLinks: SocialLink[] = [...devLinks, ...creatorLinks];
