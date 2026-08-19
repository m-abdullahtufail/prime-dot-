"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({
  isDefaultPassword,
}: {
  isDefaultPassword: boolean;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-ink px-6">
      <div className="blob animate-blob left-[-10%] top-[-15%] size-[36rem] opacity-40" />
      <div className="blob animate-blob-2 bottom-[-20%] right-[-12%] size-[36rem] opacity-40" />

      <div className="glass relative z-10 w-full max-w-md rounded-[2rem] p-8 md:p-10">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-prime text-cream">
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M12 0c1 7-3 9-4 12-1 3 0 6 3 8l2-2c-2-1-3-3-2-5s5-3 6-10c0-1-1-3-5-3z" />
            </svg>
          </span>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-cream">
              Prime Dot <span className="text-prime">Admin</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
              Content control room
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
          <label className="block">
            <span className="admin-label">Admin password</span>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="admin-input"
            />
          </label>

          {error && (
            <p className="rounded-xl border border-prime/40 bg-prime/10 px-4 py-3 text-sm text-prime-light">
              {error}
            </p>
          )}

          {isDefaultPassword && (
            <p className="rounded-xl border border-white/10 bg-ink/50 px-4 py-3 text-xs leading-relaxed text-mist">
              Default password: <span className="font-mono text-cream">admin123</span>
              <br />
              Change it in <span className="text-cream">Settings</span> after you sign in.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary px-6 py-3.5 disabled:opacity-40"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <a href="/" className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mist hover:text-cream">
            ← Back to website
          </a>
        </form>
      </div>
    </div>
  );
}
