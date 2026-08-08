import ProductList from "@/components/ProductList";
import { sampleProducts } from "@/lib/data";

export const metadata = {
  title: "Catálogo | Azu-Piel",
};

export default function ProductosPage() {
  return (
    <main className="bg-azu-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-stone-800 mb-2">Catálogo</h1>
        <p className="text-stone-500 mb-8">
          Piezas artesanales de cuero hechas en Cotacachi - Ecuador.
        </p>
        <ProductList products={sampleProducts} />
      </div>
    </main>
  );
}