import { redirect } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "../actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function NuevoProductoPage() {
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

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-stone-800 mb-6">
        Nuevo producto
      </h1>
<ProductForm action={createProduct} submitLabel="Crear producto" imageRequired />
    </div>
  );
}