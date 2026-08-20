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
                <a
                  href={`/team/${member.slug}`}
                  className="block h-full transition-opacity duration-300 hover:opacity-95"
                >
                <article className="card group h-full overflow-hidden p-0 text-center">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink-soft to-ink">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="grid h-full w-full place-items-center font-display text-5xl font-bold text-cream">
                          {member.initials}
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-6 items-center justify-center bg-ink/55 px-6 py-5 backdrop-blur-md">
                      <h3 className="-translate-y-2 text-center font-display text-base font-bold uppercase tracking-wide text-cream">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  <div className="px-6 pb-7 pt-7">
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-prime-light">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {member.bio}
                    </p>
                  </div>
                </article>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
