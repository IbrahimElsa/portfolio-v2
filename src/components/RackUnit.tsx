import { cn } from "@/lib/utils";

export function Screw({ className }: { className?: string }) {
  return <span aria-hidden className={cn("screw", className)} />;
}

export function Led({
  color = "green",
  blink = false,
  className,
}: {
  color?: "green" | "amber" | "red" | "off";
  blink?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("led", `led-${color}`, blink && "led-blink", className)}
    />
  );
}

/**
 * Every section of the site is a "rack unit": a faceplate with corner
 * screws and a unit header strip, mounted between the page rails.
 */
export default function RackUnit({
  id,
  unit,
  label,
  status = "ONLINE",
  ledColor = "green",
  children,
  className,
}: {
  id?: string;
  unit: string;
  label: string;
  status?: string;
  ledColor?: "green" | "amber" | "red" | "off";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative border-b border-line bg-bg lg:mx-8", className)}
    >
      {/* unit header strip */}
      <div className="flex items-center justify-between border-b border-line bg-panel px-4 py-3 sm:px-8">
        <div className="flex items-center gap-4">
          <Screw />
          <span className="text-[11px] tracking-[0.25em] text-muted">
            {unit} <span className="text-line-bright">//</span>{" "}
            <span className="text-ink">{label}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-[11px] tracking-[0.25em] text-muted sm:flex">
            <Led color={ledColor} />
            {status}
          </span>
          <Screw />
        </div>
      </div>

      <div className="relative">{children}</div>

      {/* bottom screws */}
      <div className="flex items-center justify-between bg-panel px-4 py-2 sm:px-8">
        <Screw />
        <span className="text-[10px] tracking-[0.3em] text-line-bright select-none">
          {unit}
        </span>
        <Screw />
      </div>
    </section>
  );
}
