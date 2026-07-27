"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-[1.75rem] bg-paper p-8 shadow-xl ring-1 ring-ink/8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-cream">
          <ShieldCheck size={22} />
        </div>
        <h1 className="font-display mt-5 text-2xl font-medium text-ink">Admin Sign In</h1>
        <p className="mt-1 text-sm text-ink/55">
          Manage attorneys, staff, news, and messages.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/35" />
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-cream-dim py-3 pl-10 pr-4 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brass/50"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.01] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink/40">
          Default password is set in <code className="rounded bg-cream-dim px-1 py-0.5">.env.local</code>
        </p>
      </div>
    </div>
  );
}
