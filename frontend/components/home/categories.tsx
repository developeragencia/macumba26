'use client';

import Link from 'next/link';
import { GiCandleFlame, GiStarsStack, GiBookCover, GiCrystalBall, GiBottledBolt, GiClothes } from 'react-icons/gi';
import { Card } from '@/components/ui/card';

const categories = [
  {
    name: 'Velas e Incensos',
    icon: GiCandleFlame,
    slug: 'velas-incensos',
    color: 'bg-orange-500/20',
  },
  {
    name: 'Estátuas e Imagens',
    icon: GiStarsStack,
    slug: 'estatuas-imagens',
    color: 'bg-purple-500/20',
  },
  {
    name: 'Livros Espirituais',
    icon: GiBookCover,
    slug: 'livros',
    color: 'bg-blue-500/20',
  },
  {
    name: 'Cristais e Pedras',
    icon: GiCrystalBall,
    slug: 'cristais',
    color: 'bg-pink-500/20',
  },
  {
    name: 'Ervas e Banhos',
    icon: GiBottledBolt,
    slug: 'ervas-banhos',
    color: 'bg-green-500/20',
  },
  {
    name: 'Roupas e Acessórios',
    icon: GiClothes,
    slug: 'roupas',
    color: 'bg-yellow-500/20',
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mystical-purple">
            Categorias Populares ✨
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa variedade de produtos espirituais e místicos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categorias/${category.slug}`}>
              <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-mystical-purple/20">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center`}>
                  <category.icon className="h-8 w-8 text-mystical-purple" />
                </div>
                <h3 className="text-center text-sm font-semibold text-gray-800">
                  {category.name}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

