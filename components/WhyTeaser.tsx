import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { getContent } from "@/lib/content";

export default function WhyTeaser() {
  const { whySection, stats } = getContent();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-16 md:py-16">
            <div className="liquid animate-liquid -right-24 -top-24 size-80 opacity-60" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="kicker">
                  <span className="nav-dot mr-2" />
                  {whySection.kicker}
                </p>
                <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
                  {whySection.titlePrefix}{" "}
                  <span className="text-shine">{whySection.titleAccent}</span>
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-mist md:text-base">
                  {whySection.body}
                </p>
                <a href={whySection.ctaHref} className="btn-ghost mt-8 px-7 py-3.5">
                  {whySection.ctaLabel}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat) => {
                  const num = stat.value.match(/\d+/);
                  const suffix = stat.value.replace(/\d+/, "");
                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-ink/40 p-5 transition-colors duration-500 hover:border-prime/40"
                    >
                      <p className="font-display text-3xl font-extrabold text-prime-light">
                        {num ? (
                          <Counter value={parseInt(num[0], 10)} suffix={suffix} />
                        ) : (
                          stat.value
                        )}
                      </p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
