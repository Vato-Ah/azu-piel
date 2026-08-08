// aqui se crean las categorias y la interfaz de los productos
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