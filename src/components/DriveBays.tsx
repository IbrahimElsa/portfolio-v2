"use client";

import Image from "next/image";
import { motion } from "motion/react";
import RackUnit, { Led } from "@/components/RackUnit";
import { PROJECTS, type Project } from "@/lib/data";

const STATUS_LED: Record<Project["status"], "green" | "amber" | "off"> = {
  DEPLOYED: "green",
  "IN DEVELOPMENT": "amber",
  ARCHIVED: "off",
};

/**
 * Projects as hot-swap drive bays: full-width sleds that slide out
 * on hover, revealing a screenshot panel and an EJECT action.
 */
export default function DriveBays() {
  return (
    <RackUnit id="projects" unit="U-03" label="STORAGE ARRAY — HOT-SWAP BAYS" status="RAID HEALTHY">
      <div className="px-4 py-12 sm:px-8 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl uppercase leading-none text-ink sm:text-7xl">
            PROJECTS<span className="text-amber">.</span>
          </h2>
          <p className="max-w-xs text-right text-[11px] leading-5 tracking-[0.2em] text-muted">
            {PROJECTS.length} VOLUMES MOUNTED
            <br />
            CLICK A BAY TO EJECT
          </p>
        </div>

        <div className="border-t border-line">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative block overflow-hidden border-b border-line bg-panel transition-transform duration-300 ease-out hover:translate-x-2"
            >
              {/* screenshot panel, revealed on hover */}
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  unoptimized={project.image.endsWith(".svg")}
                  className={`${
                    project.imageFit === "contain"
                      ? "object-contain p-10"
                      : "object-cover"
                  } grayscale`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-panel via-panel/60 to-transparent" />
              </div>

              <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2 py-6 sm:gap-8 sm:px-6 sm:py-8">
                {/* bay number + LED */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[10px] tracking-[0.2em] text-muted">
                    BAY
                  </span>
                  <span className="font-display text-2xl text-line-bright transition-colors group-hover:text-amber sm:text-3xl">
                    {project.id}
                  </span>
                  <Led
                    color={STATUS_LED[project.status]}
                    blink={project.status === "IN DEVELOPMENT"}
                  />
                </div>

                {/* title + meta */}
                <div className="min-w-0">
                  <h3 className="font-display text-3xl uppercase leading-none text-ink transition-colors group-hover:text-amber sm:text-5xl lg:text-6xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-xs text-muted sm:text-sm">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-2 py-1 text-[10px] tracking-[0.15em] text-muted transition-colors group-hover:border-line-bright group-hover:text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* status + eject */}
                <div className="flex flex-col items-end gap-3">
                  <span className="hidden text-[10px] tracking-[0.25em] text-muted sm:inline">
                    {project.status}
                  </span>
                  <span className="border border-line-bright px-3 py-2 text-[10px] tracking-[0.25em] text-ink transition-colors group-hover:border-amber group-hover:bg-amber group-hover:text-black sm:px-4">
                    EJECT ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </RackUnit>
  );
}
