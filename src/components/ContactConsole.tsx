"use client";

import { motion } from "motion/react";
import RackUnit from "@/components/RackUnit";
import { LogoMark } from "@/components/TopBar";
import { CONTACT, HANDLE } from "@/lib/data";

const LINKS = [
  { label: "EMAIL", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: "GITHUB", value: "github.com/IbrahimElsa", href: CONTACT.github },
  { label: "LINKEDIN", value: "in/ibrahim-elsawalhi", href: CONTACT.linkedin },
  { label: "RESUME", value: "elsawalhi-resume.pdf", href: CONTACT.resume },
];

/** Footer: the rack's KVM console. */
export default function ContactConsole() {
  return (
    <RackUnit id="contact" unit="U-05" label="KVM CONSOLE — CONTACT" status="LISTENING" ledColor="amber" className="border-b-0">
      <div className="px-4 py-16 sm:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="font-display uppercase leading-[0.92] text-ink"
        >
          <span className="block text-[13vw] lg:text-[8.5rem]">ESTABLISH</span>
          <span className="text-outline block text-[13vw] lg:text-[8.5rem]">
            CONNECTION<span className="text-amber" style={{ WebkitTextStroke: "0" }}>.</span>
          </span>
        </motion.h2>

        <div className="mt-8 max-w-2xl border border-line bg-panel p-4 text-xs leading-7 sm:text-sm">
          <p>
            <span className="text-green">visitor@web</span>
            <span className="text-line-bright">:</span>
            <span className="text-amber">~</span>
            <span className="text-line-bright">$</span>{" "}
            <span className="text-ink">ssh ibrahim@{HANDLE}.lab</span>
          </p>
          <p className="text-muted">Connection established. Channels open:</p>
        </div>

        <div className="mt-px grid max-w-2xl grid-cols-1 border border-line sm:grid-cols-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border-b border-line bg-panel px-4 py-5 transition-colors last:border-b-0 hover:bg-amber sm:odd:border-r sm:nth-last-2:border-b-0"
            >
              <span className="text-[10px] tracking-[0.3em] text-muted group-hover:text-black/60">
                {link.label}
              </span>
              <span className="truncate text-xs text-ink group-hover:text-black sm:text-sm">
                {link.value} ↗
              </span>
            </a>
          ))}
        </div>

        {/* bottom plate */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-[10px] tracking-[0.25em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3">
            <LogoMark className="h-6 w-6 text-ink" />
            © {new Date().getFullYear()} IBRAHIM ELSAWALHI
          </span>
          <span>DESIGNED LIKE A RACK — BUILT WITH NEXT.JS</span>
          <span>
            LAB CONTENT → <span className="text-amber">@{HANDLE}</span>
          </span>
        </div>
      </div>
    </RackUnit>
  );
}
