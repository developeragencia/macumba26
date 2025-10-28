import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shopping da Macumba - Seu Marketplace Espiritual',
  description: 'Compre e venda produtos espirituais, místicos e esotéricos. Milhares de produtos com frete grátis e melhor preço!',
  keywords: 'macumba, espiritual, místico, esotérico, marketplace, produtos religiosos, velas, incensos, cristais',
  authors: [{ name: 'Shopping da Macumba' }],
  openGraph: {
    title: 'Shopping da Macumba - Marketplace Espiritual',
    description: 'Compre produtos espirituais com frete grátis e melhor preço',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#FFFFFF',
                color: '#1A1A1A',
                border: '1px solid #E5E7EB',
              },
              success: {
                style: {
                  background: '#FFFFFF',
                  color: '#059669',
                  border: '1px solid #059669',
                },
              },
              error: {
                style: {
                  background: '#FFFFFF',
                  color: '#DC143C',
                  border: '1px solid #DC143C',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

