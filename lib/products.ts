import { supabase } from "./supabase";
import { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error al cargar productos:", error.message);
    return [];
  }

  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error al cargar el producto:", error.message);
    return null;
  }

  return data as Product | null;
}