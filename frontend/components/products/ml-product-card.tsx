'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface MLProductCardProps {
  product: any;
}

export function MLProductCard({ product }: MLProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  return (
    <Link href={`/produtos/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200 h-full bg-white border border-gray-200 rounded-lg ml-hover">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-white p-4">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-contain"
          />
          
          {/* Discount Badge - Green like ML */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
          >
            <FiHeart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-ml-red text-ml-red' : 'text-gray-600'}`} 
            />
          </button>

          {/* FULL Badge (if applicable) */}
          {product.isFeatured && (
            <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              FULL
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Price Section */}
          <div className="mb-2">
            {product.comparePrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">
                  {discount}% OFF
                </span>
              </div>
            )}
            <div className="text-2xl font-normal text-ml-black">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Free Shipping */}
          {product.price >= 79 && (
            <div className="mb-2">
              <span className="text-sm text-green-600 font-semibold">
                Frete grátis
              </span>
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-sm text-ml-black line-clamp-2 mb-2 group-hover:text-ml-red transition">
            {product.name}
          </h3>

          {/* Rating */}
          {product.totalReviews > 0 && (
            <div className="flex items-center gap-1 mb-1">
              <FaStar className="h-3 w-3 text-gray-400 fill-gray-400" />
              <span className="text-xs text-gray-600">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-400">
                ({product.totalReviews})
              </span>
            </div>
          )}

          {/* Installments */}
          <div className="text-xs text-gray-600">
            em <span className="text-green-600 font-semibold">12x {formatPrice(product.price / 12)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

