import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

type ContactProps = {
  backHref?: string;
  backLabel?: string;
};

export default function Contact({ backHref, backLabel }: ContactProps) {
  const { contactSection } = getContent();
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16 md:py-24">
            <div className="liquid animate-liquid left-1/2 top-[-14rem] size-[30rem] -translate-x-1/2 opacity-50" />

            <div className="relative z-10">
              <p className="kicker">
                <span className="nav-dot mr-2" />
                {contactSection.kicker}
              </p>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                {contactSection.titlePrefix}{" "}
                <span className="text-shine">{contactSection.titleAccent}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-mist md:text-base">
                {contactSection.body}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${contactSection.email}`}
                  className="btn-primary px-8 py-4"
                >
                  {contactSection.email}
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </a>
                <a
                  href={backHref ?? contactSection.backHref}
                  className="btn-ghost px-8 py-4"
                >
                  {backLabel ?? contactSection.backLabel}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
