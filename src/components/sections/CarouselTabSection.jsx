import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { getProducts } from '../../services/shopify';

export const CarouselTabSection = () => {
  const [activeTab, setActiveTab] = useState('sale');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  const tabs = [
    { id: 'sale', label: 'Sale' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'new-arrivals', label: 'New Arrivals' }
  ];

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'best-sellers':
        return products.filter(p => p.tags.includes('Best Sellers'));
      case 'new-arrivals':
        return products.filter(p => p.tags.includes('New Arrivals'));
      case 'sale':
        return products.filter(p => p.tags.includes('Sale') || p.compareAtPriceRange);
      default:
        return products;
    }
  };

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 340;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filtered = getFilteredProducts();

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-charcoal/5 pb-4 mb-10 gap-4">
        <div className="flex gap-6 md:gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
              className={`font-sans text-xs md:text-sm tracking-widest uppercase font-bold pb-2 transition-colors relative focus:outline-none ${
                activeTab === tab.id ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-charcoal" />
              )}
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="p-2 border border-charcoal/10 rounded-full hover:border-charcoal hover:bg-charcoal/5 transition-colors focus:outline-none"
          >
            <ChevronLeft className="h-4 w-4 text-charcoal" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-2 border border-charcoal/10 rounded-full hover:border-charcoal hover:bg-charcoal/5 transition-colors focus:outline-none"
          >
            <ChevronRight className="h-4 w-4 text-charcoal" />
          </button>
        </div>
      </div>

      {/* Products Slider */}
      {loading ? (
        <div className="h-96 flex items-center justify-center font-sans text-xs tracking-widest uppercase text-charcoal/40">
          Loading collection...
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
