import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { getContent } from "@/lib/content";

type SignatureProps = {
  showHeader?: boolean;
};

export default function Signature({ showHeader = true }: SignatureProps) {
  const { whySection, stats, reasons } = getContent();
  return (
    <section id="why-us" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20">
            <div className="liquid animate-liquid -right-24 -top-24 size-96 opacity-70" />
            <div className="liquid animate-liquid -bottom-32 -left-24 size-[26rem] opacity-40" />

            <div className="relative z-10">
              {showHeader && (
                <>
                  <p className="kicker">
                    <span className="nav-dot mr-2" />
                    {whySection.kicker}
                  </p>
                  <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                    {whySection.titlePrefix}{" "}
                    <span className="text-shine">{whySection.titleAccent}</span>
                  </h2>
                </>
              )}

              <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-14">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => {
                    const num = stat.value.match(/\d+/);
                    const suffix = stat.value.replace(/\d+/, "");
                    return (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-white/10 bg-ink/40 p-5"
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

                <div className="flex flex-col justify-center gap-7">
                  {reasons.map((reason) => (
                    <div key={reason.title} className="group flex gap-5">
                      <span className="nav-dot mt-2 shrink-0" />
                      <div>
                        <h3 className="font-display text-base font-bold uppercase tracking-wide text-cream">
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist">
                          {reason.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
