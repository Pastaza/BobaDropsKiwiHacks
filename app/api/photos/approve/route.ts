import { NextResponse } from "next/server";
import { approveCloudPhoto } from "../../../lib/photos-supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const adminToken = process.env.PHOTO_ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ ok: false, error: "Missing PHOTO_ADMIN_TOKEN" }, { status: 500 });
  }

  const got = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (got !== adminToken) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id;

  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
  }

  await approveCloudPhoto({ id });
  return NextResponse.json({ ok: true });
}
