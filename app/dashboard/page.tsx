//ahoira lee el rol desde la bd
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Mi panel</h1>
      <p className="text-stone-500 mb-6">
        Sesión activa: <span className="font-semibold">{user.email}</span>
      </p>
      <div className="rounded-xl bg-white shadow-md p-6 inline-block">
        <p className="text-sm text-stone-500 mb-1">Tu rol en el sistema</p>
        <p className="text-2xl font-bold uppercase text-azu-red">
          {profile?.role ?? "cliente"}
        </p>
      </div>
      {error && (
        <p className="mt-6 text-sm text-red-600">
          Error de la consulta de perfil: {error.message}
        </p>
      )}
    </div>
  );
}