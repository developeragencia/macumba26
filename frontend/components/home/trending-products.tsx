'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { recommendationsAPI } from '@/lib/api';

export function TrendingProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const response = await recommendationsAPI.getTrending(10);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching trending products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mystical-purple">
            Em Alta Agora 🔥
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Produtos que estão fazendo sucesso nesta semana
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

