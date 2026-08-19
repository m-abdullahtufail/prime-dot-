import { getContent } from "@/lib/content";

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-cream/80 md:gap-12 md:text-base"
        >
          {item}
          <svg
            className="size-4 shrink-0 text-prime"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0c1 7-3 9-4 12-1 3 0 6 3 8l2-2c-2-1-3-3-2-5s5-3 6-10c0-1-1-3-5-3z" />
          </svg>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  const { marquee } = getContent();
  return (
    <section
      aria-label="Services marquee"
      className="relative border-y border-white/10 bg-ink-soft/60 py-5 backdrop-blur-sm"
    >
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max items-center">
          <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
            <Row items={marquee.items} />
          </div>
          <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
            <Row items={marquee.items} />
          </div>
        </div>
      </div>
    </section>
  );
}
