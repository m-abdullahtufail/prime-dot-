import { getContent } from "@/lib/content";

export default function Hero() {
  const { hero } = getContent();
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-32 pb-20"
    >
      <div className="hero-ring animate-spin-slow absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 md:size-[46rem]" />
      <div className="hero-ring animate-spin-slower absolute left-1/2 top-1/2 size-[27rem] -translate-x-1/2 -translate-y-1/2 md:size-[36rem]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="hero-item flex items-center justify-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.32em] text-cream/60">
              <span className="nav-dot mr-2" />
              {hero.kicker}
            </span>
          </p>

          <h1 className="mt-8 font-display text-[clamp(2.4rem,7vw,5.2rem)] font-extrabold uppercase leading-[1.04] tracking-tight text-cream">
            {hero.headline.map((line, i) => (
              <span
                key={line.text}
                className={`hero-item block ${line.accent ? "text-shine" : ""}`}
                style={{ animationDelay: `${0.2 + i * 0.12}s` }}
              >
                {line.text}
              </span>
            ))}
          </h1>

          <p
            className="hero-item mx-auto mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg"
            style={{ animationDelay: "0.4s" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="hero-item mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "0.6s" }}
          >
            <a href={hero.primaryCtaHref} className="btn-primary px-8 py-4">
              {hero.primaryCtaLabel}
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
            <a href={hero.secondaryCtaHref} className="btn-ghost px-8 py-4">
              {hero.secondaryCtaLabel}
            </a>
          </div>

          <div
            className="hero-item mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
            style={{ animationDelay: "0.8s" }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="font-display text-2xl font-bold text-prime-light md:text-3xl">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div
            className="hero-item mt-20 flex justify-center"
            style={{ animationDelay: "1.05s" }}
          >
            <a
              href="#services-preview"
              aria-label="Scroll to services"
              className="flex h-11 w-7 items-start justify-center rounded-full border border-white/20 p-1.5 transition-colors duration-300 hover:border-prime/60"
            >
              <span className="size-1.5 animate-bounce rounded-full bg-prime-light" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
