import { redirect, notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { updateProduct } from "../../actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Product } from "@/lib/types";

interface Props {
  params: { id: string };
}

export default async function EditarProductoPage({ params }: Props) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-stone-800 mb-6">
        Editar producto
      </h1>
      <ProductForm
        action={updateProduct}
        submitLabel="Guardar cambios"
        initial={product as Product}
      />
    </div>
  );
}