import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-azu-cream min-h-screen">
      <section className="bg-azu-red">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase mb-4">Genuine</p>
          <h1 className="font-script text-6xl sm:text-7xl mb-4 drop-shadow-[3px_3px_0_rgba(78,51,32,0.9)]">
            Azu-Piel
          </h1>
          <p className="text-xs tracking-[0.4em] uppercase mb-6">Leather</p>
          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-4">
            Artículos de cuero hechos a mano con tradición familiar: carteras,
            cinturones, bolsos y chaquetas que duran toda la vida.
          </p>
          <p className="text-sm text-red-200 mb-8">Cotacachi – Ecuador</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/productos"
              className="bg-azu-leatherdark hover:bg-azu-leather px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Ver catálogo
            </Link>
            <Link
              href="/register"
              className="border-2 border-white hover:bg-white hover:text-azu-red px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}