import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sampleProducts } from "@/lib/data";

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = sampleProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-azu-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/productos" className="text-azu-red hover:underline text-sm">
          Volver al catálogo
        </Link>
        <div className="mt-6 grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-md overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-72 md:h-full bg-gradient-to-br from-azu-leather to-azu-leatherdark flex items-center justify-center">
              <span className="font-script text-4xl text-azu-cream">Azu-Piel</span>
            </div>
          )}
          <div className="p-8">
            <p className="text-xs uppercase tracking-wider text-azu-leather mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-stone-800 mb-4">
              {product.name}
            </h1>
            <p className="text-stone-600 mb-6">{product.description}</p>
            <p className="text-3xl font-bold text-azu-red mb-6">
              ${product.price}
            </p>
            <p className="text-sm text-stone-400">
              Hecho a mano en Cotacachi - Ecuador
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}