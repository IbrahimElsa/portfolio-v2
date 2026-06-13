"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "BIGIBZ1 MODULAR BIOS v2.0.26",
  "ELSAWALHI SYSTEMS — ALL RIGHTS RESERVED",
  "",
  "CPU0 ..... IBRAHIM ELSAWALHI / FULL-STACK ......... [ OK ]",
  "MEM ...... 22 TECHNOLOGIES DETECTED ............... [ OK ]",
  "DISK ..... 4 PROJECT VOLUMES MOUNTED .............. [ OK ]",
  "NET ...... LINK UP @ 10GbE ........................ [ OK ]",
  "SVC ...... web ui projects lab social ............. [ OK ]",
  "",
  "BOOT COMPLETE — WELCOME, VISITOR",
];

const LINE_INTERVAL = 170;
const EXIT_DELAY = 650;

/**
 * BIOS POST-style preloader. Plays once per browser session,
 * skippable with any key or click.
 */
export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("booted", "1");
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const timers = timersRef.current;
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineCount(i + 1), (i + 1) * LINE_INTERVAL));
    });
    timers.push(
      setTimeout(dismiss, BOOT_LINES.length * LINE_INTERVAL + EXIT_DELAY)
    );

    window.addEventListener("keydown", dismiss);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", dismiss);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismiss() {
    sessionStorage.setItem("booted", "1");
    setLineCount(BOOT_LINES.length);
    setExiting(true);
    document.body.style.overflow = "";
    timersRef.current.push(setTimeout(() => setVisible(false), 750));
  }

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-8 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-12 sm:py-12"
      style={{ transform: exiting ? "translateY(-100%)" : "translateY(0)" }}
      aria-hidden
    >
      <div className="text-xs leading-7 text-muted sm:text-sm">
        {BOOT_LINES.slice(0, lineCount).map((line, i) => (
          <div key={i} className="whitespace-pre">
            {line.includes("[ OK ]") ? (
              <>
                <span className="text-ink">{line.replace("[ OK ]", "")}</span>
                <span className="text-green">[ OK ]</span>
              </>
            ) : i === BOOT_LINES.length - 1 ? (
              <span className="text-amber">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
        {lineCount < BOOT_LINES.length && <span className="caret" />}
      </div>

      <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-muted">
        <span>POST // SELF-TEST IN PROGRESS</span>
        <span className="hidden sm:inline">PRESS ANY KEY TO SKIP</span>
      </div>
    </div>
  );
}
