import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ibrahim Elsawalhi — Full Stack Developer',
  description:
    'Full stack developer building web apps with React, Next.js and Node. Also making homelab, 3D printing and tech review content as @bigibz1.',
  openGraph: {
    title: 'Ibrahim Elsawalhi — Full Stack Developer',
    description:
      'Full stack developer and content creator (@bigibz1). Projects, stack and where to find me online.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* devicon supplies the technology glyphs used in the stack and project chips. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} relative`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
