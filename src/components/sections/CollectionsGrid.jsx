import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    title: 'Apparel',
    description: 'Effortless slow living linen garments',
    image: '/images/hero_resort_wear.jpg',
    link: '/shop?collection=apparel'
  },
  {
    title: 'Resort Wear',
    description: 'Coastal holiday essentials and silhouettes',
    image: '/images/amara_linen_dress.jpg',
    link: '/shop?collection=resort'
  },
  {
    title: 'Essentials',
    description: 'Timeless handcrafted cotton and knit pieces',
    image: '/images/linen_textures.jpg',
    link: '/shop?collection=essentials'
  }
];

export const CollectionsGrid = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-charcoal/5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div className="text-left space-y-2">
          <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green block">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl font-medium text-charcoal">
            The Collections
          </h2>
        </div>
        <Link
          to="/shop"
          className="font-sans text-xs tracking-widest uppercase text-charcoal hover:text-deep-olive transition-colors font-bold flex items-center gap-1.5 focus:outline-none"
        >
          Shop All Collections <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLLECTIONS.map((col, idx) => (
          <Link
            key={idx}
            to={col.link}
            className="group relative block aspect-[4/5] overflow-hidden rounded-[8px] bg-natural-linen/30"
          >
            {/* Image */}
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              loading="lazy"
            />
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent transition-opacity duration-300" />
            
            {/* Content Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left flex flex-col justify-end">
              <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-warm-beige block mb-1">
                Explore
              </span>
              <h3 className="font-serif text-xl font-medium text-warm-ivory leading-tight">
                {col.title}
              </h3>
              <p className="font-sans text-[11px] text-warm-ivory/60 mt-1 leading-normal max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {col.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
