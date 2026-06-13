const ITEMS = [
  "FULL-STACK",
  "SELF-HOSTED",
  "HOMELAB",
  "@BIGIBZ1",
  "TYPESCRIPT",
  "DOCKER",
  "NEXT.JS",
  "PROXMOX",
];

export default function Marquee() {
  const row = (
    <div className="flex items-center" aria-hidden>
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-display text-2xl uppercase tracking-wide text-muted sm:text-3xl"
        >
          <span className="px-6">{item}</span>
          <span className="text-amber">✕</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-b border-line bg-panel py-4 lg:mx-8">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
