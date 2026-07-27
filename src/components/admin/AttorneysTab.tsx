"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, Save } from "lucide-react";
import type { Attorney } from "@/lib/types";
import { Field, TextInput, TextArea } from "./Field";

type Draft = Omit<Attorney, "id" | "practiceAreas" | "education" | "barAdmissions"> & {
  id?: string;
  practiceAreas: string;
  education: string;
  barAdmissions: string;
};

const BLANK: Draft = {
  slug: "",
  name: "",
  title: "Attorney",
  photo: "",
  order: 99,
  practiceAreas: "",
  education: "",
  barAdmissions: "",
  bio: "",
  phone: "",
  badge: "",
};

function toDraft(a: Attorney): Draft {
  return {
    ...a,
    practiceAreas: a.practiceAreas.join("\n"),
    education: a.education.join("\n"),
    barAdmissions: a.barAdmissions.join("\n"),
  };
}

function toPayload(d: Draft) {
  return {
    slug: d.slug,
    name: d.name,
    title: d.title,
    photo: d.photo,
    order: Number(d.order) || 99,
    practiceAreas: d.practiceAreas.split("\n").map((s) => s.trim()).filter(Boolean),
    education: d.education.split("\n").map((s) => s.trim()).filter(Boolean),
    barAdmissions: d.barAdmissions.split("\n").map((s) => s.trim()).filter(Boolean),
    bio: d.bio,
    phone: d.phone,
    badge: d.badge || undefined,
  };
}

export function AttorneysTab() {
  const [attorneys, setAttorneys] = useState<Attorney[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/attorneys");
    setAttorneys(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    setError("");
    const payload = toPayload(draft);
    const res = await fetch(draft.id ? `/api/attorneys/${draft.id}` : "/api/attorneys", {
      method: draft.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Failed to save. Please check the fields and try again.");
      return;
    }
    setDraft(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this attorney? This can't be undone.")) return;
    await fetch(`/api/attorneys/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-ink">Attorneys</h2>
        <button
          onClick={() => setDraft({ ...BLANK })}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:scale-[1.02] transition-transform"
        >
          <Plus size={15} /> Add attorney
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {attorneys.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-4 rounded-2xl bg-paper p-4 ring-1 ring-ink/8"
          >
            {a.photo ? (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink/5">
                <Image src={a.photo} alt={a.name} fill sizes="56px" className="object-cover" />
              </div>
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-xl bg-ink/5" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-ink">{a.name}</p>
              <p className="truncate text-xs text-ink/50">
                {a.title} · {a.practiceAreas.slice(0, 2).join(", ")}
              </p>
            </div>
            <button
              onClick={() => setDraft(toDraft(a))}
              className="rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink"
              aria-label="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(a.id)}
              className="rounded-full p-2 text-ink/60 hover:bg-red-50 hover:text-red-600"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {attorneys.length === 0 && (
          <p className="rounded-2xl bg-paper p-6 text-center text-sm text-ink/50 ring-1 ring-ink/8">
            No attorneys yet.
          </p>
        )}
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-paper p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-medium text-ink">
                {draft.id ? "Edit attorney" : "Add attorney"}
              </h3>
              <button
                onClick={() => setDraft(null)}
                className="rounded-full p-1.5 text-ink/50 hover:bg-ink/5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <TextInput
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                />
              </Field>
              <Field label="Slug (URL)">
                <TextInput
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                  placeholder="jane-doe"
                />
              </Field>
              <Field label="Title">
                <TextInput
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <TextInput
                  value={draft.phone}
                  onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                />
              </Field>
              <Field label="Photo path">
                <TextInput
                  value={draft.photo}
                  onChange={(e) => setDraft({ ...draft, photo: e.target.value })}
                  placeholder="/images/attorney-name.jpg"
                />
              </Field>
              <Field label="Display order">
                <TextInput
                  type="number"
                  value={draft.order}
                  onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Practice areas (one per line)">
                <TextArea
                  rows={3}
                  value={draft.practiceAreas}
                  onChange={(e) => setDraft({ ...draft, practiceAreas: e.target.value })}
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Education (one per line)">
                <TextArea
                  rows={3}
                  value={draft.education}
                  onChange={(e) => setDraft({ ...draft, education: e.target.value })}
                />
              </Field>
              <Field label="Bar admissions (one per line)">
                <TextArea
                  rows={3}
                  value={draft.barAdmissions}
                  onChange={(e) => setDraft({ ...draft, barAdmissions: e.target.value })}
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Bio (blank line between paragraphs)">
                <TextArea
                  rows={8}
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                />
              </Field>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDraft(null)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink/60 hover:bg-ink/5"
              >
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
