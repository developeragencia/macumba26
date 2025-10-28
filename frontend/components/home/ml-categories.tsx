'use client';

import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { 
  GiCandleFlame, 
  GiStarsStack, 
  GiBookCover, 
  GiCrystalBall, 
  GiBottledBolt, 
  GiClothes,
  GiCrown,
  GiHealing
} from 'react-icons/gi';

const categories = [
  { name: 'Velas e Incensos', icon: GiCandleFlame, slug: 'velas-incensos', color: 'text-orange-600' },
  { name: 'Estátuas e Imagens', icon: GiStarsStack, slug: 'estatuas', color: 'text-purple-600' },
  { name: 'Livros Espirituais', icon: GiBookCover, slug: 'livros', color: 'text-blue-600' },
  { name: 'Cristais e Pedras', icon: GiCrystalBall, slug: 'cristais', color: 'text-pink-600' },
  { name: 'Ervas e Banhos', icon: GiBottledBolt, slug: 'ervas', color: 'text-green-600' },
  { name: 'Roupas Ritualísticas', icon: GiClothes, slug: 'roupas', color: 'text-indigo-600' },
  { name: 'Joias Místicas', icon: GiCrown, slug: 'joias', color: 'text-yellow-600' },
  { name: 'Serviços Espirituais', icon: GiHealing, slug: 'servicos', color: 'text-red-600' },
];

export function MLCategories() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-ml-black">
            Categorias
          </h2>
          <Link 
            href="/categorias" 
            className="text-ml-red hover:text-ml-red-dark flex items-center gap-1 text-sm font-semibold"
          >
            Ver todas
            <FiChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categorias/${category.slug}`}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all text-center">
                <div className="mb-3 flex justify-center">
                  <category.icon className={`h-12 w-12 ${category.color}`} />
                </div>
                <h3 className="text-sm text-ml-black group-hover:text-ml-red transition line-clamp-2">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

