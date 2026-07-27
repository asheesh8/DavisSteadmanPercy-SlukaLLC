import { NextRequest, NextResponse } from "next/server";
import { getStaff, createStaff } from "@/lib/db";
import { isAuthorized } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getStaff());
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const member = createStaff({
    name: body.name,
    title: body.title || "",
    photo: body.photo || "",
    bio: body.bio || "",
    order: Number(body.order) || 99,
    isPet: Boolean(body.isPet),
  });
  return NextResponse.json(member, { status: 201 });
}
