import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { getContent } from "@/lib/content";

type TeamProps = {
  showHeader?: boolean;
};

export default function Team({ showHeader = true }: TeamProps) {
  const { teamSection, team } = getContent();
  return (
    <section className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {showHeader && (
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker">
                  <span className="nav-dot mr-2" />
                  {teamSection.kicker}
                </p>
                <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                  {teamSection.title.map((line) => (
                    <span key={line.text} className="block">
                      <span className={line.accent ? "text-shine" : ""}>
                        {line.text}
                      </span>
                    </span>
                  ))}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-mist">
                {teamSection.description}
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 110}>
              <TiltCard className="h-full">
                <article className="card group h-full p-7 text-center">
                  <div className="relative mx-auto size-24">
                    <div className="absolute inset-0 rounded-full bg-prime/30 blur-lg transition-all duration-500 group-hover:bg-prime/60" />
                    <div className="relative grid size-24 place-items-center rounded-full border border-prime/40 bg-gradient-to-b from-ink-soft to-ink font-display text-2xl font-bold text-cream transition-transform duration-500 group-hover:scale-105">
                      {member.initials}
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-base font-bold uppercase tracking-wide text-cream">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-prime-light">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-mist">
                    {member.bio}
                  </p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
