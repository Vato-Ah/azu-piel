"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ActionState = { error: string | null };

type SupabaseServer = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Debes iniciar sesión para hacer esto.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("Solo el administrador puede gestionar productos.");
  }

  return { supabase, user };
}

async function uploadImage(supabase: SupabaseServer, file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("productos")
    .upload(path, file, { contentType: file.type });

  if (error) {
    return { error: `Error al subir la imagen: ${error.message}` };
  }

  const { data } = supabase.storage.from("productos").getPublicUrl(path);
  return data.publicUrl;
}

export async function createProduct(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const { supabase, user } = await requireAdmin();

    const file = formData.get("image") as File | null;

    if (!file || file.size === 0) {
      return { error: "Debes subir una imagen del producto." };
    }

    const uploaded = await uploadImage(supabase, file);
    if (typeof uploaded !== "string") {
      return uploaded;
    }

    const { error } = await supabase.from("products").insert({
      name: String(formData.get("name")),
      category: String(formData.get("category")),
      price: Number(formData.get("price")),
      description: String(formData.get("description")),
      image: uploaded,
      owner_id: user.id,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/productos");
    revalidatePath("/dashboard");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error inesperado" };
  }

  redirect("/dashboard");
}

export async function updateProduct(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const { supabase } = await requireAdmin();

    const file = formData.get("image") as File | null;
    let imageUrl: string | null = null;

    if (file && file.size > 0) {
      const uploaded = await uploadImage(supabase, file);
      if (typeof uploaded !== "string") {
        return uploaded;
      }
      imageUrl = uploaded;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: String(formData.get("name")),
        category: String(formData.get("category")),
        price: Number(formData.get("price")),
        description: String(formData.get("description")),
        ...(imageUrl ? { image: imageUrl } : {}),
      })
      .eq("id", String(formData.get("id")));

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/productos");
    revalidatePath("/dashboard");
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error inesperado" };
  }

  redirect("/dashboard");
}

export async function deleteProduct(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const { supabase } = await requireAdmin();

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", String(formData.get("id")));

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/productos");
    revalidatePath("/dashboard");
    return { error: null };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error inesperado" };
  }
}