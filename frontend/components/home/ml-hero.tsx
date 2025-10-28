'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const banners = [
  {
    id: 1,
    title: 'Black Friday 2024',
    subtitle: 'R$100 milhões em cupons',
    image: '/banners/black-friday.jpg',
    link: '/ofertas/black-friday',
    bgColor: 'bg-black',
  },
  {
    id: 2,
    title: 'Produtos Espirituais',
    subtitle: 'Até 50% OFF em itens selecionados',
    image: '/banners/spiritual.jpg',
    link: '/categorias/espirituais',
    bgColor: 'bg-ml-red',
  },
  {
    id: 3,
    title: 'Frete Grátis',
    subtitle: 'Em compras acima de R$ 79',
    image: '/banners/frete-gratis.jpg',
    link: '/frete-gratis',
    bgColor: 'bg-green-600',
  },
];

export function MLHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <section className="relative w-full bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[21/9] md:aspect-[21/7]">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className={`min-w-full h-full ${banner.bgColor} flex items-center justify-center relative`}
              >
                <div className="text-center text-white p-8 z-10">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {banner.title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-6">
                    {banner.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-ml-black hover:bg-gray-100 font-semibold"
                  >
                    Ver Ofertas
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition"
          >
            <FiChevronLeft className="h-6 w-6 text-ml-black" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition"
          >
            <FiChevronRight className="h-6 w-6 text-ml-black" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition ${
                  currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

