"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/types";
import LoginForm from "@/components/admin/LoginForm";
import { useToast } from "@/components/admin/fields";
import {
  BrandPanel,
  ContactPanel,
  FooterPanel,
  HeroPanel,
  LocationPanel,
  MarqueePanel,
  OverviewPanel,
  SeoPanel,
  ServicesPanel,
  SettingsPanel,
  TeamPanel,
  WhyPanel,
} from "@/components/admin/panels";

type SectionId =
  | "overview"
  | "brand"
  | "hero"
  | "marquee"
  | "services"
  | "why"
  | "team"
  | "contact"
  | "location"
  | "footer"
  | "seo"
  | "settings";

const SECTIONS: { id: SectionId; label: string; icon: ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <Icon name="grid" /> },
  { id: "brand", label: "Brand & Navigation", icon: <Icon name="tag" /> },
  { id: "hero", label: "Hero", icon: <Icon name="sparkle" /> },
  { id: "marquee", label: "Marquee", icon: <Icon name="ticker" /> },
  { id: "services", label: "Services", icon: <Icon name="layers" /> },
  { id: "why", label: "Why Us", icon: <Icon name="star" /> },
  { id: "team", label: "Team", icon: <Icon name="users" /> },
  { id: "contact", label: "Contact", icon: <Icon name="mail" /> },
  { id: "location", label: "Location", icon: <Icon name="pin" /> },
  { id: "footer", label: "Footer", icon: <Icon name="footer" /> },
  { id: "seo", label: "SEO", icon: <Icon name="search" /> },
  { id: "settings", label: "Settings", icon: <Icon name="gear" /> },
];

function Icon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "size-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M12 2H2v10l9.3 9.3a1 1 0 0 0 1.4 0l8.6-8.6a1 1 0 0 0 0-1.4L12 2Z" />
          <path d="M7 7h.01" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" />
        </svg>
      );
    case "ticker":
      return (
        <svg {...common}>
          <rect x="2" y="8" width="20" height="8" rx="2" />
          <path d="M6 8V6a6 6 0 0 1 12 0v2" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 2 2.9 6.3 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.4l1.2-6.6L2.5 9.2l6.6-.9L12 2Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M16 5a3.5 3.5 0 0 1 0 6.7M17.5 20a6.5 6.5 0 0 0-3.4-5.7" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "footer":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 15h18" />
          <path d="M7 19h.01M10 19h.01" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AdminApp({
  authed,
  initial,
  defaults,
  isDefaultPassword,
}: {
  authed: boolean;
  initial: SiteContent;
  defaults: SiteContent;
  isDefaultPassword: boolean;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<SiteContent>(() => structuredClone(initial));
  const [saved, setSaved] = useState<SiteContent>(() => structuredClone(initial));
  const [active, setActive] = useState<SectionId>("overview");
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useToast();

  if (!authed) {
    return <LoginForm isDefaultPassword={isDefaultPassword} />;
  }

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);

  const publish = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        showToast(data.error ?? "Publish failed.");
        return;
      }
      setSaved(structuredClone(draft));
      showToast("Published — the website is updated.");
      router.refresh();
    } catch {
      showToast("Publish failed.");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  const panelProps = { draft, setDraft, defaults, showToast };

  const renderPanel = () => {
    switch (active) {
      case "overview":
        return <OverviewPanel {...panelProps} dirty={dirty} onPublish={() => void publish()} />;
      case "brand":
        return <BrandPanel {...panelProps} />;
      case "hero":
        return <HeroPanel {...panelProps} />;
      case "marquee":
        return <MarqueePanel {...panelProps} />;
      case "services":
        return <ServicesPanel {...panelProps} />;
      case "why":
        return <WhyPanel {...panelProps} />;
      case "team":
        return <TeamPanel {...panelProps} />;
      case "contact":
        return <ContactPanel {...panelProps} />;
      case "location":
        return <LocationPanel {...panelProps} />;
      case "footer":
        return <FooterPanel {...panelProps} />;
      case "seo":
        return <SeoPanel {...panelProps} />;
      case "settings":
        return <SettingsPanel {...panelProps} onLogout={() => void logout()} />;
    }
  };

  return (
    <div className="flex min-h-svh bg-ink text-cream">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-white/10 bg-ink-soft/80 backdrop-blur-2xl">
        <div className="flex items-center gap-2.5 px-5 pt-6 pb-5">
          <span className="grid size-9 place-items-center rounded-xl bg-prime text-cream">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M12 0c1 7-3 9-4 12-1 3 0 6 3 8l2-2c-2-1-3-3-2-5s5-3 6-10c0-1-1-3-5-3z" />
            </svg>
          </span>
          <div>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-cream">
              Prime Dot <span className="text-prime">Admin</span>
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-mist">Control room</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActive(section.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-all duration-200 ${
                active === section.id
                  ? "bg-prime/15 text-cream ring-1 ring-prime/40"
                  : "text-cream/60 hover:bg-white/5 hover:text-cream"
              }`}
            >
              <span className={active === section.id ? "text-prime-light" : "text-mist"}>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <a href="/" target="_blank" className="admin-btn admin-btn-ghost w-full !py-2.5 !text-[11px]">
            View website ↗
          </a>
        </div>
      </aside>

      <div className="ml-60 flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-ink/85 px-8 py-4 backdrop-blur-2xl">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-cream">
              {SECTIONS.find((s) => s.id === active)?.label}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
              {dirty ? "Unsaved changes" : "All changes published"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`hidden size-2 rounded-full transition-colors md:block ${
                dirty ? "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" : "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              }`}
            />
            <button
              type="button"
              disabled={!dirty || saving}
              onClick={() => void publish()}
              className="btn-primary px-6 py-2.5 disabled:opacity-35"
            >
              {saving ? "Publishing…" : "Publish changes"}
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">
          <div className="mx-auto max-w-4xl">{renderPanel()}</div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[fade-up_0.3s_ease-out] rounded-2xl border border-prime/40 bg-ink-soft px-5 py-3.5 text-sm text-cream shadow-[0_16px_48px_-12px_rgba(229,22,44,0.45)]">
          <span className="nav-dot mr-2" />
          {toast}
        </div>
      )}
    </div>
  );
}
