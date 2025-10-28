'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiBell, FiMapPin } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function MLHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cep, setCep] = useState('');

  return (
    <header className="w-full bg-ml-red shadow-sm sticky top-0 z-50">
      {/* Top Bar - Red Background */}
      <div className="bg-ml-red">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-xs">
            {/* Left side */}
            <div className="flex items-center space-x-4 text-white">
              <Link href="/vender" className="hover:opacity-80 transition">
                Vender
              </Link>
              <Link href="/ajuda" className="hover:opacity-80 transition">
                Contato
              </Link>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link href="/cadastro" className="text-white hover:opacity-80 transition">
                Crie a sua conta
              </Link>
              <Link href="/login" className="text-white hover:opacity-80 transition">
                Entre
              </Link>
              <Link href="/compras" className="text-white hover:opacity-80 transition">
                Compras
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - White Background */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-ml-red">Shopping</span>
                <span className="text-xs text-ml-black -mt-1">da Macumba</span>
              </div>
            </Link>

            {/* Search Bar - Large */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar produtos, marcas e muito mais..."
                  className="w-full h-10 pl-4 pr-12 rounded-sm border border-gray-300 focus:border-ml-red focus:ring-1 focus:ring-ml-red text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-0 top-0 h-10 px-4 bg-white hover:bg-gray-50 border-l border-gray-300">
                  <FiSearch className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden lg:flex items-center gap-2 text-ml-black hover:bg-gray-100"
              >
                <FiMapPin className="h-4 w-4" />
                <div className="text-left text-xs">
                  <div className="text-gray-500">Enviar para</div>
                  <div className="font-semibold">Informar CEP</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - White */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-2">
            {/* Left Navigation */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/categorias" className="text-ml-black hover:text-ml-red transition flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Categorias
              </Link>
              <Link href="/ofertas" className="text-ml-black hover:text-ml-red transition">
                Ofertas
              </Link>
              <Link href="/cupons" className="text-ml-black hover:text-ml-red transition">
                Cupons
              </Link>
              <Link href="/supermercado" className="text-ml-black hover:text-ml-red transition">
                Supermercado
              </Link>
              <Link href="/moda" className="text-ml-black hover:text-ml-red transition">
                Moda
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-ml-black hover:bg-gray-100 relative">
                <FiHeart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-ml-black hover:bg-gray-100 relative">
                <FiBell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-ml-red rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="text-ml-black hover:bg-gray-100 relative">
                <FiShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-ml-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

