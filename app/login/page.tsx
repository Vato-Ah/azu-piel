//por fin borro la pestaña del login donde solo decía que no estaba disponible al fin
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Correo o contraseña incorrectos che.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="bg-azu-cream min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">
          Iniciar sesión
        </h1>
        <p className="text-stone-500 mb-6">Bienvenido de vuelta a Azu-Piel.</p>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-azu-red"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            className="px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-azu-red"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-azu-red hover:bg-azu-reddark disabled:opacity-50 text-white font-semibold rounded-md px-4 py-3 transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-stone-500">
          ¿Aún no tienes cuenta?{" "}
          <Link href="/register" className="text-azu-red hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}