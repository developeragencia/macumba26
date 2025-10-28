'use client';

import { FiTruck, FiShield, FiCreditCard, FiArrowLeft } from 'react-icons/fi';
import { Card } from '@/components/ui/card';

const benefits = [
  {
    icon: FiTruck,
    title: 'Frete grátis a partir de R$ 79',
    description: 'Em milhares de produtos selecionados',
  },
  {
    icon: FiShield,
    title: 'Compra garantida',
    description: 'Receba o produto ou devolvemos seu dinheiro',
  },
  {
    icon: FiCreditCard,
    title: 'Parcele em até 12x',
    description: 'Sem juros no cartão de crédito',
  },
  {
    icon: FiArrowLeft,
    title: 'Devolução grátis',
    description: 'Você tem 30 dias para devolver',
  },
];

export function MLBenefits() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-4 bg-white border border-gray-200 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <benefit.icon className="h-8 w-8 text-ml-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-ml-black mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

