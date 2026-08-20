"use client";

import { useRef, useState, type ReactNode } from "react";
import type { SiteContent, TitleLine } from "@/lib/types";
import {
  Checkbox,
  Field,
  ListEditor,
  PageEditor,
  SectionCard,
  TextArea,
  TextInput,
  TitleLinesEditor,
} from "@/components/admin/fields";

type PanelProps = {
  draft: SiteContent;
  setDraft: (updater: (draft: SiteContent) => SiteContent) => void;
  defaults: SiteContent;
  showToast: (message: string) => void;
};

const textItem = () => ({ text: "" });

function LinksEditor({ items, onChange }: { items: { label: string; href: string }[]; onChange: (next: { label: string; href: string }[]) => void }) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      addLabel="Add link"
      newItem={() => ({ label: "", href: "" })}
      renderHeader={(item) => item.label || "New link"}
      fields={[
        { key: "label", label: "Label" },
        { key: "href", label: "URL", type: "url" },
      ]}
    />
  );
}

function LogoUpload({ value, onChange, showToast }: { value: string; onChange: (next: string) => void; showToast: (m: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        showToast(data.error ?? "Upload failed.");
        return;
      }
      onChange(data.url);
      showToast("Logo uploaded.");
    } catch {
      showToast("Upload failed.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-ink/60">
        {value ? (
          <img src={value} alt="Logo preview" className="size-full object-contain p-1.5" />
        ) : (
          <span className="font-mono text-[9px] uppercase tracking-widest text-mist">No logo</span>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="admin-btn admin-btn-primary !py-2 !text-[11px]">
            {uploading ? "Uploading…" : "Upload new"}
          </button>
          <button type="button" onClick={() => onChange("/logo.png")} className="admin-btn admin-btn-ghost !py-2 !text-[11px]">
            Restore default
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
            e.target.value = "";
          }}
        />
        <p className="text-[11px] leading-relaxed text-mist/70">PNG, JPG, WEBP, GIF or SVG — max 5MB.</p>
      </div>
    </div>
  );
}

export function OverviewPanel({ draft, defaults, setDraft, showToast }: PanelProps & { dirty?: boolean; onPublish?: () => void; lastSaved?: string }) {
  const cards = [
    { label: "Services", value: draft.services.length },
    { label: "Team members", value: draft.team.length },
    { label: "Reasons", value: draft.reasons.length },
    { label: "Nav links", value: draft.nav.links.length },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="admin-card p-5">
            <p className="font-display text-3xl font-extrabold text-prime-light">{card.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{card.label}</p>
          </div>
        ))}
      </div>

      <SectionCard title="Welcome to the control room" description="Everything on the website is editable from the sidebar — text, images, links, team, services and SEO. Changes only go live after you press Publish.">
        <div className="grid gap-3 sm:grid-cols-2">
          <a href="/" target="_blank" className="btn-primary px-6 py-3.5">
            View website ↗
          </a>
          <button type="button" onClick={() => setDraft(() => structuredClone(defaults))} className="btn-ghost px-6 py-3.5 text-center">
            Reset all to defaults
          </button>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          Last published: <span className="text-cream">{draft.updatedAt ? new Date(draft.updatedAt).toLocaleString() : "—"}</span>
        </p>
      </SectionCard>

      <SectionCard title="Tips">
        <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-relaxed text-mist">
          <li>Use the <span className="text-cream">Reset</span> button on any card to restore that section to its original values.</li>
          <li>Each item in a list can be reordered with the arrow buttons.</li>
          <li>“Accent” lines render with the red shine effect.</li>
          <li>Uploaded images are stored in <span className="font-mono text-cream">/public/uploads</span>.</li>
        </ul>
      </SectionCard>
    </div>
  );
}

export function BrandPanel({ draft, setDraft, defaults, showToast }: PanelProps) {
  const setBrand = (patch: Partial<SiteContent["brand"]>) => setDraft((d) => ({ ...d, brand: { ...d.brand, ...patch } }));
  const setNav = (patch: Partial<SiteContent["nav"]>) => setDraft((d) => ({ ...d, nav: { ...d.nav, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Brand identity" description="The name, logo and tagline shown across the site." onReset={() => setDraft((d) => ({ ...d, brand: structuredClone(defaults.brand) }))}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Brand name">
            <TextInput value={draft.brand.name} onChange={(v) => setBrand({ name: v })} />
          </Field>
          <Field label="Brand name (accent part)" hint="Rendered in red next to the name.">
            <TextInput value={draft.brand.nameAccent} onChange={(v) => setBrand({ nameAccent: v })} />
          </Field>
        </div>
        <Field label="Tagline" hint="Shown in the hero kicker.">
          <TextInput value={draft.brand.tagline} onChange={(v) => setBrand({ tagline: v })} />
        </Field>
        <Field label="Logo">
          <LogoUpload value={draft.brand.logo} onChange={(v) => setBrand({ logo: v })} showToast={showToast} />
        </Field>
      </SectionCard>

      <SectionCard title="Navigation" description="Links in the header and footer menus." onReset={() => setDraft((d) => ({ ...d, nav: structuredClone(defaults.nav) }))}>
        <LinksEditor items={draft.nav.links} onChange={(links) => setNav({ links })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="CTA button label">
            <TextInput value={draft.nav.ctaLabel} onChange={(v) => setNav({ ctaLabel: v })} />
          </Field>
          <Field label="CTA button URL">
            <TextInput value={draft.nav.ctaHref} onChange={(v) => setNav({ ctaHref: v })} />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}

export function HeroPanel({ draft, setDraft, defaults }: PanelProps) {
  const setHero = (patch: Partial<SiteContent["hero"]>) => setDraft((d) => ({ ...d, hero: { ...d.hero, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Headline" description="Each line of the big hero title. Mark a line as “Accent” for the red shine effect." onReset={() => setDraft((d) => ({ ...d, hero: { ...structuredClone(defaults.hero), stats: d.hero.stats } }))}>
        <Field label="Kicker">
          <TextInput value={draft.hero.kicker} onChange={(v) => setHero({ kicker: v })} />
        </Field>
        <TitleLinesEditor value={draft.hero.headline} onChange={(headline) => setHero({ headline })} />
        <Field label="Subtitle">
          <TextArea value={draft.hero.subtitle} onChange={(v) => setHero({ subtitle: v })} rows={3} />
        </Field>
      </SectionCard>

      <SectionCard title="Call-to-action buttons">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Primary button label">
            <TextInput value={draft.hero.primaryCtaLabel} onChange={(v) => setHero({ primaryCtaLabel: v })} />
          </Field>
          <Field label="Primary button URL">
            <TextInput value={draft.hero.primaryCtaHref} onChange={(v) => setHero({ primaryCtaHref: v })} />
          </Field>
          <Field label="Secondary button label">
            <TextInput value={draft.hero.secondaryCtaLabel} onChange={(v) => setHero({ secondaryCtaLabel: v })} />
          </Field>
          <Field label="Secondary button URL">
            <TextInput value={draft.hero.secondaryCtaHref} onChange={(v) => setHero({ secondaryCtaHref: v })} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Hero stats" description="The small numbers under the hero buttons." onReset={() => setDraft((d) => ({ ...d, hero: { ...structuredClone(defaults.hero), headline: d.hero.headline } }))}>
        <ListEditor
          items={draft.hero.stats}
          onChange={(stats) => setHero({ stats })}
          addLabel="Add stat"
          newItem={() => ({ value: "", label: "" })}
          renderHeader={(item) => item.label || "New stat"}
          fields={[
            { key: "value", label: "Value", placeholder: "e.g. 07" },
            { key: "label", label: "Label", placeholder: "e.g. Core services" },
          ]}
        />
      </SectionCard>
    </div>
  );
}

export function MarqueePanel({ draft, setDraft, defaults }: PanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Marquee" description="The scrolling strip between the hero and services." onReset={() => setDraft((d) => ({ ...d, marquee: structuredClone(defaults.marquee) }))}>
        <ListEditor
          items={draft.marquee.items.map((text) => ({ text }))}
          onChange={(items) => setDraft((d) => ({ ...d, marquee: { items: items.map((i) => i.text) } }))}
          addLabel="Add item"
          newItem={textItem}
          renderHeader={(item) => item.text || "New item"}
          fields={[{ key: "text", label: "Text", span2: true }]}
        />
      </SectionCard>
    </div>
  );
}

export function ServicesPanel({ draft, setDraft, defaults }: PanelProps) {
  const setSection = (patch: Partial<SiteContent["servicesSection"]>) =>
    setDraft((d) => ({ ...d, servicesSection: { ...d.servicesSection, ...patch } }));
  const setAllCard = (patch: Partial<SiteContent["servicesSection"]["allCard"]>) =>
    setDraft((d) => ({ ...d, servicesSection: { ...d.servicesSection, allCard: { ...d.servicesSection.allCard, ...patch } } }));
  const setPage = (patch: Partial<SiteContent["pages"]["services"]>) =>
    setDraft((d) => ({ ...d, pages: { ...d.pages, services: { ...d.pages.services, ...patch } } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Services section" description="The section on the home page." onReset={() => setDraft((d) => ({ ...d, servicesSection: structuredClone(defaults.servicesSection) }))}>
        <Field label="Kicker">
          <TextInput value={draft.servicesSection.kicker} onChange={(v) => setSection({ kicker: v })} />
        </Field>
        <TitleLinesEditor value={draft.servicesSection.title} onChange={(title) => setSection({ title })} />
        <Field label="Description">
          <TextArea value={draft.servicesSection.description} onChange={(v) => setSection({ description: v })} rows={2} />
        </Field>
        <Field label="“View all” link label">
          <TextInput value={draft.servicesSection.viewAllLabel} onChange={(v) => setSection({ viewAllLabel: v })} />
        </Field>
      </SectionCard>

      <SectionCard title="“All disciplines” card" description="The card that links to the full services page." onReset={() => setDraft((d) => ({ ...d, servicesSection: { ...structuredClone(defaults.servicesSection), title: d.servicesSection.title } }))}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Big number">
            <TextInput value={draft.servicesSection.allCard.count} onChange={(v) => setAllCard({ count: v })} />
          </Field>
          <Field label="Title">
            <TextInput value={draft.servicesSection.allCard.title} onChange={(v) => setAllCard({ title: v })} />
          </Field>
        </div>
        <Field label="Body text">
          <TextArea value={draft.servicesSection.allCard.body} onChange={(v) => setAllCard({ body: v })} rows={2} />
        </Field>
        <Field label="Link label">
          <TextInput value={draft.servicesSection.allCard.label} onChange={(v) => setAllCard({ label: v })} />
        </Field>
      </SectionCard>

      <SectionCard title="Services" description="The seven services. Icons are fixed by position (1–7)." onReset={() => setDraft((d) => ({ ...d, services: structuredClone(defaults.services) }))}>
        <ListEditor
          items={draft.services}
          onChange={(services) => setDraft((d) => ({ ...d, services }))}
          addLabel="Add service"
          newItem={() => ({ title: "", tag: "", description: "" })}
          renderHeader={(item) => item.title || "New service"}
          fields={[
            { key: "title", label: "Title" },
            { key: "tag", label: "Tag", placeholder: "e.g. 01 / Engineering" },
            { key: "description", label: "Description", type: "textarea", span2: true },
          ]}
        />
      </SectionCard>

      <SectionCard title="Services page" description="Header and SEO for /services." onReset={() => setDraft((d) => ({ ...d, pages: { ...d.pages, services: structuredClone(defaults.pages.services) } }))}>
        <PageEditor value={draft.pages.services} onChange={(next) => setDraft((d) => ({ ...d, pages: { ...d.pages, services: next } }))} />
      </SectionCard>
    </div>
  );
}

export function WhyPanel({ draft, setDraft, defaults }: PanelProps) {
  const setSection = (patch: Partial<SiteContent["whySection"]>) =>
    setDraft((d) => ({ ...d, whySection: { ...d.whySection, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Why section" description="The glass panel on the home page." onReset={() => setDraft((d) => ({ ...d, whySection: structuredClone(defaults.whySection) }))}>
        <Field label="Kicker">
          <TextInput value={draft.whySection.kicker} onChange={(v) => setSection({ kicker: v })} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Title (first part)">
            <TextInput value={draft.whySection.titlePrefix} onChange={(v) => setSection({ titlePrefix: v })} />
          </Field>
          <Field label="Title (accent part)">
            <TextInput value={draft.whySection.titleAccent} onChange={(v) => setSection({ titleAccent: v })} />
          </Field>
        </div>
        <Field label="Body text">
          <TextArea value={draft.whySection.body} onChange={(v) => setSection({ body: v })} rows={3} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Button label">
            <TextInput value={draft.whySection.ctaLabel} onChange={(v) => setSection({ ctaLabel: v })} />
          </Field>
          <Field label="Button URL">
            <TextInput value={draft.whySection.ctaHref} onChange={(v) => setSection({ ctaHref: v })} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Stats" description="The animated counters." onReset={() => setDraft((d) => ({ ...d, stats: structuredClone(defaults.stats) }))}>
        <ListEditor
          items={draft.stats}
          onChange={(stats) => setDraft((d) => ({ ...d, stats }))}
          addLabel="Add stat"
          newItem={() => ({ value: "", label: "" })}
          renderHeader={(item) => item.label || "New stat"}
          fields={[
            { key: "value", label: "Value", placeholder: "e.g. 40+" },
            { key: "label", label: "Label", placeholder: "e.g. Projects shipped" },
          ]}
        />
      </SectionCard>

      <SectionCard title="Reasons" description="The list on the Why Us page." onReset={() => setDraft((d) => ({ ...d, reasons: structuredClone(defaults.reasons) }))}>
        <ListEditor
          items={draft.reasons}
          onChange={(reasons) => setDraft((d) => ({ ...d, reasons }))}
          addLabel="Add reason"
          newItem={() => ({ title: "", body: "" })}
          renderHeader={(item) => item.title || "New reason"}
          fields={[
            { key: "title", label: "Title" },
            { key: "body", label: "Body", type: "textarea", span2: true },
          ]}
        />
      </SectionCard>

      <SectionCard title="Why Us page" description="Header and SEO for /why-us." onReset={() => setDraft((d) => ({ ...d, pages: { ...d.pages, why: structuredClone(defaults.pages.why) } }))}>
        <PageEditor value={draft.pages.why} onChange={(next) => setDraft((d) => ({ ...d, pages: { ...d.pages, why: next } }))} />
      </SectionCard>
    </div>
  );
}

export function TeamPanel({ draft, setDraft, defaults }: PanelProps) {
  const setSection = (patch: Partial<SiteContent["teamSection"]>) =>
    setDraft((d) => ({ ...d, teamSection: { ...d.teamSection, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Team section" description="The section on the home page." onReset={() => setDraft((d) => ({ ...d, teamSection: structuredClone(defaults.teamSection) }))}>
        <Field label="Kicker">
          <TextInput value={draft.teamSection.kicker} onChange={(v) => setSection({ kicker: v })} />
        </Field>
        <TitleLinesEditor value={draft.teamSection.title} onChange={(title) => setSection({ title })} />
        <Field label="Description">
          <TextArea value={draft.teamSection.description} onChange={(v) => setSection({ description: v })} rows={2} />
        </Field>
        <Field label="“View all” link label">
          <TextInput value={draft.teamSection.viewAllLabel} onChange={(v) => setSection({ viewAllLabel: v })} />
        </Field>
      </SectionCard>

      <SectionCard title="Team members" description="Photos are shown in the avatar circles; initials are the fallback." onReset={() => setDraft((d) => ({ ...d, team: structuredClone(defaults.team) }))}>
        <ListEditor
          items={draft.team}
          onChange={(team) => setDraft((d) => ({ ...d, team }))}
          addLabel="Add member"
          newItem={() => ({ name: "", role: "", initials: "", slug: "", photo: "", bio: "", email: "", phone: "", linkedin: "", instagram: "" })}
          renderHeader={(item) => item.name || "New member"}
          fields={[
            { key: "name", label: "Name" },
            { key: "role", label: "Role" },
            { key: "initials", label: "Initials", placeholder: "e.g. ME", hint: "Shown when no photo is set." },
            { key: "slug", label: "Slug", placeholder: "e.g. ehtisham", hint: "Page URL: /team/[slug]. Change only if needed." },
            { key: "photo", label: "Photo URL", placeholder: "/team/ehtisham.jpg", hint: "Square image works best." },
            { key: "phone", label: "Phone", placeholder: "+92 300 1234567", hint: "Opens in WhatsApp." },
            { key: "email", label: "Email" },
            { key: "linkedin", label: "LinkedIn URL" },
            { key: "instagram", label: "Instagram URL" },
            { key: "bio", label: "Bio", type: "textarea", span2: true },
          ]}
        />
      </SectionCard>

      <SectionCard title="Team page" description="Header and SEO for /team." onReset={() => setDraft((d) => ({ ...d, pages: { ...d.pages, team: structuredClone(defaults.pages.team) } }))}>
        <PageEditor value={draft.pages.team} onChange={(next) => setDraft((d) => ({ ...d, pages: { ...d.pages, team: next } }))} />
      </SectionCard>
    </div>
  );
}

export function ContactPanel({ draft, setDraft, defaults }: PanelProps) {
  const setSection = (patch: Partial<SiteContent["contactSection"]>) =>
    setDraft((d) => ({ ...d, contactSection: { ...d.contactSection, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Contact section" description="The big “Got an idea?” panel used on the home and contact pages." onReset={() => setDraft((d) => ({ ...d, contactSection: structuredClone(defaults.contactSection) }))}>
        <Field label="Kicker">
          <TextInput value={draft.contactSection.kicker} onChange={(v) => setSection({ kicker: v })} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Title (first part)">
            <TextInput value={draft.contactSection.titlePrefix} onChange={(v) => setSection({ titlePrefix: v })} />
          </Field>
          <Field label="Title (accent part)">
            <TextInput value={draft.contactSection.titleAccent} onChange={(v) => setSection({ titleAccent: v })} />
          </Field>
        </div>
        <Field label="Body text">
          <TextArea value={draft.contactSection.body} onChange={(v) => setSection({ body: v })} rows={3} />
        </Field>
        <Field label="Email address" hint="Used across the whole site (contact, footer, location).">
          <TextInput value={draft.contactSection.email} onChange={(v) => setSection({ email: v })} type="email" />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Back button label" hint="On the home page contact panel.">
            <TextInput value={draft.contactSection.backLabel} onChange={(v) => setSection({ backLabel: v })} />
          </Field>
          <Field label="Back button URL">
            <TextInput value={draft.contactSection.backHref} onChange={(v) => setSection({ backHref: v })} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Contact page" description="Header and SEO for /contact." onReset={() => setDraft((d) => ({ ...d, pages: { ...d.pages, contact: structuredClone(defaults.pages.contact) } }))}>
        <PageEditor value={draft.pages.contact} onChange={(next) => setDraft((d) => ({ ...d, pages: { ...d.pages, contact: next } }))} />
      </SectionCard>
    </div>
  );
}

export function LocationPanel({ draft, setDraft, defaults }: PanelProps) {
  const setLocation = (patch: Partial<SiteContent["location"]>) =>
    setDraft((d) => ({ ...d, location: { ...d.location, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Location section" onReset={() => setDraft((d) => ({ ...d, location: structuredClone(defaults.location) }))}>
        <Field label="Kicker">
          <TextInput value={draft.location.kicker} onChange={(v) => setLocation({ kicker: v })} />
        </Field>
        <TitleLinesEditor value={draft.location.title} onChange={(title) => setLocation({ title })} />
        <Field label="Description">
          <TextArea value={draft.location.description} onChange={(v) => setLocation({ description: v })} rows={2} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Studio name">
            <TextInput value={draft.location.name} onChange={(v) => setLocation({ name: v })} />
          </Field>
          <Field label="Opening hours">
            <TextInput value={draft.location.hours} onChange={(v) => setLocation({ hours: v })} />
          </Field>
        </div>
        <Field label="Address lines">
          <ListEditor
            items={draft.location.address.map((text) => ({ text }))}
            onChange={(items) => setLocation({ address: items.map((i) => i.text) })}
            addLabel="Add address line"
            newItem={textItem}
            renderHeader={(item) => item.text || "New line"}
            fields={[{ key: "text", label: "Line", span2: true }]}
          />
        </Field>
        <Field label="Email">
          <TextInput value={draft.location.email} onChange={(v) => setLocation({ email: v })} type="email" />
        </Field>
        <Field label="Map embed URL" hint="A Google Maps embed URL (…&output=embed).">
          <TextInput value={draft.location.mapQuery} onChange={(v) => setLocation({ mapQuery: v })} type="url" />
        </Field>
        <Field label="Map title">
          <TextInput value={draft.location.mapTitle} onChange={(v) => setLocation({ mapTitle: v })} />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Directions URL">
            <TextInput value={draft.location.directionsUrl} onChange={(v) => setLocation({ directionsUrl: v })} type="url" />
          </Field>
          <Field label="Button label">
            <TextInput value={draft.location.buttonLabel} onChange={(v) => setLocation({ buttonLabel: v })} />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}

export function FooterPanel({ draft, setDraft, defaults }: PanelProps) {
  const setFooter = (patch: Partial<SiteContent["footer"]>) =>
    setDraft((d) => ({ ...d, footer: { ...d.footer, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Footer" onReset={() => setDraft((d) => ({ ...d, footer: structuredClone(defaults.footer) }))}>
        <Field label="About text">
          <TextArea value={draft.footer.about} onChange={(v) => setFooter({ about: v })} rows={3} />
        </Field>
        <Field label="Social links" hint="Shown under “Say hello”.">
          <ListEditor
            items={draft.footer.socials}
            onChange={(socials) => setFooter({ socials })}
            addLabel="Add social link"
            newItem={() => ({ label: "", href: "" })}
            renderHeader={(item) => item.label || "New link"}
            fields={[
              { key: "label", label: "Label", placeholder: "e.g. LinkedIn ↗" },
              { key: "href", label: "URL", type: "url" },
            ]}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Copyright suffix" hint="Rendered as © 2026 {Brand name}. {suffix}">
            <TextInput value={draft.footer.copyrightSuffix} onChange={(v) => setFooter({ copyrightSuffix: v })} />
          </Field>
          <Field label="Crafted line (start)">
            <TextInput value={draft.footer.crafted} onChange={(v) => setFooter({ crafted: v })} />
          </Field>
        </div>
        <Field label="Crafted line (end)" hint="Rendered after the red dot.">
          <TextInput value={draft.footer.craftedAccent} onChange={(v) => setFooter({ craftedAccent: v })} />
        </Field>
      </SectionCard>
    </div>
  );
}

export function SeoPanel({ draft, setDraft, defaults }: PanelProps) {
  const setSeo = (patch: Partial<SiteContent["seo"]>) => setDraft((d) => ({ ...d, seo: { ...d.seo, ...patch } }));
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Global SEO" description="Used when a page doesn't define its own title or description." onReset={() => setDraft((d) => ({ ...d, seo: structuredClone(defaults.seo) }))}>
        <Field label="Site title">
          <TextInput value={draft.seo.siteTitle} onChange={(v) => setSeo({ siteTitle: v })} />
        </Field>
        <Field label="Site description">
          <TextArea value={draft.seo.siteDescription} onChange={(v) => setSeo({ siteDescription: v })} rows={3} />
        </Field>
        <Field label="Keywords">
          <ListEditor
            items={draft.seo.keywords.map((text) => ({ text }))}
            onChange={(items) => setSeo({ keywords: items.map((i) => i.text) })}
            addLabel="Add keyword"
            newItem={textItem}
            renderHeader={(item) => item.text || "New keyword"}
            fields={[{ key: "text", label: "Keyword", span2: true }]}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Open Graph title">
            <TextInput value={draft.seo.ogTitle} onChange={(v) => setSeo({ ogTitle: v })} />
          </Field>
          <Field label="Open Graph description">
            <TextInput value={draft.seo.ogDescription} onChange={(v) => setSeo({ ogDescription: v })} />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}

export function SettingsPanel({ draft, defaults, setDraft, showToast, onLogout }: PanelProps & { onLogout: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const changePassword = async () => {
    if (next.length < 6) {
      showToast("New password must be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      showToast("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        showToast(data.error ?? "Failed to change password.");
        return;
      }
      setCurrent("");
      setNext("");
      setConfirm("");
      showToast("Password changed.");
    } catch {
      showToast("Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Change password" description="Your password protects full control of the website.">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Current password">
            <TextInput value={current} onChange={setCurrent} type="password" />
          </Field>
          <Field label="New password (min 6 chars)">
            <TextInput value={next} onChange={setNext} type="password" />
          </Field>
          <Field label="Confirm new password">
            <TextInput value={confirm} onChange={setConfirm} type="password" />
          </Field>
        </div>
        <button type="button" disabled={busy || !current || !next} onClick={() => void changePassword()} className="admin-btn admin-btn-primary self-start">
          {busy ? "Saving…" : "Change password"}
        </button>
      </SectionCard>

      <SectionCard title="Session">
        <div className="flex flex-wrap gap-3">
          <a href="/" target="_blank" className="admin-btn admin-btn-ghost">
            View website ↗
          </a>
          <button type="button" onClick={onLogout} className="admin-btn admin-btn-ghost">
            Sign out
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Danger zone" description="Restores every section to the original values. Press Publish to make it live.">
        <button
          type="button"
          onClick={() => {
            setDraft(() => structuredClone(defaults));
            showToast("Draft reset to defaults — press Publish to apply.");
          }}
          className="admin-btn admin-btn-danger self-start"
        >
          Reset all content
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
          Content file: <span className="text-cream">content/site.json</span>
        </p>
      </SectionCard>
    </div>
  );
}
