//ahoira lee el rol desde la bd y tiene boton que usa el admin para agregar productos
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/DeleteButton";
import { Product } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "cliente";

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Mi panel</h1>
      <p className="text-stone-500 mb-6">
        Sesión activa: <span className="font-semibold">{user.email}</span>
      </p>
      <div className="rounded-xl bg-white shadow-md p-6 inline-block">
        <p className="text-sm text-stone-500 mb-1">Tu rol en el sistema</p>
        <p className="text-2xl font-bold uppercase text-azu-red">{role}</p>
      </div>

      {role === "admin" && (
        <>
          <div className="mt-8 mb-4">
            <Link
              href="/dashboard/nuevo"
              className="bg-azu-red hover:bg-azu-reddark text-white font-semibold px-6 py-3 rounded-md inline-block transition-colors"
            >
              Nuevo producto
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-100 text-stone-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {((products ?? []) as Product[]).map((p) => (
                  <tr key={p.id} className="border-t border-stone-100">
                    <td className="px-4 py-3 font-semibold text-stone-800">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-stone-500">{p.category}</td>
                    <td className="px-4 py-3 text-azu-red font-bold">
                      ${p.price}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-4">
                        <Link
                          href={`/dashboard/editar/${p.id}`}
                          className="text-azu-leather hover:underline font-semibold"
                        >
                          Editar
                        </Link>
                        <DeleteButton productId={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {error && (
        <p className="mt-6 text-sm text-red-600">Error: {error.message}</p>
      )}
    </div>
  );
}