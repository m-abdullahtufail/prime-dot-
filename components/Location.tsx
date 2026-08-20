import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default function Location() {
  const { location, contactSection } = getContent();
  return (
    <section id="location" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker">
                <span className="nav-dot mr-2" />
                {location.kicker}
              </p>
              <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                {location.title.map((line) => (
                  <span key={line.text} className="block">
                    <span className={line.accent ? "text-shine" : ""}>
                      {line.text}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-mist">
              {location.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.5fr]">
            <div className="card flex flex-col gap-7 p-8">
              <span className="grid size-14 place-items-center rounded-2xl bg-prime/12 text-prime-light ring-1 ring-prime/30">
                <svg
                  viewBox="0 0 24 24"
                  className="size-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>

              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-cream">
                  {location.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {location.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
                <a
                  href={`mailto:${location.email}`}
                  className="nav-link flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-prime-light"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {location.email}
                </a>
                {contactSection.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link flex items-center gap-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-4 text-prime-light"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                    {phone.label}
                  </a>
                ))}
                <p className="flex items-center gap-2 text-sm text-mist">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 text-prime-light"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {location.hours}
                </p>
              </div>

              <a
                href={location.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-auto px-6 py-3.5"
              >
                {location.buttonLabel}
              </a>
            </div>

            <div className="card relative min-h-[420px] overflow-hidden p-0">
              <iframe
                title={location.mapTitle}
                src={location.mapQuery}
                className="absolute inset-0 size-full border-0"
                style={{
                  filter:
                    "invert(0.9) hue-rotate(180deg) saturate(0.55) contrast(0.9)",
                }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
