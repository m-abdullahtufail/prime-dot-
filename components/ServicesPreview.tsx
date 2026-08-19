import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { ICONS } from "@/components/data";
import { getContent } from "@/lib/content";

const FEATURED = [0, 2, 5];

export default function ServicesPreview() {
  const { servicesSection, services } = getContent();
  return (
    <section id="services-preview" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
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
            <a
              href="/services"
              className="nav-link flex items-center gap-2 hover:text-prime-light"
            >
              {servicesSection.viewAllLabel}
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((index, i) => {
            const service = services[index];
            if (!service) return null;
            return (
              <Reveal key={service.title} delay={i * 110}>
                <TiltCard className="h-full">
                  <article className="card group flex h-full flex-col p-7">
                    <span className="grid size-13 place-items-center rounded-2xl bg-prime/12 text-prime-light ring-1 ring-prime/30 transition-all duration-500 group-hover:bg-prime group-hover:text-cream group-hover:shadow-[0_0_28px_rgba(229,22,44,0.5)]">
                      {ICONS[index % ICONS.length]}
                    </span>
                    <h3 className="mt-6 font-display text-base font-bold uppercase tracking-wide text-cream">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {service.description}
                    </p>
                    <span className="mt-auto pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-prime-light opacity-0 transition-all duration-500 group-hover:opacity-100">
                      Explore →
                    </span>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}

          <Reveal delay={330}>
            <TiltCard className="h-full">
              <a
                href="/services"
                className="card group flex h-full flex-col items-center justify-center gap-4 p-7 text-center"
              >
                <span className="grid size-16 place-items-center rounded-full border border-prime/40 bg-prime/10 font-display text-xl font-bold text-prime-light transition-all duration-500 group-hover:bg-prime group-hover:text-cream group-hover:shadow-[0_0_36px_rgba(229,22,44,0.5)]">
                  {servicesSection.allCard.count}
                </span>
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-cream">
                  {servicesSection.allCard.title}
                </h3>
                <p className="text-sm leading-relaxed text-mist">
                  {servicesSection.allCard.body}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-prime-light">
                  {servicesSection.allCard.label}
                </span>
              </a>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
