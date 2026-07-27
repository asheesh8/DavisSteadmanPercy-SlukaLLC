import fs from "fs";
import path from "path";
import type {
  Attorney,
  StaffMember,
  NewsItem,
  Settings,
  ContactSubmission,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(file: string): T {
  const filePath = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson<T>(file: string, data: T): void {
  const filePath = path.join(DATA_DIR, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function nextId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ---------- Attorneys ----------
export function getAttorneys(): Attorney[] {
  return readJson<Attorney[]>("attorneys.json").sort((a, b) => a.order - b.order);
}

export function getAttorneyBySlug(slug: string): Attorney | undefined {
  return getAttorneys().find((a) => a.slug === slug);
}

export function createAttorney(data: Omit<Attorney, "id">): Attorney {
  const attorneys = getAttorneys();
  const attorney: Attorney = { ...data, id: nextId("attorney") };
  attorneys.push(attorney);
  writeJson("attorneys.json", attorneys);
  return attorney;
}

export function updateAttorney(
  id: string,
  data: Partial<Attorney>,
): Attorney | null {
  const attorneys = getAttorneys();
  const idx = attorneys.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  attorneys[idx] = { ...attorneys[idx], ...data, id };
  writeJson("attorneys.json", attorneys);
  return attorneys[idx];
}

export function deleteAttorney(id: string): boolean {
  const attorneys = getAttorneys();
  const filtered = attorneys.filter((a) => a.id !== id);
  if (filtered.length === attorneys.length) return false;
  writeJson("attorneys.json", filtered);
  return true;
}

// ---------- Staff ----------
export function getStaff(): StaffMember[] {
  return readJson<StaffMember[]>("staff.json").sort((a, b) => a.order - b.order);
}

export function createStaff(data: Omit<StaffMember, "id">): StaffMember {
  const staff = getStaff();
  const member: StaffMember = { ...data, id: nextId("staff") };
  staff.push(member);
  writeJson("staff.json", staff);
  return member;
}

export function updateStaff(
  id: string,
  data: Partial<StaffMember>,
): StaffMember | null {
  const staff = getStaff();
  const idx = staff.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  staff[idx] = { ...staff[idx], ...data, id };
  writeJson("staff.json", staff);
  return staff[idx];
}

export function deleteStaff(id: string): boolean {
  const staff = getStaff();
  const filtered = staff.filter((s) => s.id !== id);
  if (filtered.length === staff.length) return false;
  writeJson("staff.json", filtered);
  return true;
}

// ---------- News ----------
export function getNews(): NewsItem[] {
  return readJson<NewsItem[]>("news.json").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function createNews(data: Omit<NewsItem, "id">): NewsItem {
  const news = getNews();
  const item: NewsItem = { ...data, id: nextId("news") };
  news.push(item);
  writeJson("news.json", news);
  return item;
}

export function updateNews(id: string, data: Partial<NewsItem>): NewsItem | null {
  const news = getNews();
  const idx = news.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  news[idx] = { ...news[idx], ...data, id };
  writeJson("news.json", news);
  return news[idx];
}

export function deleteNews(id: string): boolean {
  const news = getNews();
  const filtered = news.filter((n) => n.id !== id);
  if (filtered.length === news.length) return false;
  writeJson("news.json", filtered);
  return true;
}

// ---------- Settings ----------
export function getSettings(): Settings {
  return readJson<Settings>("settings.json");
}

export function updateSettings(data: Partial<Settings>): Settings {
  const current = getSettings();
  const updated = { ...current, ...data };
  writeJson("settings.json", updated);
  return updated;
}

// ---------- Contact Submissions ----------
export function getContactSubmissions(): ContactSubmission[] {
  return readJson<ContactSubmission[]>("contact-submissions.json").sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function createContactSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt" | "read">,
): ContactSubmission {
  const submissions = getContactSubmissions();
  const submission: ContactSubmission = {
    ...data,
    id: nextId("submission"),
    createdAt: new Date().toISOString(),
    read: false,
  };
  submissions.unshift(submission);
  writeJson("contact-submissions.json", submissions);
  return submission;
}

export function markSubmissionRead(id: string): boolean {
  const submissions = getContactSubmissions();
  const idx = submissions.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  submissions[idx].read = true;
  writeJson("contact-submissions.json", submissions);
  return true;
}

export function deleteContactSubmission(id: string): boolean {
  const submissions = getContactSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  if (filtered.length === submissions.length) return false;
  writeJson("contact-submissions.json", filtered);
  return true;
}
