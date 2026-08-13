"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="bg-azu-cream min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-stone-800 mb-2">Crear cuenta</h1>
        <p className="text-stone-500 mb-6">Únete a la familia Azu-Piel.</p>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña (mínimo 6 caracteres)"
            className="px-4 py-3 rounded-md border border-stone-300 focus:outline-none focus:ring-2 focus:ring-azu-red"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-azu-red hover:bg-azu-reddark disabled:opacity-50 text-white font-semibold rounded-md px-4 py-3 transition-colors"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-sm text-stone-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-azu-red hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}