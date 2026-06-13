"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Led } from "@/components/RackUnit";

const NAV = [
  { n: "01", label: "SKILLS", href: "#skills" },
  { n: "02", label: "PROJECTS", href: "#projects" },
  { n: "03", label: "LAB", href: "#lab" },
  { n: "04", label: "CONTACT", href: "#contact" },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "UTC",
        }) + " UTC"
      );
    tick();
    const interval = setInterval(tick, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 lg:px-8",
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-3 text-xs tracking-[0.3em] text-ink"
        >
          <LogoMark className="h-7 w-7" />
          <span className="hidden sm:inline">
            IBZ<span className="text-amber">.</span>LAB
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.n}
              href={item.href}
              className="group text-[11px] tracking-[0.25em] text-muted transition-colors hover:text-ink"
            >
              <span className="text-amber">{item.n}</span>{" "}
              <span className="group-hover:underline group-hover:underline-offset-4">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-[11px] tracking-[0.2em] text-muted md:flex">
          <Led color="green" />
          <span className="tabular-nums">{time || "--:--:-- UTC"}</span>
        </div>

        {/* mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <Led color={open ? "amber" : "green"} />
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg px-4 py-4 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.n}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-4 text-sm tracking-[0.25em] text-ink last:border-b-0"
            >
              <span>
                <span className="text-amber">{item.n}</span> {item.label}
              </span>
              <span className="text-muted">→</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/** The existing I-E monogram, kept from v1. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="100 110 200 180" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="m 126.58012,259.82589 c 0,0 8.11545,-24.30593 17.70266,-52.82053 l 17.4313,-51.84472 19.29314,-6.43532 c 10.61122,-3.53942 18.68434,-6.26103 20.44446,-6.78216 -5.95371,19.07325 -34.6408,110.24637 -34.6408,110.24637 0,0 -6.2968,1.20547 -13.73113,2.61654 -7.43434,1.41105 -16.09033,3.16471 -19.78494,3.86876 -4.25757,0.81133 -6.71469,1.15106 -6.71469,1.15106 z"
        fill="currentColor"
      />
      <path
        d="m 267.13157,141.32183 c -1.24093,2.69247 -10.33022,23.79229 -14.45041,32.6062 -16.40644,0.0521 -32.96055,0.0416 -49.37519,0.0963 3.42618,-13.48444 7.20256,-24.93175 9.5597,-32.49301 0,0 35.72846,-0.16385 54.2659,-0.20949 z"
        fill="currentColor"
      />
      <path
        d="m 201.21803,181.05045 c 17.5105,0.12819 29.98519,0.0511 47.29129,0.0557 -0.0346,3.59533 -0.0201,8.82739 -0.0444,14.20787 -0.0241,5.38046 0.0117,10.90502 0.005,15.15248 -9.70604,0.0863 -19.75439,0.12955 -29.48831,0.15492 -9.05497,0.0156 -26.82618,0.0627 -26.82618,0.0627 3.03677,-9.81281 9.0626,-29.63367 9.0626,-29.63367 z"
        fill="currentColor"
      />
      <path
        d="M 272.71994,251.60744 C 270.72508,248.53022 260.93999,233.6027 260.80647,233.384 l -9.66566,-15.83355 c -12.24354,-0.0426 -41.1323,-0.034 -61.10725,-0.0365 0,0 -9.34665,29.75777 -10.76271,34.26941 0,0 83.29348,-0.109 93.44909,-0.17593 z"
        fill="currentColor"
      />
    </svg>
  );
}
