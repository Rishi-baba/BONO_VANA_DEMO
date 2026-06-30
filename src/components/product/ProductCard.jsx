import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export const ProductCard = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePrice = product.compareAtPriceRange
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const isOnSale = comparePrice && comparePrice > price;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="group relative flex flex-col w-full text-left">
      {/* Product Image Wrapper */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] bg-natural-linen/50">
        <Link to={`/shop/${product.handle}`}>
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Favorite Icon Overlay (Always Visible on Mobile, Hover on Desktop) */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 bg-warm-ivory/80 hover:bg-warm-ivory p-2 rounded-full shadow-sm transition-all duration-300 backdrop-blur-sm z-10 focus:outline-none"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              favorited ? 'fill-forest-green text-forest-green' : 'text-charcoal/60 hover:text-forest-green'
            }`}
          />
        </button>

        {/* Sale Badge */}
        {isOnSale && (
          <span className="absolute bottom-4 left-4 bg-forest-green text-[9px] tracking-widest font-sans uppercase font-bold text-warm-ivory px-2 py-1 rounded-[4px]">
            Sale
          </span>
        )}
      </div>

      {/* Product Metadata */}
      <div className="mt-4 flex flex-col gap-1">
        <Link to={`/shop/${product.handle}`}>
          <h3 className="font-serif text-sm font-semibold text-charcoal hover:text-forest-green transition-colors leading-tight">
            {product.title}
          </h3>
        </Link>
        <p className="font-sans text-[11px] uppercase tracking-wider text-charcoal/50">
          {product.productType}
        </p>
        <div className="mt-1 flex items-baseline gap-2 font-sans text-xs">
          <span className="font-bold text-charcoal">₹{price.toFixed(2)}</span>
          {isOnSale && (
            <span className="text-charcoal/40 line-through">₹{comparePrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};
