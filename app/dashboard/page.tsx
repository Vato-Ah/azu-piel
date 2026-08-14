//ahoira lee el rol desde la bd y tiene boton que usa el admin para agregar productos
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
        <div className="mt-8">
          <Link
            href="/dashboard/nuevo"
            className="bg-azu-red hover:bg-azu-reddark text-white font-semibold px-6 py-3 rounded-md inline-block transition-colors"
          >
            Nuevo producto
          </Link>
        </div>
      )}

      {error && (
        <p className="mt-6 text-sm text-red-600">Error: {error.message}</p>
      )}
    </div>
  );
}