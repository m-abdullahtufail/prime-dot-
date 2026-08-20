import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { team } = getContent();
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getContent().team.find((m) => m.slug === slug);
  if (!member) return {};
  return pageMetadata(
    `/team/${slug}`,
    `${member.name} — ${member.role} | Prime Dot Studio`,
    `${member.name} is the ${member.role} at Prime Dot Studio. ${member.bio}`
  );
}

export default async function MemberPage({ params }: Props) {
  const { slug } = await params;
  const { team, teamSection } = getContent();
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  const waNumber = member.phone?.replace(/\D/g, "");
  const contactLinks = [
    member.phone && {
      href: `https://wa.me/${waNumber}?text=Hi%20${encodeURIComponent(member.name.split(" ")[0])}%2C%20I%20found%20you%20through%20Prime%20Dot%20Studio.`,
      external: true,
      label: member.phone,
      icon: "phone" as const,
    },
    member.email && {
      href: `mailto:${member.email}`,
      external: false,
      label: member.email,
      icon: "mail" as const,
    },
    member.linkedin && {
      href: member.linkedin,
      external: true,
      label: "LinkedIn ↗",
      icon: "linkedin" as const,
    },
    member.instagram && {
      href: member.instagram,
      external: true,
      label: "Instagram ↗",
      icon: "instagram" as const,
    },
  ].filter(Boolean) as {
    href: string;
    external: boolean;
    label: string;
    icon: "phone" | "mail" | "linkedin" | "instagram";
  }[];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
          <a
            href="/team"
            className="nav-link flex items-center gap-2 text-sm hover:text-prime-light"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
            Back to team
          </a>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="card relative aspect-square overflow-hidden rounded-[2rem] p-0">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-b from-ink-soft to-ink font-display text-7xl font-bold text-cream">
                  {member.initials}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 z-20 p-7">
                <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-cream md:text-4xl">
                  {member.name}
                </h1>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-prime-light">
                  {member.role}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="kicker">
                  <span className="nav-dot mr-2" />
                  {teamSection.kicker}
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/90 md:text-lg">
                  {member.name} is our <span className="text-prime-light">{member.role}</span>.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist md:text-base">
                  {member.bio}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="nav-link flex items-center gap-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-prime-light">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {link.icon === "phone" && (
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                        )}
                        {link.icon === "mail" && (
                          <>
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                          </>
                        )}
                        {link.icon === "linkedin" && (
                          <>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                          </>
                        )}
                        {link.icon === "instagram" && (
                          <>
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37Z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </>
                        )}
                      </svg>
                    </span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}