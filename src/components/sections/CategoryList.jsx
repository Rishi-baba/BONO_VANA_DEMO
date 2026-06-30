import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'All Apparel', path: '/shop' },
  { name: 'Linen Dress', path: '/shop?collection=resort' },
  { name: 'Shirts & Tops', path: '/shop?type=shirts' },
  { name: 'Knitwear', path: '/shop?type=knitwear' },
  { name: 'Trousers', path: '/shop?type=trousers' },
  { name: 'Essentials', path: '/shop?collection=essentials' }
];

export const CategoryList = () => {
  return (
    <div id="home-collections" className="border-b border-charcoal/5 bg-warm-ivory py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-6 md:gap-12 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="font-sans text-[11px] uppercase tracking-widest text-charcoal/60 hover:text-charcoal transition-colors font-bold whitespace-nowrap focus:outline-none"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
