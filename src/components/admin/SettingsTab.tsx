"use client";

import { useEffect, useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Settings } from "@/lib/types";
import { Field, TextInput, TextArea } from "./Field";

export function SettingsTab() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!settings) return <p className="text-sm text-ink/50">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-ink">Site Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream disabled:opacity-50"
        >
          <Save size={15} /> {saving ? "Saving…" : saved ? "Saved!" : "Save changes"}
        </button>
      </div>

      <div className="mt-6 space-y-5 rounded-[1.75rem] bg-paper p-6 ring-1 ring-ink/8">
        <Field label="Firm name">
          <TextInput
            value={settings.firmName}
            onChange={(e) => setSettings({ ...settings, firmName: e.target.value })}
          />
        </Field>
        <Field label="Tagline">
          <TextInput
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          />
        </Field>
        <Field label="Intro text">
          <TextArea
            rows={2}
            value={settings.introText}
            onChange={(e) => setSettings({ ...settings, introText: e.target.value })}
          />
        </Field>
        <Field label="Services text">
          <TextArea
            rows={2}
            value={settings.servicesText}
            onChange={(e) => setSettings({ ...settings, servicesText: e.target.value })}
          />
        </Field>
        <Field label="Real estate text">
          <TextArea
            rows={2}
            value={settings.realEstateText}
            onChange={(e) => setSettings({ ...settings, realEstateText: e.target.value })}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Main phone">
            <TextInput
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </Field>
          <Field label="Woodstock phone">
            <TextInput
              value={settings.woodstockPhone}
              onChange={(e) => setSettings({ ...settings, woodstockPhone: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Logo path">
            <TextInput
              value={settings.logo}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
            />
          </Field>
          <Field label="Hero image path">
            <TextInput
              value={settings.heroImage}
              onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
            />
          </Field>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-medium text-ink">Offices</h3>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                offices: [
                  ...settings.offices,
                  {
                    id: `office-${Date.now()}`,
                    name: "New Office",
                    address: "",
                    cityStateZip: "",
                    phone: "",
                    photo: "",
                  },
                ],
              })
            }
            className="flex items-center gap-1.5 rounded-full bg-ink/5 px-3.5 py-1.5 text-xs font-semibold text-ink/70 hover:bg-ink/10"
          >
            <Plus size={14} /> Add office
          </button>
        </div>
        <div className="mt-3 space-y-4">
          {settings.offices.map((office, i) => (
            <div key={office.id} className="rounded-2xl bg-paper p-5 ring-1 ring-ink/8">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Office {i + 1}
                </p>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      offices: settings.offices.filter((_, idx) => idx !== i),
                    })
                  }
                  className="rounded-full p-1.5 text-ink/40 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <TextInput
                    value={office.name}
                    onChange={(e) => {
                      const offices = [...settings.offices];
                      offices[i] = { ...office, name: e.target.value };
                      setSettings({ ...settings, offices });
                    }}
                  />
                </Field>
                <Field label="Phone">
                  <TextInput
                    value={office.phone}
                    onChange={(e) => {
                      const offices = [...settings.offices];
                      offices[i] = { ...office, phone: e.target.value };
                      setSettings({ ...settings, offices });
                    }}
                  />
                </Field>
                <Field label="Address">
                  <TextInput
                    value={office.address}
                    onChange={(e) => {
                      const offices = [...settings.offices];
                      offices[i] = { ...office, address: e.target.value };
                      setSettings({ ...settings, offices });
                    }}
                  />
                </Field>
                <Field label="City, State ZIP">
                  <TextInput
                    value={office.cityStateZip}
                    onChange={(e) => {
                      const offices = [...settings.offices];
                      offices[i] = { ...office, cityStateZip: e.target.value };
                      setSettings({ ...settings, offices });
                    }}
                  />
                </Field>
                <Field label="Photo path">
                  <TextInput
                    value={office.photo}
                    onChange={(e) => {
                      const offices = [...settings.offices];
                      offices[i] = { ...office, photo: e.target.value };
                      setSettings({ ...settings, offices });
                    }}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
