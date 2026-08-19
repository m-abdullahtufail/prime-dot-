"use client";

import { useState, type ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs leading-relaxed text-mist/70">{hint}</span>}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="admin-input"
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="admin-input resize-y"
    />
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5"
    >
      <span
        className={`grid size-5 shrink-0 place-items-center rounded-md border transition-all duration-200 ${
          checked
            ? "border-prime bg-prime text-cream"
            : "border-white/20 bg-ink/60 text-transparent"
        }`}
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 13 4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm text-cream/80">{label}</span>
    </button>
  );
}

export function MoveControls({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Move up"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="admin-icon-btn"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6-6 6 6" />
          <path d="M6 21l6-6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Move down"
        disabled={index === count - 1}
        onClick={() => onMove(index, index + 1)}
        className="admin-icon-btn"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6l6 6 6-6" />
          <path d="M6 15l6 6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Remove"
        onClick={onRemove}
        className="admin-icon-btn text-prime-light hover:border-prime/60 hover:bg-prime/10"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        </svg>
      </button>
    </div>
  );
}

export type ListFieldDef<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "url" | "checkbox";
  placeholder?: string;
  hint?: string;
  rows?: number;
  span2?: boolean;
};

export function ListEditor<T extends Record<string, unknown>>({
  items,
  onChange,
  fields,
  newItem,
  addLabel,
  renderHeader,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  fields: ListFieldDef<T>[];
  newItem: () => T;
  addLabel: string;
  renderHeader?: (item: T, index: number) => string;
}) {
  const updateItem = (index: number, patch: Partial<T>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };
  const moveItem = (from: number, to: number) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };
  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className="admin-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-prime-light">
              <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-prime/12 ring-1 ring-prime/30">
                {index + 1}
              </span>
              <span className="truncate">{renderHeader ? renderHeader(item, index) : `Item ${index + 1}`}</span>
            </span>
            <MoveControls index={index} count={items.length} onMove={moveItem} onRemove={() => removeItem(index)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((field) => {
              const value = item[field.key];
              if (field.type === "checkbox") {
                return (
                  <div key={field.key} className={field.span2 ? "sm:col-span-2" : ""}>
                    <Checkbox
                      checked={Boolean(value)}
                      onChange={(checked) => updateItem(index, { [field.key]: checked } as Partial<T>)}
                      label={field.label}
                    />
                  </div>
                );
              }
              return (
                <div key={field.key} className={field.span2 ? "sm:col-span-2" : ""}>
                  <Field label={field.label} hint={field.hint}>
                    {field.type === "textarea" ? (
                      <TextArea
                        value={String(value ?? "")}
                        rows={field.rows ?? 3}
                        placeholder={field.placeholder}
                        onChange={(next) => updateItem(index, { [field.key]: next } as Partial<T>)}
                      />
                    ) : (
                      <TextInput
                        type={field.type === "url" ? "url" : "text"}
                        value={String(value ?? "")}
                        placeholder={field.placeholder}
                        onChange={(next) => updateItem(index, { [field.key]: next } as Partial<T>)}
                      />
                    )}
                  </Field>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, newItem()])} className="admin-btn admin-btn-ghost self-start">
        + {addLabel}
      </button>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  onReset,
  children,
}: {
  title: string;
  description?: string;
  onReset?: () => void;
  children: ReactNode;
}) {
  return (
    <section className="admin-card p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-cream">{title}</h3>
          {description && <p className="mt-1 text-xs leading-relaxed text-mist">{description}</p>}
        </div>
        {onReset && (
          <button type="button" onClick={onReset} className="admin-btn admin-btn-ghost shrink-0 !px-3 !py-1.5 !text-[10px]">
            Reset
          </button>
        )}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function PageEditor({
  value,
  onChange,
}: {
  value: {
    kicker: string;
    titlePrefix: string;
    titleAccent: string;
    subtitle?: string;
    metaTitle: string;
    metaDescription: string;
  };
  onChange: (next: typeof value) => void;
}) {
  const set = (key: keyof typeof value, next: string) => onChange({ ...value, [key]: next });
  return (
    <>
      <Field label="Kicker">
        <TextInput value={value.kicker} onChange={(next) => set("kicker", next)} placeholder="e.g. What we do" />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title (first part)">
          <TextInput value={value.titlePrefix} onChange={(next) => set("titlePrefix", next)} />
        </Field>
        <Field label="Title (accent part)">
          <TextInput value={value.titleAccent} onChange={(next) => set("titleAccent", next)} />
        </Field>
      </div>
      <Field label="Subtitle">
        <TextArea value={value.subtitle ?? ""} onChange={(next) => set("subtitle", next)} rows={2} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Meta title (SEO)">
          <TextInput value={value.metaTitle} onChange={(next) => set("metaTitle", next)} />
        </Field>
        <Field label="Meta description (SEO)">
          <TextInput value={value.metaDescription} onChange={(next) => set("metaDescription", next)} />
        </Field>
      </div>
    </>
  );
}

export function TitleLinesEditor({
  value,
  onChange,
}: {
  value: { text: string; accent?: boolean }[];
  onChange: (next: { text: string; accent?: boolean }[]) => void;
}) {
  const update = (index: number, patch: Partial<{ text: string; accent?: boolean }>) =>
    onChange(value.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  const move = (from: number, to: number) => {
    const next = [...value];
    const [line] = next.splice(from, 1);
    next.splice(to, 0, line);
    onChange(next);
  };
  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));
  return (
    <div className="flex flex-col gap-3">
      {value.map((line, index) => (
        <div key={index} className="admin-card flex items-center gap-3 p-3">
          <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-prime/12 font-mono text-[11px] text-prime-light ring-1 ring-prime/30">
            {index + 1}
          </span>
          <input
            value={line.text}
            onChange={(e) => update(index, { text: e.target.value })}
            className="admin-input !rounded-lg !py-2"
          />
          <Checkbox
            checked={Boolean(line.accent)}
            onChange={(checked) => update(index, { accent: checked })}
            label="Accent"
          />
          <MoveControls index={index} count={value.length} onMove={move} onRemove={() => remove(index)} />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { text: "" }])}
        className="admin-btn admin-btn-ghost self-start"
      >
        + Add line
      </button>
    </div>
  );
}

export function useToast(): [string | null, (message: string) => void] {
  const [toast, setToast] = useState<string | null>(null);
  const show = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  };
  return [toast, show];
}
