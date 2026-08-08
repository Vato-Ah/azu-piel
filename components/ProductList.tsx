"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product, ProductCategory } from "@/lib/types";
//Aqui se crea la opción de buscar por categorías o nombre
interface ProductListProps {
  products: Product[];
}

const categories: ("todas" | ProductCategory)[] = [
  "todas",
  "carteras",
  "mochilas",
  "correas",
  "billeteras",
];

export default function ProductList({ products }: ProductListProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"todas" | ProductCategory>("todas");

  const filtered = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      category === "todas" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="flex-1 px-4 py-3 rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-azu-red"
        />
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "todas" | ProductCategory)
          }
          className="px-4 py-3 rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-azu-red"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "todas" ? "Todas las categorías" : c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone-500 text-center py-16">
          No se encontraron productos para tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}