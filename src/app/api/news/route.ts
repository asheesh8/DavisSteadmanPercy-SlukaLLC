import { NextRequest, NextResponse } from "next/server";
import { getNews, createNews } from "@/lib/db";
import { isAuthorized } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getNews());
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.title || !body?.body) {
    return NextResponse.json({ error: "title and body are required" }, { status: 400 });
  }
  const item = createNews({
    title: body.title,
    date: body.date || new Date().toISOString().slice(0, 10),
    body: body.body,
  });
  return NextResponse.json(item, { status: 201 });
}
