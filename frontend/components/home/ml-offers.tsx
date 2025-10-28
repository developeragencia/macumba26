'use client';

import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { MLProductCard } from '@/components/products/ml-product-card';

// Mock data - replace with real API call
const mockProducts = [
  {
    id: '1',
    name: 'Vela 7 Dias Vermelha - Amor e Paixão',
    slug: 'vela-7-dias-vermelha',
    price: 15.90,
    comparePrice: 29.90,
    images: ['/products/vela-vermelha.jpg'],
    rating: 4.8,
    totalReviews: 234,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Incenso Natural de Sândalo 100g',
    slug: 'incenso-sandalo',
    price: 24.90,
    comparePrice: 39.90,
    images: ['/products/incenso.jpg'],
    rating: 4.6,
    totalReviews: 156,
    isFeatured: false,
  },
  {
    id: '3',
    name: 'Cristal Ametista Natural Grande',
    slug: 'cristal-ametista',
    price: 89.90,
    comparePrice: 149.90,
    images: ['/products/ametista.jpg'],
    rating: 4.9,
    totalReviews: 89,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Kit Banho de Ervas - Proteção',
    slug: 'kit-banho-ervas',
    price: 34.90,
    comparePrice: 54.90,
    images: ['/products/ervas.jpg'],
    rating: 4.7,
    totalReviews: 312,
    isFeatured: false,
  },
  {
    id: '5',
    name: 'Estátua Ogum 30cm Resina',
    slug: 'estatua-ogum',
    price: 129.90,
    comparePrice: 199.90,
    images: ['/products/ogum.jpg'],
    rating: 4.9,
    totalReviews: 167,
    isFeatured: true,
  },
];

export function MLOffers() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-ml-black">
            Ofertas do dia
          </h2>
          <Link 
            href="/ofertas" 
            className="text-ml-red hover:text-ml-red-dark flex items-center gap-1 text-sm font-semibold"
          >
            Ver todas
            <FiChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockProducts.map((product) => (
            <MLProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

