# Davis, Steadman, Percy & Sluka — Website

Website for **Davis, Steadman, Percy & Sluka**, a law firm serving Vermont and New Hampshire's Upper Valley: attorney and staff profiles, news, office details, a contact form, and an AI receptionist chatbot. A password-protected `/admin` dashboard lets the firm edit attorneys, staff, news, site settings, and read contact submissions.

**Live:** https://davis-steadman-percy-sluka-llc.vercel.app

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS 4
- Content stored as JSON files in `data/` (read and written by `src/lib/db.ts`)
- Admin auth: one shared password, HMAC-signed session cookie (`src/lib/auth.ts`), enforced in `src/proxy.ts`
- Chatbot: Anthropic Claude when `ANTHROPIC_API_KEY` is set, canned answers otherwise (`src/app/api/chat`, `src/lib/chatbot.ts`)

## Project layout

```
src/app/(site)/      Public pages: home, attorneys, staff, contact, privacy policy
src/app/admin/       Login page and dashboard
src/app/api/         JSON CRUD for attorneys, staff, news, settings, contact; auth; chat
src/proxy.ts         Guards /admin/dashboard and every mutating admin API call
src/lib/             JSON data access, auth, chatbot prompt, shared types
data/                The site's content (attorneys, staff, news, settings, submissions)
```

## Local setup

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # then set the values below
npm run dev                  # http://localhost:3000 — admin at /admin
npm run lint
```

## Environment variables

Names only — set values in `.env.local` or the Vercel project. Never commit them.

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Password for `/admin`. Use a long, unique value. |
| `ADMIN_SESSION_SECRET` | Long random string that signs the admin session cookie (`openssl rand -hex 32`) |
| `ANTHROPIC_API_KEY` | Optional — turns on the AI chatbot |

## Deploying

Hosted on Vercel; pushes to `main` deploy to production. Set the variables above first — without `ADMIN_SESSION_SECRET` the app falls back to a development-only signing key.

**Known limitation:** on Vercel the deployed filesystem is read-only, so changes made in `/admin` and new contact-form submissions cannot be written to `data/`. The admin is effective only when running on a server with a writable disk, until storage moves to a database.
