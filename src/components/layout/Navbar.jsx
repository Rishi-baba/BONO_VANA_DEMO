import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, User, Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Logo } from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'shop' | 'collections' | null

  
  // Currency Selector State
  const [currency, setCurrency] = useState('UNITED STATES (USD)');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const currencies = ['UNITED STATES (USD)', 'EUROPE (EUR)', 'UNITED KINGDOM (GBP)', 'CANADA (CAD)'];

  const { cartCount, setCartOpen } = useCart();
  const navigate = useNavigate();



  return (
    <header 
      className="fixed top-2 left-0 right-0 z-40 px-4 md:px-8"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Floating Header Parent Container (aligned width with VÉON card) */}
      <div className="w-[92%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto relative">
        
        {/* Unified Floating Header Card */}
        <div className="bg-warm-ivory/80 backdrop-blur-md border border-charcoal/5 rounded-[8px] overflow-hidden shadow-lg">
          


          {/* Bottom Row: Header Navigation */}
          <div className="px-6 py-2.5 flex items-center justify-between">
            {/* Logo (Far Left, Single-Line Horizontal layout in Charcoal) */}
            <div className="flex items-center">
              <Link to="/" className="hover:opacity-90 flex items-center gap-3" onMouseEnter={() => setActiveMenu(null)}>
                <Logo showText={false} iconClassName="h-6 w-auto text-charcoal" />
                <span className="font-sans text-[11px] tracking-[0.25em] font-extrabold uppercase text-charcoal">
                  BOHO VANA
                </span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-charcoal p-1 focus:outline-none"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Single-Line Space-Separated Navigation (Far Right, No Slashes) */}
            <nav className="hidden md:flex items-center gap-6 text-[10px] md:text-[11px] font-sans tracking-[0.18em] uppercase font-semibold text-charcoal">
              
              <Link 
                to="/shop" 
                onMouseEnter={() => setActiveMenu('shop')} 
                className="hover:text-forest-green transition-colors py-2"
              >
                Shop
              </Link>
              
              <Link 
                to="/shop" 
                onMouseEnter={() => setActiveMenu('collections')} 
                className="hover:text-forest-green transition-colors py-2"
              >
                Collections
              </Link>
              
              <Link 
                to="/about" 
                onMouseEnter={() => setActiveMenu(null)} 
                className="hover:text-forest-green transition-colors py-2"
              >
                About
              </Link>
              
              <Link 
                to="/blog" 
                onMouseEnter={() => setActiveMenu(null)} 
                className="hover:text-forest-green transition-colors py-2"
              >
                Blog
              </Link>
              
              {/* Orders Link */}
              <Link to="/orders" onMouseEnter={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors py-2 flex items-center gap-1.5" title="My Orders">
                <span>Orders</span>
              </Link>
              
              {/* Favorites List Trigger */}
              <Link to="/favorites" onMouseEnter={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors py-2 flex items-center gap-1.5" title="Favorites">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Favorites</span>
              </Link>

              {/* Profile Link */}
              <Link to="/profile" onMouseEnter={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors py-2 flex items-center gap-1.5" title="Profile">
                <User className="h-4 w-4" />
                <span className="sr-only">Profile</span>
              </Link>

              {/* Custom Bag / Cart count with circle border */}
              <button 
                onClick={() => setCartOpen(true)} 
                onMouseEnter={() => setActiveMenu(null)} 
                className="hover:text-forest-green transition-colors py-2 flex items-center gap-1 cursor-pointer focus:outline-none uppercase"
                title="Cart"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="inline-flex items-center justify-center border border-charcoal rounded-full h-[18px] w-[18px] text-[8px] font-bold">
                  {cartCount}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Floating Mega Menus Dropdown Card directly below navbar */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(100%+8px)] left-0 right-0 bg-warm-ivory/95 backdrop-blur-md border border-charcoal/5 shadow-2xl rounded-[8px] z-30 overflow-hidden text-left"
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="px-6 py-8">
                {activeMenu === 'shop' && (
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Column 1: Featured & Bottoms stacked */}
                    <div className="col-span-3 space-y-6">
                      <div className="space-y-3">
                        <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Featured</h4>
                        <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                          <Link to="/shop?tag=Best+Sellers" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Best Sellers</Link>
                          <Link to="/shop?tag=New+Arrivals" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">New Arrivals</Link>
                          <Link to="/shop?tag=Sale" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Sale</Link>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Bottoms</h4>
                        <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                          <Link to="/shop?type=trousers" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Wide-Leg Pants</Link>
                          <Link to="/shop?type=skirts" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Wrap Skirts</Link>
                        </div>
                      </div>
                    </div>

                    {/* Left Column 2: Tops & Outerwear stacked */}
                    <div className="col-span-3 space-y-6">
                      <div className="space-y-3">
                        <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Tops & Shirts</h4>
                        <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                          <Link to="/shop?type=shirts" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Resort Shirts</Link>
                          <Link to="/shop?type=shirts" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Linen Tops</Link>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Outerwear</h4>
                        <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                          <Link to="/shop?type=outerwear" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Linen Blazers</Link>
                          <Link to="/shop?type=knitwear" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Knit Vests</Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Column Product Cards */}
                    <div className="col-span-6 grid grid-cols-2 gap-4">
                      <Link to="/shop/amara-linen-wrap-dress" onClick={() => setActiveMenu(null)} className="group block text-left">
                        <div className="aspect-[3/5] w-full rounded-[8px] overflow-hidden bg-natural-linen/35">
                          <img src="/images/amara_linen_dress.jpg" alt="Amara Dress" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        </div>
                        <div className="mt-2 flex justify-between font-sans text-[9px] font-medium text-charcoal uppercase tracking-wider">
                          <span>Amara Dress</span>
                          <span>₹15000.00</span>
                        </div>
                      </Link>
                      <Link to="/shop/sundance-resort-shirt" onClick={() => setActiveMenu(null)} className="group block text-left">
                        <div className="aspect-[3/5] w-full rounded-[8px] overflow-hidden bg-natural-linen/35">
                          <img src="/images/sundance_resort_shirt.png" alt="Sundance Shirt" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        </div>
                        <div className="mt-2 flex justify-between font-sans text-[9px] font-medium text-charcoal uppercase tracking-wider">
                          <span>Sundance Shirt</span>
                          <span>₹9800.00</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

                {activeMenu === 'collections' && (
                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Column 1: Categories */}
                    <div className="col-span-3 space-y-3">
                      <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Apparel Type</h4>
                      <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                        <Link to="/shop?type=dresses" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Dresses</Link>
                        <Link to="/shop?type=shirts" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Shirts</Link>
                        <Link to="/shop?type=trousers" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Trousers</Link>
                      </div>
                    </div>

                    {/* Left Column 2: Artisan & Occasions stacked */}
                    <div className="col-span-3 space-y-6">
                      <div className="space-y-3">
                        <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Artisan Labels</h4>
                        <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                          <Link to="/shop?collection=essentials" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Natural Flax</Link>
                          <Link to="/shop?collection=essentials" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Organic Cotton</Link>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-sans text-[9px] tracking-widest uppercase font-medium text-charcoal/45">Occasions</h4>
                        <div className="flex flex-col gap-2 font-sans text-xs text-charcoal/70">
                          <Link to="/shop?collection=resort" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Resort Escape</Link>
                          <Link to="/shop?collection=apparel" onClick={() => setActiveMenu(null)} className="hover:text-forest-green transition-colors uppercase">Slow Living</Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Column Visual Grid with Wide Center-Floating Badges */}
                    <div className="col-span-6 grid grid-cols-3 gap-3">
                      <Link to="/shop?collection=apparel" onClick={() => setActiveMenu(null)} className="relative block aspect-[3/5] rounded-[8px] overflow-hidden bg-natural-linen/35 group">
                        <img src="/images/hero_resort_wear.jpg" alt="Apparel" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-charcoal/10" />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[84%] bg-charcoal/80 backdrop-blur-[6px] text-warm-ivory text-[8px] md:text-[9px] tracking-[0.2em] font-medium uppercase px-3 py-2.5 rounded-[4px] shadow-lg flex justify-between items-center">
                          <span>Apparel</span>
                          <span className="text-xs leading-none">▸</span>
                        </div>
                      </Link>
                      <Link to="/shop?collection=resort" onClick={() => setActiveMenu(null)} className="relative block aspect-[3/5] rounded-[8px] overflow-hidden bg-natural-linen/35 group">
                        <img src="/images/amara_linen_dress.jpg" alt="Resort" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-charcoal/10" />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[84%] bg-charcoal/80 backdrop-blur-[6px] text-warm-ivory text-[8px] md:text-[9px] tracking-[0.2em] font-medium uppercase px-3 py-2.5 rounded-[4px] shadow-lg flex justify-between items-center">
                          <span>Resort</span>
                          <span className="text-xs leading-none">▸</span>
                        </div>
                      </Link>
                      <Link to="/shop?collection=essentials" onClick={() => setActiveMenu(null)} className="relative block aspect-[3/5] rounded-[8px] overflow-hidden bg-natural-linen/35 group">
                        <img src="/images/linen_textures.jpg" alt="Essentials" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-charcoal/10" />
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[84%] bg-charcoal/80 backdrop-blur-[6px] text-warm-ivory text-[8px] md:text-[9px] tracking-[0.2em] font-medium uppercase px-3 py-2.5 rounded-[4px] shadow-lg flex justify-between items-center">
                          <span>Essentials</span>
                          <span className="text-xs leading-none">▸</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Bottom bar with square fabric preview */}
                <div className="border-t border-charcoal/5 mt-6 pt-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-[4px] overflow-hidden bg-natural-linen/40">
                    <img src="/images/linen_textures.jpg" alt="Fabric" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-serif text-xs italic text-charcoal/80">
                    {activeMenu === 'shop' ? 'Quiet luxury by Nature.' : 'Handcrafted with Intention.'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-charcoal/20 z-50 md:hidden flex">
          <div className="w-80 bg-warm-ivory h-full p-6 flex flex-col justify-between shadow-2xl relative">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-charcoal focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col gap-6 mt-16 font-sans tracking-widest text-sm uppercase font-bold">
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Shop All
              </Link>
              <Link to="/shop?collection=apparel" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Apparel
              </Link>
              <Link to="/shop?collection=resort" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Resort Wear
              </Link>
              <Link to="/shop?collection=essentials" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Essentials
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                About
              </Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Journal
              </Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Profile
              </Link>
              <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                My Orders
              </Link>
              <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="text-charcoal py-2 border-b border-charcoal/5">
                Favorites
              </Link>
            </div>
            <div className="text-[10px] tracking-wider text-charcoal/50 uppercase font-bold">
              © {new Date().getFullYear()} Boho Vana
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
