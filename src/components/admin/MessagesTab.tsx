"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Phone } from "lucide-react";
import type { ContactSubmission } from "@/lib/types";

export function MessagesTab() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact");
    if (res.ok) setSubmissions(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id: string) {
    await fetch(`/api/contact/${id}`, { method: "PATCH" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-ink">Contact Messages</h2>
      <p className="mt-1 text-sm text-ink/50">Submissions from the website contact form.</p>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-ink/50">Loading…</p>}
        {!loading && submissions.length === 0 && (
          <p className="rounded-2xl bg-paper p-6 text-center text-sm text-ink/50 ring-1 ring-ink/8">
            No messages yet.
          </p>
        )}
        {submissions.map((s) => (
          <div
            key={s.id}
            className={`rounded-2xl p-5 ring-1 ${
              s.read ? "bg-paper ring-ink/8" : "bg-brass/10 ring-brass/25"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{s.name}</p>
                <p className="text-xs text-ink/50">
                  {s.email && <span>{s.email}</span>}
                  {s.phone && (
                    <span className="ml-2 inline-flex items-center gap-1">
                      <Phone size={11} /> {s.phone}
                    </span>
                  )}
                </p>
                <p className="mt-2 whitespace-pre-line text-sm text-ink/70">{s.message}</p>
                <p className="mt-2 text-xs text-ink/40">
                  {new Date(s.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => markRead(s.id)}
                  disabled={s.read}
                  className="rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink disabled:opacity-30"
                  aria-label="Mark read"
                >
                  {s.read ? <MailOpen size={16} /> : <Mail size={16} />}
                </button>
                <button
                  onClick={() => remove(s.id)}
                  className="rounded-full p-2 text-ink/60 hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
