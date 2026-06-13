"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Led, Screw } from "@/components/RackUnit";
import { BOOT_DATE, CONTACT, HANDLE } from "@/lib/data";

function useUptime() {
  const [uptime, setUptime] = useState("");
  useEffect(() => {
    const tick = () => {
      let s = Math.max(0, Math.floor((Date.now() - BOOT_DATE.getTime()) / 1000));
      const years = Math.floor(s / 31_536_000);
      s -= years * 31_536_000;
      const days = Math.floor(s / 86_400);
      s -= days * 86_400;
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      setUptime(`${years}Y ${days}D ${h}:${m}:${sec}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);
  return uptime;
}

const reveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const uptime = useUptime();

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col border-b border-line bg-bg pt-14 lg:mx-8"
    >
      {/* faceplate top strip */}
      <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-3 sm:px-8">
        <div className="flex items-center gap-4">
          <Screw />
          <span className="text-[11px] tracking-[0.25em] text-muted">
            U-01 <span className="text-line-bright">//</span>{" "}
            <span className="text-ink">IDENTITY MODULE</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-[11px] tracking-[0.25em] text-muted sm:flex">
            <Led color="green" /> ALL SYSTEMS NOMINAL
          </span>
          <Screw />
        </div>
      </div>

      {/* main faceplate */}
      <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-4 py-20 sm:px-8 lg:px-16">
        {/* background grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* giant background unit number */}
        <div
          aria-hidden
          className="text-outline pointer-events-none absolute -right-6 bottom-0 select-none font-display text-[28vw] leading-none opacity-[0.07] lg:text-[20vw]"
        >
          01
        </div>

        <div className="relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 text-[11px] tracking-[0.35em] text-amber sm:text-xs"
          >
            HELLO WORLD — OPERATOR ON DUTY
          </motion.p>

          <h1 className="font-display uppercase leading-[0.92]">
            <span className="block overflow-hidden">
              <motion.span
                custom={0}
                variants={reveal}
                initial="hidden"
                animate="show"
                className="block text-[16vw] tracking-tight text-ink lg:text-[10.5rem]"
              >
                IBRAHIM
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                custom={1}
                variants={reveal}
                initial="hidden"
                animate="show"
                className="text-outline block text-[16vw] tracking-tight lg:text-[10.5rem]"
              >
                ELSAWALHI
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="caret max-w-md text-sm leading-7 text-muted">
              <span className="text-ink">FULL-STACK DEVELOPER</span> ✕{" "}
              <span className="text-ink">HOMELAB OPERATOR</span>
              <br />
              Building for the web by day. Racking, wiring and
              self-hosting as <span className="text-amber">@{HANDLE}</span> by
              night.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CONTACT.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-amber bg-amber px-6 py-3 text-[11px] font-semibold tracking-[0.25em] text-black transition-colors hover:bg-transparent hover:text-amber"
              >
                VIEW RESUME ↗
              </a>
              <a
                href="#projects"
                className="border border-line-bright px-6 py-3 text-[11px] tracking-[0.25em] text-ink transition-colors hover:border-amber hover:text-amber"
              >
                EJECT PROJECTS ▼
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom status strip */}
      <div className="flex items-center justify-between gap-4 border-t border-line bg-panel px-4 py-3 text-[10px] tracking-[0.25em] text-muted sm:px-8 sm:text-[11px]">
        <span className="flex items-center gap-2">
          <Led color="amber" blink />
          <span className="hidden sm:inline">UPTIME</span>
          <span className="tabular-nums text-ink">{uptime || "—"}</span>
        </span>
        <span className="hidden md:inline">MODEL: ELSAWALHI-01 / CLASS: FULL-STACK</span>
        <span className="animate-pulse">SCROLL TO RACK ▼</span>
      </div>
    </section>
  );
}
