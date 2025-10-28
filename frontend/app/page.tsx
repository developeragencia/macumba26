import { MLHeader } from '@/components/layout/ml-header';
import { MLFooter } from '@/components/layout/ml-footer';
import { MLHero } from '@/components/home/ml-hero';
import { MLCategories } from '@/components/home/ml-categories';
import { MLOffers } from '@/components/home/ml-offers';
import { MLBenefits } from '@/components/home/ml-benefits';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MLHeader />
      <main>
        <MLHero />
        <MLCategories />
        <MLOffers />
        <MLBenefits />
        
        {/* More Sections (like ML) */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-ml-black mb-6">
              Mais vendidos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Products will be loaded here */}
              <div className="text-center text-gray-500 col-span-full py-8">
                Carregando produtos...
              </div>
            </div>
          </div>
        </section>
      </main>
      <MLFooter />
    </div>
  );
}

