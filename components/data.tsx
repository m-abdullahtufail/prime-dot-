const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const ICONS: React.ReactNode[] = [
  <svg key="code" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <path d="m8 9-4 3 4 3" />
    <path d="m16 9 4 3-4 3" />
    <path d="m13.5 6-3 12" />
  </svg>,
  <svg key="web" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M7 6.5h.01M10 6.5h.01" />
  </svg>,
  <svg key="ai" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <rect x="5" y="3" width="14" height="18" rx="2.5" />
    <path d="M12 3v18M12 8l3-3M12 8l-3-3" />
  </svg>,
  <svg key="model" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" />
  </svg>,
  <svg key="design" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <circle cx="7" cy="8" r="2" />
    <path d="M3 21h18" />
    <path d="M5 15l4-4 3 3 5-6 4 4v9H5z" />
  </svg>,
  <svg key="brand" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <path d="M3 17l5-8 4 5 3-4 6 7" />
    <path d="M3 21h18" />
  </svg>,
  <svg key="growth" viewBox="0 0 24 24" className="size-7" {...stroke}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2a10 10 0 0 0 0 20c2 0 3-1 3-2.5 0-.8-.4-1.3-.8-1.7-.4-.5-.7-1-.7-1.8 0-1.4 1-2.5 2.5-2.5H17a5 5 0 0 0 5-5c0-4-4-6.5-10-6.5z" />
  </svg>,
];
