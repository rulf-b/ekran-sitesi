"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import brands from '../../data/brands.json';

export default function BrandsPage() {
  const [brands, setBrands] = useState<{name: string; models: string[]}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/brands')
      .then(res => res.json())
      .then(data => {
        setBrands(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Markalar yükleniyor...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-4">TV Markaları</h1>
      <p className="text-center mb-8 text-lg text-gray-600">
        Tüm büyük TV markaları için uzman onarım ve ekran değişimi hizmeti. Markanızı seçerek detaylı bilgi ve hizmetlerimize ulaşabilirsiniz.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link key={brand.name} href={`/brands/${brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex flex-col items-center bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <Image src={brand.logo} alt={brand.name} width={80} height={80} />
            </div>
            <span className="text-lg font-semibold text-center">{brand.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 