type PageHeaderProps = {
  kicker: string;
  titlePrefix: string;
  titleAccent: string;
  subtitle?: string;
};

export default function PageHeader({
  kicker,
  titlePrefix,
  titleAccent,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden pb-4 pt-40 md:pt-48">
      <div className="hero-ring animate-spin-slow absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="hero-item flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
            <span className="kicker">
              <span className="nav-dot mr-2" />
              {kicker}
            </span>
          </p>
          <h1
            className="hero-item mt-6 font-display text-[clamp(2rem,5.5vw,4rem)] font-extrabold uppercase leading-[1.06] tracking-tight text-cream"
            style={{ animationDelay: "0.2s" }}
          >
            {titlePrefix} <span className="text-shine">{titleAccent}</span>
          </h1>
          {subtitle && (
            <p
              className="hero-item mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg"
              style={{ animationDelay: "0.35s" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
