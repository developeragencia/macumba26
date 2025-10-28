'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export function MLFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-sm text-ml-black mb-3">Sobre o Shopping</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/sobre" className="hover:text-ml-red transition">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/investor-relations" className="hover:text-ml-red transition">
                  Investor relations
                </Link>
              </li>
              <li>
                <Link href="/sustentabilidade" className="hover:text-ml-red transition">
                  Sustentabilidade
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-ml-red transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-sm text-ml-black mb-3">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/comprar" className="hover:text-ml-red transition">
                  Comprar
                </Link>
              </li>
              <li>
                <Link href="/vender" className="hover:text-ml-red transition">
                  Vender
                </Link>
              </li>
              <li>
                <Link href="/resolucao-problemas" className="hover:text-ml-red transition">
                  Resolução de problemas
                </Link>
              </li>
              <li>
                <Link href="/seguranca" className="hover:text-ml-red transition">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-sm text-ml-black mb-3">Minha conta</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/login" className="hover:text-ml-red transition">
                  Entre
                </Link>
              </li>
              <li>
                <Link href="/cadastro" className="hover:text-ml-red transition">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link href="/compras" className="hover:text-ml-red transition">
                  Minhas compras
                </Link>
              </li>
              <li>
                <Link href="/favoritos" className="hover:text-ml-red transition">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-sm text-ml-black mb-3">Redes sociais</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-ml-red transition">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-ml-red transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-ml-red transition">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-ml-red transition">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="font-semibold text-sm text-ml-black mb-3">
            Formas de pagamento
          </h3>
          <div className="flex flex-wrap gap-3">
            {['PIX', 'Visa', 'Mastercard', 'Elo', 'Boleto', 'PayPal'].map((method) => (
              <div
                key={method}
                className="px-3 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <div>
              <p className="mb-1">
                Copyright © 1999-2024 Shopping da Macumba LTDA.
              </p>
              <p>
                CNPJ n.º 00.000.000/0001-00 / Av. Example, nº 1000, São Paulo/SP - CEP 00000-000
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/termos" className="hover:text-ml-red transition">
                Termos e condições
              </Link>
              <Link href="/privacidade" className="hover:text-ml-red transition">
                Privacidade
              </Link>
              <Link href="/acessibilidade" className="hover:text-ml-red transition">
                Acessibilidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

