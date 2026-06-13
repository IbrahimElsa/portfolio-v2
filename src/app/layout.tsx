import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import TopBar from "@/components/TopBar";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "IBRAHIM ELSAWALHI — Full-Stack Developer & Homelab Operator",
  description:
    "Portfolio of Ibrahim Elsawalhi: full-stack developer and homelab operator. Builder of web apps and self-hosted infrastructure. Find the lab content at @bigibz1.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${plexMono.variable} antialiased`}>
        <Cursor />
        <TopBar />
        {/* fixed rack rails framing the whole site */}
        <div
          aria-hidden
          className="rack-rail fixed inset-y-0 left-0 z-30 hidden w-8 border-r border-line bg-panel lg:block"
        />
        <div
          aria-hidden
          className="rack-rail fixed inset-y-0 right-0 z-30 hidden w-8 border-l border-line bg-panel lg:block"
        />
        {children}
        <div aria-hidden className="scanlines" />
        <div aria-hidden className="noise" />
      </body>
    </html>
  );
}
