import { isAuthed } from "@/lib/auth";
import { DEFAULT_CONTENT, getContent, saveContent } from "@/lib/content";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const MAX_BODY_BYTES = 1024 * 1024;

async function guard(): Promise<boolean> {
  return isAuthed();
}

export async function GET() {
  if (!(await guard())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  return Response.json({
    content: getContent(),
    defaults: DEFAULT_CONTENT,
  });
}

export async function PUT(request: Request) {
  if (!(await guard())) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return Response.json({ error: "Payload too large." }, { status: 413 });
    }
    const body = JSON.parse(text) as unknown;
    const payload =
      isPlainObject(body) && isPlainObject(body.content) ? body.content : body;
    const result = saveContent(payload);
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: 400 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
  }
}
