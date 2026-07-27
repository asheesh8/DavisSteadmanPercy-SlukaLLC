import { NextRequest, NextResponse } from "next/server";
import { getContactSubmissions, createContactSubmission } from "@/lib/db";
import { isAuthorized } from "@/lib/auth";

// Public — anyone can submit the contact form.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.message) {
    return NextResponse.json(
      { error: "Name and message are required." },
      { status: 400 },
    );
  }
  const submission = createContactSubmission({
    name: String(body.name).slice(0, 200),
    email: String(body.email || "").slice(0, 200),
    phone: String(body.phone || "").slice(0, 50),
    message: String(body.message).slice(0, 5000),
  });
  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}

// Admin-only — list submissions. (Guarded by middleware too, but this route
// checks again since GET isn't in the middleware's mutating-methods gate.)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getContactSubmissions());
}
