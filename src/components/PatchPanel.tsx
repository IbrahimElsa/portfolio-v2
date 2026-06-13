"use client";

import { motion } from "motion/react";
import RackUnit from "@/components/RackUnit";
import { SKILLS } from "@/lib/data";

const COLUMNS = 6;

/**
 * Skills as a 24-port patch panel. Hovering a port lights its LED
 * and inverts the cell; leftover ports render as unpatched.
 */
export default function PatchPanel() {
  const emptyCount =
    (COLUMNS - (SKILLS.length % COLUMNS)) % COLUMNS;

  return (
    <RackUnit id="skills" unit="U-02" label="PATCH PANEL — 24 PORT" status="LINK ACTIVE">
      <div className="px-4 py-12 sm:px-8 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl uppercase leading-none text-ink sm:text-7xl">
            SKILLS<span className="text-amber">.</span>
          </h2>
          <p className="max-w-xs text-right text-[11px] leading-5 tracking-[0.2em] text-muted">
            {SKILLS.length} PORTS PATCHED
            <br />
            HOVER TO TEST LINK
          </p>
        </div>

        <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % COLUMNS) * 0.05 }}
              data-hover
              className="group relative border-b border-r border-line bg-panel p-4 transition-colors duration-200 hover:bg-amber"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-muted group-hover:text-black/60">
                  P{String(i + 1).padStart(2, "0")}
                </span>
                <span className="led led-off transition-shadow group-hover:bg-black group-hover:shadow-none" />
              </div>
              <div className="mt-6 font-display text-xl uppercase text-ink group-hover:text-black sm:text-2xl">
                {skill.name}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.25em] text-muted group-hover:text-black/60">
                {skill.category}
              </div>
            </motion.div>
          ))}
          {Array.from({ length: emptyCount }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden min-h-28 border-b border-r border-line bg-bg p-4 lg:block"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-line-bright">
                  P{String(SKILLS.length + i + 1).padStart(2, "0")}
                </span>
                <span className="led led-off" />
              </div>
              <div className="mt-6 text-[10px] tracking-[0.25em] text-line-bright">
                — UNPATCHED —
              </div>
            </div>
          ))}
        </div>
      </div>
    </RackUnit>
  );
}
