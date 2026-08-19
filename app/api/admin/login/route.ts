import { ensureAdminFile, hashPassword, isAuthed, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }
  if (typeof body.password !== "string" || !body.password) {
    return Response.json({ error: "Password required." }, { status: 400 });
  }
  if (await isAuthed()) {
    return Response.json({ ok: true });
  }
  const admin = ensureAdminFile();
  if (hashPassword(body.password) !== admin.passwordHash) {
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }
  await setSessionCookie();
  return Response.json({ ok: true });
}
