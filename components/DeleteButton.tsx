"use client";

import { useFormState } from "react-dom";
import { deleteProduct } from "@/app/dashboard/actions";

interface DeleteButtonProps {
  productId: string;
}

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const [state, formAction] = useFormState(deleteProduct, { error: null });

  return (
    <form action={formAction} className="inline-block">
      <input type="hidden" name="id" value={productId} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800 text-sm font-semibold"
      >
        Eliminar
      </button>
      {state.error && (
        <p className="text-xs text-red-600 mt-1">{state.error}</p>
      )}
    </form>
  );
}