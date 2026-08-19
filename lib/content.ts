import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { SiteContent } from "@/lib/types";

export const CONTENT_DIR = path.join(process.cwd(), "content");
export const SITE_FILE = path.join(CONTENT_DIR, "site.json");

const PUBLIC_PATHS = ["/", "/services", "/why-us", "/team", "/contact"];

export const DEFAULT_CONTENT: SiteContent = JSON.parse(
  fs.readFileSync(SITE_FILE, "utf8")
) as SiteContent;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, patch: unknown): T {
  if (!isPlainObject(patch)) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(patch)) {
    if (!(key in out)) continue;
    const baseValue = out[key];
    const patchValue = patch[key];
    if (isPlainObject(baseValue) && isPlainObject(patchValue)) {
      out[key] = deepMerge(baseValue, patchValue);
    } else if (Array.isArray(baseValue) && Array.isArray(patchValue)) {
      out[key] = patchValue;
    } else {
      out[key] = patchValue;
    }
  }
  return out as T;
}

export const getContent = cache((): SiteContent => {
  try {
    return JSON.parse(fs.readFileSync(SITE_FILE, "utf8")) as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
});

export function saveContent(body: unknown): { ok: boolean; error?: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "Invalid content payload." };
  }
  const next = deepMerge(DEFAULT_CONTENT, body);
  const payload = {
    ...next,
    updatedAt: new Date().toISOString(),
  };
  const tmp = `${SITE_FILE}.tmp`;
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(tmp, JSON.stringify(payload, null, 2), "utf8");
  fs.renameSync(tmp, SITE_FILE);
  for (const p of PUBLIC_PATHS) revalidatePath(p);
  return { ok: true };
}
