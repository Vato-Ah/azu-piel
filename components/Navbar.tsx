//ahora reconoce la sesion
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    supabase.auth.getSession().then(
      ({ data }: { data: { session: Session | null } }) => {
        setLoggedIn(!!data.session);
      }
    );

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setLoggedIn(!!session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-azu-leatherdark text-azu-cream sticky top-0 z-50 shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo Azu-Piel"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="font-script text-2xl">
            Azu-<span className="text-red-400">Piel</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <Link href="/" className="hover:text-red-400 transition-colors">
            Inicio
          </Link>
          <Link
            href="/productos"
            className="hover:text-red-400 transition-colors"
          >
            Catálogo
          </Link>
          {loggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-red-400 transition-colors"
              >
                Mi panel
              </Link>
              <button
                onClick={handleLogout}
                className="bg-azu-red hover:bg-azu-reddark px-4 py-2 rounded-md font-semibold transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-red-400 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="bg-azu-red hover:bg-azu-reddark px-4 py-2 rounded-md font-semibold transition-colors"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}