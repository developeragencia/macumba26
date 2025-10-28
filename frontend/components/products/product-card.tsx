'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success('Produto adicionado ao carrinho! 🛒');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? 'Removido da lista de desejos' : 'Adicionado à lista de desejos! ❤️'
    );
  };

  return (
    <Link href={`/produtos/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {product.comparePrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <FiHeart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-mystical-purple transition">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <FaStar className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-600">
              {product.rating.toFixed(1)} ({product.totalReviews})
            </span>
          </div>

          <div className="flex flex-col gap-1 mb-3">
            {product.comparePrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
            <span className="text-lg font-bold text-mystical-purple">
              {formatPrice(product.price)}
            </span>
          </div>

          <Button
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

