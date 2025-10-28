'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GiCandleFlame, GiCrystalBall } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';

export function Hero() {
  return (
    <section className="relative bg-gradient-mystical py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 animate-pulse">
          <FaStar className="text-mystical-gold h-6 w-6" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse delay-100">
          <FaStar className="text-mystical-gold h-4 w-4" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-200">
          <FaStar className="text-mystical-gold h-5 w-5" />
        </div>
        <div className="absolute bottom-10 right-1/3 animate-pulse">
          <FaStar className="text-mystical-gold h-4 w-4" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <GiCrystalBall className="h-20 w-20 text-mystical-gold float-animation" />
              <div className="absolute -top-2 -right-2">
                <GiCandleFlame className="h-8 w-8 text-mystical-gold candle-flicker" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-mystical-gold">
            Bem-vindo ao <span className="gradient-text">Shopping da Macumba</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            O maior marketplace de produtos espirituais, místicos e esotéricos do Brasil. 
            Encontre tudo para sua jornada espiritual em um só lugar! ✨
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-mystical-gold/30">
              <div className="text-3xl font-bold text-mystical-gold mb-2">1000+</div>
              <div className="text-sm text-gray-200">Produtos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-mystical-gold/30">
              <div className="text-3xl font-bold text-mystical-gold mb-2">500+</div>
              <div className="text-sm text-gray-200">Vendedores</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-mystical-gold/30">
              <div className="text-3xl font-bold text-mystical-gold mb-2">50k+</div>
              <div className="text-sm text-gray-200">Clientes</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/produtos">
              <Button size="lg" className="mystical-glow text-lg px-8">
                Explorar Produtos 🔮
              </Button>
            </Link>
            <Link href="/vendedor/cadastro">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Venda Conosco 🕯️
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

