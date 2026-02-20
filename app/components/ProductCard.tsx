'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  sale_price?: number | null;
  rating_avg?: number;
  sold_count?: number;
  images?: Array<{ image_url: string }>;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.image_url || 'https://via.placeholder.com/300x300';
  const displayPrice = product.sale_price || product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-xl shadow-soft overflow-hidden hover-lift border border-gray-100 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -{discountPercent}%
            </div>
          )}
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-white font-semibold bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full">
              Quick View
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors text-lg leading-tight">
            {product.title}
          </h3>
          
          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            {product.rating_avg && (
              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating_avg!)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {product.rating_avg.toFixed(1)}
                </span>
              </div>
            )}
            {product.sold_count && (
              <span className="text-sm text-gray-500">
                ({product.sold_count.toLocaleString()} sold)
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold text-primary-600">
              ${displayPrice.toLocaleString()}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-4 w-full py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
