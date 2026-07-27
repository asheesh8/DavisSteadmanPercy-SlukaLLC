"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Save } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { Field, TextInput, TextArea } from "./Field";

const BLANK: Omit<NewsItem, "id"> = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  body: "",
};

export function NewsTab() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [draft, setDraft] = useState<(Omit<NewsItem, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/news");
    setNews(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    const { id, ...payload } = draft;
    await fetch(id ? `/api/news/${id}` : "/api/news", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setDraft(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this news post?")) return;
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-ink">Firm News</h2>
        <button
          onClick={() => setDraft({ ...BLANK })}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:scale-[1.02] transition-transform"
        >
          <Plus size={15} /> New post
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {news.map((n) => (
          <div key={n.id} className="rounded-2xl bg-paper p-5 ring-1 ring-ink/8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-ink">{n.title}</p>
                <p className="text-xs text-ink/45">{n.date}</p>
                <p className="mt-2 line-clamp-2 text-sm text-ink/55">{n.body}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => setDraft(n)}
                  className="rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="rounded-full p-2 text-ink/60 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {news.length === 0 && (
          <p className="rounded-2xl bg-paper p-6 text-center text-sm text-ink/50 ring-1 ring-ink/8">
            No news posts yet.
          </p>
        )}
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[1.75rem] bg-paper p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-medium text-ink">
                {draft.id ? "Edit post" : "New post"}
              </h3>
              <button onClick={() => setDraft(null)} className="rounded-full p-1.5 text-ink/50 hover:bg-ink/5">
                <X size={18} />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <Field label="Title">
                <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              </Field>
              <Field label="Date">
                <TextInput
                  type="date"
                  value={draft.date}
                  onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                />
              </Field>
              <Field label="Body">
                <TextArea rows={8} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
              </Field>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDraft(null)} className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 hover:bg-ink/5">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream disabled:opacity-50"
              >
                <Save size={15} /> {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
