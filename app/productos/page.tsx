import ProductCard from "@/components/ProductCard";
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}