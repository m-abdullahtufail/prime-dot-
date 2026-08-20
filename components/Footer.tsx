import { getContent } from "@/lib/content";

export default function Footer() {
  const { brand, nav, footer, contactSection } = getContent();
  return (
    <footer className="relative border-t border-white/10 pb-10 pt-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2.5">
              <img
                src={brand.logo}
                alt={brand.name}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="hidden font-display text-[13px] font-bold uppercase tracking-[0.18em] text-cream sm:block">
                {brand.name} <span className="text-prime">{brand.nameAccent}</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              {footer.about}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="kicker">Navigate</p>
            {nav.links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-left">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="kicker">Say hello</p>
            <a
              href={`mailto:${contactSection.email}`}
              className="nav-link text-left"
            >
              {contactSection.email}
            </a>
            {contactSection.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-left"
              >
                {phone.label}
              </a>
            ))}
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-left"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
            © {new Date().getFullYear()} {brand.name}. {footer.copyrightSuffix}
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
            {footer.crafted}
            <span className="nav-dot" />
            {footer.craftedAccent}
          </p>
        </div>
      </div>
    </footer>
  );
}
