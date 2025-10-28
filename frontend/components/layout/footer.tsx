'use client';

import Link from 'next/link';
import { GiCandleFlame } from 'react-icons/gi';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gradient-mystical text-mystical-gold border-t border-mystical-gold/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GiCandleFlame className="h-6 w-6 candle-flicker" />
              <span className="text-lg font-bold">Shopping da Macumba</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              O maior marketplace de produtos espirituais, místicos e esotéricos do Brasil.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="h-5 w-5 cursor-pointer hover:text-mystical-gold-dark transition" />
              <FaInstagram className="h-5 w-5 cursor-pointer hover:text-mystical-gold-dark transition" />
              <FaTwitter className="h-5 w-5 cursor-pointer hover:text-mystical-gold-dark transition" />
              <FaYoutube className="h-5 w-5 cursor-pointer hover:text-mystical-gold-dark transition" />
              <FaWhatsapp className="h-5 w-5 cursor-pointer hover:text-mystical-gold-dark transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/sobre" className="hover:text-mystical-gold-dark transition">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-mystical-gold-dark transition">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/vendedor/cadastro" className="hover:text-mystical-gold-dark transition">
                  Seja um Vendedor
                </Link>
              </li>
              <li>
                <Link href="/ajuda" className="hover:text-mystical-gold-dark transition">
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/categorias/velas" className="hover:text-mystical-gold-dark transition">
                  Velas e Incensos
                </Link>
              </li>
              <li>
                <Link href="/categorias/estatuas" className="hover:text-mystical-gold-dark transition">
                  Estátuas e Imagens
                </Link>
              </li>
              <li>
                <Link href="/categorias/ervas" className="hover:text-mystical-gold-dark transition">
                  Ervas e Banhos
                </Link>
              </li>
              <li>
                <Link href="/categorias/livros" className="hover:text-mystical-gold-dark transition">
                  Livros Espirituais
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Informações</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/termos" className="hover:text-mystical-gold-dark transition">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-mystical-gold-dark transition">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/devolucoes" className="hover:text-mystical-gold-dark transition">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-mystical-gold-dark transition">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-mystical-gold/30 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© 2024 Shopping da Macumba. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido com 🕯️ por <span className="text-mystical-gold font-semibold">Alex Moura</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

