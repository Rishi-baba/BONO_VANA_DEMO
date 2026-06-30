import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/shopify';
import { ProductCard } from '../components/product/ProductCard';
import { SEO } from '../components/ui/SEO';
import { ChevronDown, SlidersHorizontal, Search } from 'lucide-react';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const collectionParam = searchParams.get('collection');
  const typeParam = searchParams.get('type');
  const searchParam = searchParams.get('search');

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      searchParams.set('search', trimmed);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  // Filter Categories
  const collections = ['all', 'apparel', 'resort', 'essentials'];
  const types = ['all', 'dresses', 'shirts', 'trousers', 'knitwear', 'skirts'];
  const colors = ['Natural Linen', 'Sage', 'Deep Olive', 'Warm Ivory', 'Charcoal', 'Warm Beige'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const toggleFilter = (list, setList, item) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleCollectionChange = (col) => {
    if (col === 'all') {
      searchParams.delete('collection');
    } else {
      searchParams.set('collection', col);
    }
    setSearchParams(searchParams);
  };

  const handleTypeChange = (t) => {
    if (t === 'all') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', t);
    }
    setSearchParams(searchParams);
  };

  // Filtered & Sorted List
  const filteredProducts = products.filter(p => {
    // Collection Filter
    if (collectionParam) {
      if (collectionParam === 'resort' && !p.tags.includes('Resort')) return false;
      if (collectionParam === 'essentials' && !p.tags.includes('Essentials')) return false;
    }
    // Type Filter
    if (typeParam && p.productType.toLowerCase() !== typeParam.toLowerCase()) return false;
    // Color Filter
    if (selectedColors.length > 0) {
      const pColors = p.options.find(o => o.name === 'Color')?.values || [];
      if (!pColors.some(c => selectedColors.includes(c))) return false;
    }
    // Size Filter
    if (selectedSizes.length > 0) {
      const pSizes = p.options.find(o => o.name === 'Size')?.values || [];
      if (!pSizes.some(s => selectedSizes.includes(s))) return false;
    }
    // Search query
    if (searchParam) {
      const query = searchParam.toLowerCase();
      const inTitle = p.title.toLowerCase().includes(query);
      const inDesc = p.description.toLowerCase().includes(query);
      if (!inTitle && !inDesc) return false;
    }
    return true;
  }).sort((a, b) => {
    const aPrice = parseFloat(a.priceRange.minVariantPrice.amount);
    const bPrice = parseFloat(b.priceRange.minVariantPrice.amount);
    if (sortBy === 'price-asc') return aPrice - bPrice;
    if (sortBy === 'price-desc') return bPrice - aPrice;
    if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
    return 0; // relevance
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 min-h-screen">
      <SEO 
        title={collectionParam ? `Shop ${collectionParam}` : "Shop All"} 
        description="Browse the full collection of Boho Vana premium sustainable fashion."
      />
      
      {/* Search Header */}
      <div className="text-left mb-12 space-y-2">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
          Explore Items
        </span>
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-charcoal">
          {collectionParam ? `${collectionParam.toUpperCase()} Collection` : 'All Apparel'}
        </h1>
        {searchParam && (
          <p className="font-sans text-xs text-charcoal/50 uppercase tracking-widest">
            Search results for "{searchParam}" ({filteredProducts.length} items)
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-8 pr-6 text-left">
          {/* Collection Selection */}
          <div className="space-y-3">
            <h3 className="font-sans text-[11px] tracking-widest uppercase font-bold text-charcoal/40">Collections</h3>
            <div className="flex flex-col gap-2 font-sans text-xs">
              {collections.map(c => (
                <button
                  key={c}
                  onClick={() => handleCollectionChange(c)}
                  className={`w-fit text-left uppercase tracking-wider py-1 border-b transition-colors ${
                    (c === 'all' && !collectionParam) || collectionParam === c
                      ? 'border-charcoal text-charcoal font-bold'
                      : 'border-transparent text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Types Selection */}
          <div className="space-y-3 pt-6 border-t border-charcoal/5">
            <h3 className="font-sans text-[11px] tracking-widest uppercase font-bold text-charcoal/40">Apparel Type</h3>
            <div className="flex flex-col gap-2 font-sans text-xs">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => handleTypeChange(t)}
                  className={`w-fit text-left uppercase tracking-wider py-1 border-b transition-colors ${
                    (t === 'all' && !typeParam) || typeParam === t
                      ? 'border-charcoal text-charcoal font-bold'
                      : 'border-transparent text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3 pt-6 border-t border-charcoal/5">
            <h3 className="font-sans text-[11px] tracking-widest uppercase font-bold text-charcoal/40">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map(col => (
                <button
                  key={col}
                  onClick={() => toggleFilter(selectedColors, setSelectedColors, col)}
                  className={`font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-[4px] border transition-all ${
                    selectedColors.includes(col)
                      ? 'bg-forest-green text-warm-ivory border-forest-green font-bold'
                      : 'bg-transparent text-charcoal/70 border-charcoal/10 hover:border-forest-green'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3 pt-6 border-t border-charcoal/5">
            <h3 className="font-sans text-[11px] tracking-widest uppercase font-bold text-charcoal/40">Sizes</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => toggleFilter(selectedSizes, setSelectedSizes, sz)}
                  className={`font-sans text-[10px] px-3 py-1.5 rounded-[4px] border font-bold transition-all ${
                    selectedSizes.includes(sz)
                      ? 'bg-forest-green text-warm-ivory border-forest-green'
                      : 'bg-transparent text-charcoal/70 border-charcoal/10 hover:border-forest-green'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Search & Filters Trigger (Mobile Only) */}
        <div className="lg:hidden flex flex-col gap-4 border-b border-charcoal/10 pb-4 mb-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center border border-charcoal/30 rounded-[4px] px-3 py-2.5 w-full bg-white/50">
            <Search className="h-4 w-4 text-charcoal/70 mr-2" />
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs tracking-widest font-sans focus:outline-none text-charcoal uppercase flex-1 placeholder:text-charcoal/50"
            />
          </form>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase font-bold text-charcoal"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-sans font-bold tracking-widest uppercase text-charcoal focus:outline-none"
            >
              <option value="relevance">Sort By: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A - Z</option>
            </select>
          </div>
        </div>

        {/* Right Catalog Grid & Sorting */}
        <main className="lg:col-span-9 space-y-6">
          {/* Desktop Toolbar */}
          <div className="hidden lg:flex items-center justify-between border-b border-charcoal/5 pb-4">
            <span className="font-sans text-xs text-charcoal/40 uppercase tracking-widest">
              Showing {filteredProducts.length} results
            </span>
            <div className="flex items-center gap-6">
              <form onSubmit={handleSearchSubmit} className="flex items-center border border-charcoal/30 rounded-[4px] px-3 py-2 bg-white/50">
                <Search className="h-3.5 w-3.5 text-charcoal/70 mr-2" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs tracking-widest font-sans focus:outline-none text-charcoal uppercase w-56 placeholder:text-charcoal/50"
                />
              </form>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-[10px] font-sans font-bold tracking-widest uppercase text-charcoal focus:outline-none cursor-pointer"
              >
                <option value="relevance">Sort By: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Title: A - Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-sans text-xs tracking-widest text-charcoal/40 uppercase">
                No items match your selected filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-charcoal/30 z-50 lg:hidden flex">
          <div className="w-80 bg-warm-ivory h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-charcoal/5">
                <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="font-sans text-[10px] tracking-widest uppercase text-charcoal/40"
                >
                  Close
                </button>
              </div>
              
              {/* Collection Selection */}
              <div className="space-y-3">
                <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Collections</h4>
                <div className="flex flex-wrap gap-2">
                  {collections.map(c => (
                    <button
                      key={c}
                      onClick={() => handleCollectionChange(c)}
                      className={`font-sans text-[10px] uppercase tracking-widest px-3 py-1 border rounded-[4px] ${
                        (c === 'all' && !collectionParam) || collectionParam === c
                          ? 'bg-forest-green text-warm-ivory border-forest-green'
                          : 'bg-transparent text-charcoal/70 border-charcoal/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Types Selection */}
              <div className="space-y-3 pt-4 border-t border-charcoal/5">
                <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Apparel Type</h4>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => handleTypeChange(t)}
                      className={`font-sans text-[10px] uppercase tracking-widest px-3 py-1 border rounded-[4px] ${
                        (t === 'all' && !typeParam) || typeParam === t
                          ? 'bg-forest-green text-warm-ivory border-forest-green'
                          : 'bg-transparent text-charcoal/70 border-charcoal/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-3 pt-4 border-t border-charcoal/5">
                <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map(col => (
                    <button
                      key={col}
                      onClick={() => toggleFilter(selectedColors, setSelectedColors, col)}
                      className={`font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-[4px] border ${
                        selectedColors.includes(col)
                          ? 'bg-forest-green text-warm-ivory border-forest-green'
                          : 'bg-transparent text-charcoal/70 border-charcoal/10'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3 pt-4 border-t border-charcoal/5">
                <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Sizes</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => toggleFilter(selectedSizes, setSelectedSizes, sz)}
                      className={`font-sans text-[10px] px-3 py-1 rounded-[4px] border ${
                        selectedSizes.includes(sz)
                          ? 'bg-forest-green text-warm-ivory border-forest-green'
                          : 'bg-transparent text-charcoal/70 border-charcoal/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-8 w-full bg-forest-green text-warm-ivory font-sans text-xs tracking-widest uppercase py-3 rounded-[6px] hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>
          </div>
          <div className="flex-1" onClick={() => setShowMobileFilters(false)}></div>
        </div>
      )}
    </div>
  );
};
