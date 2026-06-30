import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    cartSubtotal,
    checkoutUrl,
    isLoading,
  } = useCart();

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-charcoal z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-warm-ivory shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-charcoal/5 flex items-center justify-between">
              <h2 className="font-sans text-sm tracking-widest uppercase font-bold text-charcoal flex items-center gap-2">
                Your Wardrobe Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                {isLoading && (
                  <svg className="animate-spin h-3 w-3 text-charcoal/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-charcoal/70 hover:text-charcoal p-1 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-sans text-xs tracking-widest text-charcoal/40 uppercase mb-4">
                    Your bag is currently empty
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setCartOpen(false)}>
                    Continue Browsing
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => {
                  const sizeOpt = item.variant.selectedOptions.find(o => o.name === 'Size')?.value;
                  const colorOpt = item.variant.selectedOptions.find(o => o.name === 'Color')?.value;
                  
                  return (
                    <div key={item.variant.id} className="flex gap-4 border-b border-charcoal/5 pb-6">
                      <img
                        src={item.product.featuredImage.url}
                        alt={item.product.title}
                        className="w-20 h-24 object-cover bg-natural-linen rounded-[6px]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-sm font-semibold text-charcoal leading-snug">
                              {item.product.title}
                            </h3>
                            <span className="font-sans text-xs font-bold text-charcoal">
                              ₹{parseFloat(item.variant.price.amount).toFixed(2)}
                            </span>
                          </div>
                          <p className="font-sans text-[10px] tracking-wider uppercase text-charcoal/40 mt-1">
                            {colorOpt} / {sizeOpt}
                          </p>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-charcoal/10 rounded-[6px] bg-natural-linen/30 text-charcoal text-xs">
                            <button
                              onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                              className="px-2.5 py-1.5 hover:bg-natural-linen transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                              className="px-2.5 py-1.5 hover:bg-natural-linen transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.variant.id)}
                            className="text-charcoal/40 hover:text-charcoal/80 transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-charcoal/5 bg-natural-linen/25 space-y-4">
                <div className="flex justify-between font-sans text-xs tracking-widest uppercase font-bold text-charcoal">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toFixed(2)}</span>
                </div>
                <p className="font-sans text-[10px] text-charcoal/40 leading-relaxed">
                  Shipping, taxes, and discounts will be calculated at checkout.
                </p>
                <Button 
                  fullWidth 
                  onClick={handleCheckout} 
                  className="mt-2"
                  disabled={isLoading || !checkoutUrl}
                >
                  {isLoading ? 'Updating...' : 'Proceed to Checkout'}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
