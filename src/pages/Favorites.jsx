import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left min-h-[60vh]">
      <SEO 
        title="Favorites" 
        description="View your saved items and create your perfect Boho Vana wardrobe."
      />
      {/* Header */}
      <div className="mb-12 space-y-2 border-b border-charcoal/5 pb-6">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
          Saved Items
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">
          Your Wishlist Wardrobe
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="py-20 text-center space-y-6">
          <p className="font-sans text-xs tracking-widest text-charcoal/40 uppercase">
            No items have been saved to your wishlist yet.
          </p>
          <div>
            <Link to="/shop">
              <Button variant="outline" size="md">
                Browse Apparel
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
