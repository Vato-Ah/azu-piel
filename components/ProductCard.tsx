import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/productos/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={450}
          className="h-52 w-full object-cover"
        />
      ) : (
        <div className="h-52 w-full bg-gradient-to-br from-azu-leather to-azu-leatherdark flex items-center justify-center">
          <span className="text-azu-cream uppercase tracking-widest text-sm">
            {product.category}
          </span>
        </div>
      )}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-azu-leather mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-stone-800 group-hover:text-azu-red transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-azu-red">${product.price}</p>
      </div>
    </Link>
  );
}