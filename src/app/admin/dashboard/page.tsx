"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserSquare2,
  Newspaper,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { AttorneysTab } from "@/components/admin/AttorneysTab";
import { StaffTab } from "@/components/admin/StaffTab";
import { NewsTab } from "@/components/admin/NewsTab";
import { MessagesTab } from "@/components/admin/MessagesTab";
import { SettingsTab } from "@/components/admin/SettingsTab";

const TABS = [
  { id: "attorneys", label: "Attorneys", icon: Users },
  { id: "staff", label: "Staff", icon: UserSquare2 },
  { id: "news", label: "Firm News", icon: Newspaper },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: SettingsIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function DashboardPage() {
  const [tab, setTab] = useState<TabId>("attorneys");
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-5 py-6 sm:px-8 lg:flex-row">
      <aside className="shrink-0 lg:w-60">
        <div className="mb-4 flex items-center justify-between lg:mb-6 lg:block">
          <p className="font-display text-lg font-medium text-ink">Admin</p>
          <div className="flex gap-2 lg:mt-3 lg:flex-col">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink/60 ring-1 ring-ink/8 hover:text-ink"
            >
              <ExternalLink size={12} /> View site
            </Link>
          </div>
        </div>

        <nav className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                  active ? "bg-ink text-cream" : "text-ink/65 hover:bg-ink/5"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-4 hidden w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-ink/50 hover:bg-red-50 hover:text-red-600 lg:flex"
        >
          <LogOut size={16} /> Log out
        </button>
      </aside>

      <main className="min-w-0 flex-1 rounded-[1.75rem] bg-cream p-1">
        {tab === "attorneys" && <AttorneysTab />}
        {tab === "staff" && <StaffTab />}
        {tab === "news" && <NewsTab />}
        {tab === "messages" && <MessagesTab />}
        {tab === "settings" && <SettingsTab />}
      </main>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2.5 rounded-xl bg-paper px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-ink/8 lg:hidden"
      >
        <LogOut size={16} /> Log out
      </button>
    </div>
  );
}
