import { NextRequest, NextResponse } from "next/server";
import { getAttorneys, createAttorney } from "@/lib/db";
import { isAuthorized } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getAttorneys());
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.slug) {
    return NextResponse.json({ error: "name and slug are required" }, { status: 400 });
  }
  const attorney = createAttorney({
    slug: body.slug,
    name: body.name,
    title: body.title || "Attorney",
    photo: body.photo || "",
    order: Number(body.order) || 99,
    practiceAreas: body.practiceAreas || [],
    education: body.education || [],
    barAdmissions: body.barAdmissions || [],
    bio: body.bio || "",
    phone: body.phone || "",
    badge: body.badge || undefined,
  });
  return NextResponse.json(attorney, { status: 201 });
}
