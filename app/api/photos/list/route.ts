import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";
import { DEFAULT_PHOTO_BUCKET } from "../../../lib/photos-supabase";

export const runtime = "nodejs";

export async function GET() {
  // Admin helper endpoint: lists recent approved photos + image URLs.
  // (We intentionally keep it unauthenticated for now because it only reveals public image URLs.)
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("cloud_photos")
    .select("id,created_at,title,caption,status,storage_path,featured_scope")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(80);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const bucket = process.env.SUPABASE_PHOTO_BUCKET ?? DEFAULT_PHOTO_BUCKET;

  const photos = (data ?? []).map((row) => {
    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(row.storage_path);
    return {
      ...row,
      image_url: pub.publicUrl
    };
  });

  return NextResponse.json({ ok: true, photos });
}
