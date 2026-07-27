"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Plus, X, Save } from "lucide-react";
import type { StaffMember } from "@/lib/types";
import { Field, TextInput, TextArea } from "./Field";

const BLANK: Omit<StaffMember, "id"> = {
  name: "",
  title: "",
  photo: "",
  bio: "",
  order: 99,
  isPet: false,
};

export function StaffTab() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [draft, setDraft] = useState<(Omit<StaffMember, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/staff");
    setStaff(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    setError("");
    const { id, ...payload } = draft;
    const res = await fetch(id ? `/api/staff/${id}` : "/api/staff", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      setError("Failed to save.");
      return;
    }
    setDraft(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this staff entry?")) return;
    await fetch(`/api/staff/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-ink">Staff</h2>
        <button
          onClick={() => setDraft({ ...BLANK })}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream hover:scale-[1.02] transition-transform"
        >
          <Plus size={15} /> Add staff member
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {staff.map((s) => (
          <div key={s.id} className="flex items-center gap-4 rounded-2xl bg-paper p-4 ring-1 ring-ink/8">
            {s.photo ? (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-ink/5">
                <Image src={s.photo} alt={s.name} fill sizes="56px" className="object-cover" />
              </div>
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-xl bg-ink/5" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-ink">
                {s.name} {s.isPet && <span className="text-xs text-brass">(pet)</span>}
              </p>
              <p className="truncate text-xs text-ink/50">{s.title}</p>
            </div>
            <button
              onClick={() => setDraft(s)}
              className="rounded-full p-2 text-ink/60 hover:bg-ink/5 hover:text-ink"
              aria-label="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(s.id)}
              className="rounded-full p-2 text-ink/60 hover:bg-red-50 hover:text-red-600"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {staff.length === 0 && (
          <p className="rounded-2xl bg-paper p-6 text-center text-sm text-ink/50 ring-1 ring-ink/8">
            No staff yet.
          </p>
        )}
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] bg-paper p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-medium text-ink">
                {draft.id ? "Edit staff member" : "Add staff member"}
              </h3>
              <button onClick={() => setDraft(null)} className="rounded-full p-1.5 text-ink/50 hover:bg-ink/5">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <TextInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </Field>
              <Field label="Title">
                <TextInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Photo path">
                <TextInput
                  value={draft.photo}
                  onChange={(e) => setDraft({ ...draft, photo: e.target.value })}
                  placeholder="/images/staff-name.jpg"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Bio">
                <TextArea rows={4} value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} />
              </Field>
            </div>
            <div className="mt-4 flex items-center gap-6">
              <Field label="Display order">
                <TextInput
                  type="number"
                  value={draft.order}
                  onChange={(e) => setDraft({ ...draft, order: Number(e.target.value) })}
                />
              </Field>
              <label className="mt-6 flex items-center gap-2 text-sm text-ink/70">
                <input
                  type="checkbox"
                  checked={!!draft.isPet}
                  onChange={(e) => setDraft({ ...draft, isPet: e.target.checked })}
                  className="h-4 w-4 rounded accent-brass"
                />
                This is an office pet
              </label>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

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
