"use client";

import { useFormState } from "react-dom";
import Image from "next/image";
import { Product, ProductCategory } from "@/lib/types";

type FormAction = (
  prevState: { error: string | null },
  formData: FormData
) => Promise<{ error: string | null }>;

interface ProductFormProps {
  action: FormAction;
  submitLabel: string;
  initial?: Product;
  imageRequired?: boolean;
}

const categories: ProductCategory[] = [
  "carteras",
  "mochilas",
  "correas",
  "billeteras",
];

export default function ProductForm({
  action,
  submitLabel,
  initial,
  imageRequired = false,
}: ProductFormProps) {
  const [state, formAction] = useFormState(action, { error: null });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      {state.error && (
        <p className="rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {state.error}
        </p>
      )}

      <input
        name="name"
        required
        defaultValue={initial?.name ?? ""}
        placeholder="Nombre del producto"
        className="px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-azu-red"
      />
      <select
        name="category"
        defaultValue={initial?.category ?? "carteras"}
        className="px-4 py-3 rounded-md border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-azu-red"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input
        name="price"
        type="number"
        min="1"
        step="0.01"
        required
        defaultValue={initial?.price ?? ""}
        placeholder="Precio en dólares"
        className="px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-azu-red"
      />
      <textarea
        name="description"
        rows={4}
        defaultValue={initial?.description ?? ""}
        placeholder="Descripción"
        className="px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-azu-red"
      />

      <div className="flex flex-col gap-2">
        <span className="text-sm text-stone-600">
          {imageRequired
            ? "Imagen del producto"
            : "Nueva imagen (opcional; si no subes, se mantiene la actual)"}
        </span>
        {initial?.image && (
          <Image
            src={initial.image}
            alt={initial.name}
            width={96}
            height={96}
            className="h-24 w-24 rounded-md object-cover border border-stone-200"
          />
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          required={imageRequired}
          className="text-sm text-stone-600 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-azu-red file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-azu-reddark"
        />
      </div>

      <button
        type="submit"
        className="bg-azu-red hover:bg-azu-reddark text-white font-semibold rounded-md px-4 py-3 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}