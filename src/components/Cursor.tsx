"use client";

import { useEffect, useRef } from "react";

/**
 * Crosshair cursor with a trailing bracket ring that expands over
 * interactive elements. Only activates on fine pointers.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("custom-cursor");
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    let x = 0,
      y = 0,
      ringX = 0,
      ringY = 0;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onOver = (e: MouseEvent) => {
      hovering = !!(e.target as Element).closest("a, button, [data-hover]");
      ring.style.width = hovering ? "44px" : "26px";
      ring.style.height = hovering ? "44px" : "26px";
      ring.style.color = hovering ? "var(--color-amber)" : "var(--color-line-bright)";
    };

    const loop = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* crosshair dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] opacity-0"
      >
        <div className="absolute -left-[5px] top-0 h-px w-[10px] -translate-y-1/2 bg-amber" />
        <div className="absolute left-0 -top-[5px] h-[10px] w-px -translate-x-1/2 bg-amber" />
      </div>
      {/* trailing bracket ring — four corner brackets */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[109] h-[26px] w-[26px] opacity-0 transition-[width,height,color] duration-200"
        style={{ color: "var(--color-line-bright)" }}
      >
        <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-current" />
        <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-current" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-current" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-current" />
      </div>
    </>
  );
}
