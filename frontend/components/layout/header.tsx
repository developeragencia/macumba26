'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiBell, FiMenu } from 'react-icons/fi';
import { GiCandleFlame } from 'react-icons/gi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-mystical backdrop-blur supports-[backdrop-filter]:bg-gradient-mystical/95">
      {/* Top Bar */}
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GiCandleFlame className="h-8 w-8 text-mystical-gold candle-flicker" />
            <span className="gradient-text text-2xl font-bold hidden md:block">
              Shopping da Macumba
            </span>
            <span className="gradient-text text-xl font-bold md:hidden">SDM</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar produtos, categorias..."
                className="pl-10 bg-white/10 border-mystical-gold/30 text-white placeholder:text-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-mystical-gold hover:bg-white/10">
              <FiHeart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-mystical-gold hover:bg-white/10">
              <FiBell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-mystical-gold hover:bg-white/10">
              <FiShoppingCart className="h-5 w-5" />
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <FiUser className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden text-mystical-gold">
              <FiMenu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="pl-10 bg-white/10 border-mystical-gold/30 text-white placeholder:text-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 pb-3 text-sm">
          <Link href="/categorias" className="text-mystical-gold hover:text-mystical-gold-dark transition">
            Categorias
          </Link>
          <Link href="/vendedores" className="text-mystical-gold hover:text-mystical-gold-dark transition">
            Vendedores
          </Link>
          <Link href="/blog" className="text-mystical-gold hover:text-mystical-gold-dark transition">
            Blog Espiritual
          </Link>
          <Link href="/sobre" className="text-mystical-gold hover:text-mystical-gold-dark transition">
            Sobre
          </Link>
          <Link href="/contato" className="text-mystical-gold hover:text-mystical-gold-dark transition">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}

