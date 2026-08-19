"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Link, SiteContent } from "@/lib/types";

type HeaderProps = {
  nav: SiteContent["nav"];
  brand: SiteContent["brand"];
};

export default function Header({ nav, brand }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: Link["href"]) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full px-6 py-3 transition-all duration-500 lg:px-8 ${
          scrolled
            ? "glass-strong py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
            : "bg-transparent py-4"
        }`}
      >
        <a href="/" className="group flex items-center gap-3">
          <img
            src={brand.logo}
            alt={brand.name}
            width={56}
            height={56}
            className="h-14 w-14 object-contain drop-shadow-[0_0_12px_rgba(229,22,44,0.35)]"
          />
          <span className="hidden font-display text-[13px] font-bold uppercase tracking-[0.18em] text-cream sm:block">
            {brand.name} <span className="text-prime">{brand.nameAccent}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? "text-prime-light" : ""}`}
            >
              {link.label}
            </a>
          ))}
          <a href={nav.ctaHref} className="btn-primary px-5 py-2.5 font-sans">
            {nav.ctaLabel}
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 md:hidden"
        >
          <span
            className={`h-px w-5 bg-cream transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-cream transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="glass-strong mx-4 mt-3 flex flex-col gap-1 rounded-3xl p-4 md:hidden">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`nav-link rounded-xl px-4 py-3 hover:bg-prime/10 ${
                isActive(link.href) ? "text-prime-light" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.ctaHref}
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 px-5 py-3 font-sans"
          >
            {nav.ctaLabel}
          </a>
        </nav>
      )}
    </header>
  );
}
