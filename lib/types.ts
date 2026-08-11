export type ProductCategory =
  | "carteras"
  | "mochilas"
  | "correas"
  | "billeteras";

// Refleja la forma de la tabla products en Supabase
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string | null;
  image: string | null;
  owner_id: string | null;
  created_at: string;
}