"use client";

import { motion } from "motion/react";
import RackUnit from "@/components/RackUnit";
import { CHANNELS, HANDLE } from "@/lib/data";

const ASCII_RACK = String.raw`
┌──────────────────────┐
│ ● ROUTER        ▓▓▓░ │
├──────────────────────┤
│ ● SWITCH — 10GbE     │
├──────────────────────┤
│ ● PROXMOX-01    ░▓░▓ │
├──────────────────────┤
│ ● NAS  ▒▒▒▒▒▒▒░░ 42T │
├──────────────────────┤
│ ● UPS — 100% ▓▓▓▓▓▓▓ │
└──────────────────────┘
`;

/**
 * The bigibz1 section: homelab pitch + social channels rendered
 * as running containers in a `docker ps` readout.
 */
export default function LabSection() {
  return (
    <RackUnit id="lab" unit="U-04" label={`THE HOMELAB — @${HANDLE.toUpperCase()}`} status="SELF-HOSTED" ledColor="amber">
      <div className="grid gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-16">
        <div className="min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-display text-5xl uppercase leading-[0.95] text-ink sm:text-7xl"
          >
            THE LAB<span className="text-amber">.</span>
            <span className="text-outline-amber block">@{HANDLE}</span>
          </motion.h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted">
            Off the clock I run a homelab — racking servers, breaking
            networks, self-hosting everything I can, and documenting all of
            it as <span className="text-amber">@{HANDLE}</span>. Builds,
            teardowns, and the occasional 3 AM outage post-mortem.
          </p>

          {/* docker ps readout */}
          <div className="mt-10 overflow-x-auto border border-line bg-panel">
            <div className="border-b border-line px-4 py-3 text-xs text-muted">
              <span className="text-green">ibrahim@homelab</span>
              <span className="text-line-bright">:</span>
              <span className="text-amber">~</span>
              <span className="text-line-bright">$</span>{" "}
              <span className="text-ink">
                docker ps --filter &quot;label=social&quot;
              </span>
            </div>
            <table className="w-full min-w-[640px] text-left text-xs">
              <thead>
                <tr className="border-b border-line text-[10px] tracking-[0.2em] text-muted">
                  <th className="px-4 py-3 font-medium">CONTAINER ID</th>
                  <th className="px-4 py-3 font-medium">IMAGE</th>
                  <th className="px-4 py-3 font-medium">STATUS</th>
                  <th className="px-4 py-3 font-medium">PORTS</th>
                  <th className="px-4 py-3 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {CHANNELS.map((ch) => (
                  <tr
                    key={ch.platform}
                    className="group cursor-pointer border-b border-line/60 transition-colors last:border-b-0 hover:bg-amber hover:text-black"
                    onClick={() => window.open(ch.url, "_blank", "noopener,noreferrer")}
                  >
                    <td className="px-4 py-4 text-muted group-hover:text-black/60">
                      {ch.containerId}
                    </td>
                    <td className="px-4 py-4 text-ink group-hover:text-black">
                      {ch.image}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-2">
                        <span className="led led-green group-hover:bg-black group-hover:shadow-none group-hover:animate-none" />
                        <span className="text-green group-hover:text-black">
                          {ch.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted group-hover:text-black/60">
                      {ch.ports}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="tracking-[0.2em] text-amber underline-offset-4 hover:underline group-hover:text-black"
                      >
                        FOLLOW ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] tracking-[0.2em] text-muted">
            {CHANNELS.length} CONTAINERS RUNNING — 0 RESTARTS — FOLLOW FOR LAB CONTENT
          </p>
        </div>

        {/* ascii rack */}
        <motion.pre
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          aria-hidden
          className="hidden select-none self-center text-[13px] leading-[1.35] text-muted lg:block"
          style={{ animation: "flicker 6s linear infinite" }}
        >
          {ASCII_RACK}
        </motion.pre>
      </div>
    </RackUnit>
  );
}
