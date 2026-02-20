'use client';

import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryCardProps {
  category: Category;
}

const categoryIcons: Record<string, string> = {
  electronics: '📱',
  fashion: '👔',
  home: '🏠',
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const icon = categoryIcons[category.slug.toLowerCase()] || '📦';

  return (
    <Link href={`/category/${category.slug}`}>
      <div className="bg-white rounded-xl shadow-soft p-6 text-center hover-lift border border-gray-100 group cursor-pointer">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl mx-auto mb-4 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <span className="text-4xl">{icon}</span>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg group-hover:text-primary-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">
          Shop now →
        </p>
      </div>
    </Link>
  );
}
