import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByHandle, getProducts } from '../services/shopify';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { SEO } from '../components/ui/SEO';
import { Heart, Minus, Plus } from 'lucide-react';

export const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Variant selector states
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    getProductByHandle(handle).then(prod => {
      if (prod) {
        setProduct(prod);
        setSelectedSize(prod.options.find(o => o.name === 'Size')?.values[0] || '');
        setSelectedColor(prod.options.find(o => o.name === 'Color')?.values[0] || '');
        setQuantity(1);

        // Fetch cross-sell recommendations
        getProducts().then(all => {
          const crossSell = all.filter(p => p.id !== prod.id).slice(0, 3);
          setRelatedProducts(crossSell);
        });
      }
      setLoading(false);
    });
  }, [handle]);

  if (loading) {
    return <div className="py-32 font-sans text-xs tracking-widest uppercase text-charcoal/40">Loading details...</div>;
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <p className="font-sans text-xs tracking-widest text-charcoal/40 uppercase mb-4">Product not found</p>
        <Link to="/shop"><Button variant="outline" size="sm">Back to Shop</Button></Link>
      </div>
    );
  }

  // Find active variant matching choices
  const activeVariant = product.variants.edges.find(({ node }) => {
    const colorOpt = node.selectedOptions.find(opt => opt.name === 'Color');
    const sizeOpt = node.selectedOptions.find(opt => opt.name === 'Size');
    
    // If the variant doesn't have Color/Size options, or if our selected state matches
    const isColorMatch = !colorOpt || colorOpt.value === selectedColor;
    const isSizeMatch = !sizeOpt || sizeOpt.value === selectedSize;
    
    return isColorMatch && isSizeMatch;
  })?.node || product.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (activeVariant) {
      addItem(product, activeVariant, quantity);
    }
  };

  const isProductFavorited = isFavorite(product.id);
  const details = product.metafields?.find(m => m.key === 'details')?.value;
  const measurements = product.metafields?.find(m => m.key === 'measurements')?.value;
  const materials = product.metafields?.find(m => m.key === 'materials')?.value;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left">
      <SEO 
        title={product.title} 
        description={product.description?.substring(0, 160)}
        image={product.images?.edges?.[0]?.node?.url}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Vertical Image Stack */}
        <div className="lg:col-span-7 space-y-6">
          <div className="block lg:hidden overflow-x-auto flex gap-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {product.images.edges.map((img, idx) => (
              <img
                key={idx}
                src={img.node.url}
                alt={img.node.altText}
                className="w-full flex-shrink-0 aspect-[3/4] object-cover bg-natural-linen/30 rounded-[8px] snap-center"
              />
            ))}
          </div>
          <div className="hidden lg:flex flex-col gap-6">
            {product.images.edges.map((img, idx) => (
              <div key={idx} className="w-full aspect-[3/4] rounded-[8px] overflow-hidden bg-natural-linen/30">
                <img src={img.node.url} alt={img.node.altText} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Options Panel */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="space-y-2">
            <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">{product.vendor}</span>
            <h1 className="font-serif text-3xl font-medium text-charcoal">{product.title}</h1>
            <div className="text-lg font-sans font-bold text-charcoal">
              ₹{activeVariant ? parseFloat(activeVariant.price.amount).toFixed(2) : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </div>
            {activeVariant?.quantityAvailable && (
              <span className="inline-block text-[10px] font-sans text-forest-green bg-sage/20 font-bold px-2 py-0.5 rounded-[4px]">
                {activeVariant.quantityAvailable} in stock - ready to ship
              </span>
            )}
          </div>

          <p className="font-sans text-xs text-charcoal/70 leading-relaxed border-t border-charcoal/5 pt-4">
            {product.description}
          </p>

          {/* Color Selector */}
          <div className="space-y-2 border-t border-charcoal/5 pt-4">
            <label className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Color: {selectedColor}</label>
            <div className="flex gap-2">
              {product.options.find(o => o.name === 'Color')?.values.map(col => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`font-sans text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-[4px] border ${
                    selectedColor === col ? 'bg-forest-green text-warm-ivory border-forest-green' : 'bg-transparent text-charcoal border-charcoal/10 hover:border-forest-green'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2 pt-2">
            <label className="font-sans text-[10px] tracking-widest uppercase font-bold text-charcoal/40">Size: {selectedSize}</label>
            <div className="flex gap-2">
              {product.options.find(o => o.name === 'Size')?.values.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`font-sans text-[10px] uppercase tracking-widest h-10 w-10 flex items-center justify-center rounded-[4px] border font-bold ${
                    selectedSize === sz ? 'bg-forest-green text-warm-ivory border-forest-green' : 'bg-transparent text-charcoal border-charcoal/10 hover:border-forest-green'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy controls */}
          <div className="flex items-center gap-4 pt-4 border-t border-charcoal/5">
            <div className="flex items-center border border-charcoal/10 rounded-[8px] bg-natural-linen/20 text-charcoal">
              <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-3.5 py-2.5 hover:bg-natural-linen transition-colors">
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-4 text-xs font-sans font-bold">{quantity}</span>
              <button onClick={() => setQuantity(prev => prev + 1)} className="px-3.5 py-2.5 hover:bg-natural-linen transition-colors">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-forest-green text-warm-ivory font-sans text-xs tracking-widest uppercase py-3 rounded-[8px] font-bold border border-forest-green hover:bg-transparent hover:text-forest-green transition-all duration-300"
            >
              Add to Wardrobe
            </button>
            
            <button
              onClick={() => toggleFavorite(product)}
              className="p-3 border border-charcoal/10 rounded-[8px] hover:border-charcoal transition-colors focus:outline-none"
            >
              <Heart className={`h-4 w-4 ${isProductFavorited ? 'fill-forest-green text-forest-green' : 'text-charcoal/60'}`} />
            </button>
          </div>

          {/* Product Details Accordions */}
          <div className="pt-6 border-t border-charcoal/5">
            {details && <Accordion title="Item Description">{details}</Accordion>}
            {measurements && <Accordion title="Sizing & Measurements">{measurements}</Accordion>}
            {materials && <Accordion title="Materials & Care Guidance">{materials}</Accordion>}
          </div>
        </div>
      </div>

      {/* Recommended items: Pairs well with */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-16 border-t border-charcoal/5">
          <h2 className="font-serif text-2xl font-medium text-charcoal mb-8 text-center sm:text-left">Pairs Well With</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
