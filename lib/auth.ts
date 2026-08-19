import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import { CONTENT_DIR } from "@/lib/content";

const ADMIN_FILE = path.join(CONTENT_DIR, "admin.json");
const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const DEFAULT_PASSWORD = "admin123";

export type AdminFile = {
  passwordHash: string;
  secret: string;
  defaultPassword: boolean;
};

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function readAdminFile(): AdminFile | null {
  try {
    const raw = JSON.parse(fs.readFileSync(ADMIN_FILE, "utf8")) as AdminFile;
    if (raw && typeof raw.passwordHash === "string" && typeof raw.secret === "string") {
      return raw;
    }
  } catch {
    return null;
  }
  return null;
}

function writeAdminFile(admin: AdminFile) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  fs.writeFileSync(
    ADMIN_FILE,
    JSON.stringify(admin, null, 2),
    "utf8"
  );
}

export function ensureAdminFile(): AdminFile {
  const existing = readAdminFile();
  if (existing) return existing;
  const admin: AdminFile = {
    passwordHash: hashPassword(DEFAULT_PASSWORD),
    secret: crypto.randomBytes(32).toString("hex"),
    defaultPassword: true,
  };
  writeAdminFile(admin);
  return admin;
}

export function isDefaultPassword(): boolean {
  return ensureAdminFile().defaultPassword;
}

function sign(secret: string, payload: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(secret: string): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  return `${payload}.${sign(secret, payload)}`;
}

export function verifySessionToken(token: string, secret: string): boolean {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (sign(secret, payload) !== signature) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  return true;
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token, ensureAdminFile().secret);
}

export async function setSessionCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(ensureAdminFile().secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export function changePassword(current: string, next: string): boolean {
  const admin = ensureAdminFile();
  if (hashPassword(current) !== admin.passwordHash) return false;
  if (typeof next !== "string" || next.length < 6) return false;
  admin.passwordHash = hashPassword(next);
  admin.defaultPassword = false;
  writeAdminFile(admin);
  return true;
}
