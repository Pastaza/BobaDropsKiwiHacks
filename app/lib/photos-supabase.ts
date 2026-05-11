import { supabaseServer } from "./supabase-server";

export type SupabaseCloudPhoto = {
  id: string;
  created_at: string;
  title: string;
  caption: string | null;
  status: "pending" | "approved" | "rejected";
  storage_path: string;
  image_url: string;
};

export const DEFAULT_PHOTO_BUCKET = "cloud-photos";

export async function listApprovedCloudPhotos() {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("cloud_photos")
    .select("id,created_at,title,caption,status,storage_path")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(60);

  if (error) return [];

  const bucket = process.env.SUPABASE_PHOTO_BUCKET ?? DEFAULT_PHOTO_BUCKET;

  return (data ?? []).map((row) => {
    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(row.storage_path);
    return {
      ...row,
      image_url: pub.publicUrl
    } as SupabaseCloudPhoto;
  });
}

export async function createPendingCloudPhoto(params: {
  title: string;
  caption?: string;
  storagePath: string;
  status?: "pending" | "approved" | "rejected";
}) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("cloud_photos")
    .insert({
      title: params.title,
      caption: params.caption ?? null,
      storage_path: params.storagePath,
      status: params.status ?? "pending"
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function approveCloudPhoto(params: { id: string }) {
  const supabase = supabaseServer();

  const { error } = await supabase.from("cloud_photos").update({ status: "approved" }).eq("id", params.id);
  if (error) throw new Error(error.message);
}
