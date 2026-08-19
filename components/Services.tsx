import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { ICONS } from "@/components/data";
import { getContent } from "@/lib/content";

type ServicesProps = {
  showHeader?: boolean;
};

export default function Services({ showHeader = true }: ServicesProps) {
  const { servicesSection, services } = getContent();
  return (
    <section className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {showHeader && (
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker">
                  <span className="nav-dot mr-2" />
                  {servicesSection.kicker}
                </p>
                <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                  {servicesSection.title.map((line) => (
                    <span key={line.text} className="block">
                      <span className={line.accent ? "text-shine" : ""}>
                        {line.text}
                      </span>
                    </span>
                  ))}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-mist">
                {servicesSection.description}
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={(i % 3) * 110}
              className={i === 6 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <TiltCard className="h-full">
                <article className="card group flex h-full flex-col p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-prime/12 text-prime-light ring-1 ring-prime/30 transition-all duration-500 group-hover:bg-prime group-hover:text-cream group-hover:shadow-[0_0_28px_rgba(229,22,44,0.5)]">
                      {ICONS[i % ICONS.length]}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-lg font-bold uppercase tracking-wide text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {service.description}
                  </p>
                  <span className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-prime-light opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Learn more →
                  </span>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
