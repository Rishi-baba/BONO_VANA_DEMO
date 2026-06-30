import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/shopify';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/ui/SEO';

export const NotFound = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    getProducts().then(res => {
      // Suggest first 3 items
      setSuggestions(res.slice(0, 3));
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left space-y-16">
      <SEO 
        title="Page Not Found" 
        description="The page you are looking for does not exist."
      />
      {/* 404 Header */}
      <div className="text-center py-12 space-y-4">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
          Error 404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal">
          Page Not Found
        </h1>
        <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-md mx-auto leading-relaxed">
          The editorial spread you are looking for has been moved or archived. Let us guide you back to the wardrobe.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary">Return Home</Button>
          </Link>
        </div>
      </div>

      {/* Suggested Products */}
      {suggestions.length > 0 && (
        <div className="border-t border-charcoal/5 pt-12 space-y-8">
          <h2 className="font-serif text-2xl font-medium text-charcoal text-center sm:text-left">
            Explore Popular Pieces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestions.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
