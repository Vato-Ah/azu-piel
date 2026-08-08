export type ProductCategory =
  | "carteras"
  | "mochilas"
  | "correas"
  | "billeteras";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
}