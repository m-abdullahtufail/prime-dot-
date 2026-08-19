import { changePassword, isAuthed } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  let body: { current?: unknown; next?: unknown };
  try {
    body = (await request.json()) as { current?: unknown; next?: unknown };
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }
  if (typeof body.current !== "string" || typeof body.next !== "string") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (changePassword(body.current, body.next)) {
    return Response.json({ ok: true });
  }
  return Response.json(
    { error: "Current password is wrong, or the new one is too short (min 6 characters)." },
    { status: 400 }
  );
}
