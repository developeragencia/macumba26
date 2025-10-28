'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GiCandleFlame } from 'react-icons/gi';
import toast from 'react-hot-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Inscrição realizada com sucesso! 🎉');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-mystical">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <GiCandleFlame className="h-12 w-12 mx-auto mb-6 text-mystical-gold candle-flicker" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mystical-gold">
            Receba Ofertas Místicas 🌙
          </h2>
          
          <p className="text-gray-200 mb-8">
            Inscreva-se em nossa newsletter e receba ofertas exclusivas, novidades e conteúdos espirituais diretamente no seu email!
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-mystical-gold/30 text-white placeholder:text-gray-300"
            />
            <Button type="submit" size="lg" disabled={loading} className="mystical-glow">
              {loading ? 'Inscrevendo...' : 'Inscrever-se'}
            </Button>
          </form>

          <p className="text-sm text-gray-300 mt-4">
            * Não enviamos spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}

