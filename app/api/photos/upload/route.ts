import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";
import { createPendingCloudPhoto, DEFAULT_PHOTO_BUCKET } from "../../../lib/photos-supabase";

export const runtime = "nodejs";

function safeSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const title = String(form.get("title") ?? "Cloud photo").trim() || "Cloud photo";
    const caption = String(form.get("caption") ?? "").trim();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, error: "File must be an image" }, { status: 400 });
    }

    // 8MB cap (tweak as desired)
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: "Image too large (max 8MB)" }, { status: 400 });
    }

    const supabase = supabaseServer();
    const bucket = process.env.SUPABASE_PHOTO_BUCKET ?? DEFAULT_PHOTO_BUCKET;

    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 8);
    const key = `${Date.now()}-${safeSlug(title) || "cloud"}.${ext}`;

    const bytes = Buffer.from(await file.arrayBuffer());

    const upload = await supabase.storage.from(bucket).upload(key, bytes, {
      contentType: file.type,
      upsert: false
    });

    if (upload.error) {
      return NextResponse.json({ ok: false, error: upload.error.message }, { status: 500 });
    }

    // Default: open community feed (auto-approve). Set PHOTO_AUTO_APPROVE=false to require manual approval.
    const autoApprove = process.env.PHOTO_AUTO_APPROVE !== "false";
    const status = autoApprove ? "approved" : "pending";

    const row = await createPendingCloudPhoto({
      title,
      caption: caption || undefined,
      storagePath: key,
      status
    });

    return NextResponse.json({ ok: true, id: row.id, status });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
