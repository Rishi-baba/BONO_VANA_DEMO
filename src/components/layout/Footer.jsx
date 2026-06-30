import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Boho Vana Journal.');
  };

  return (
    <footer className="bg-dark-teal text-warm-ivory py-16 px-4 md:px-8 mt-auto border-t border-dark-teal/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Brand Bio */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div className="flex flex-col items-start">
            <Logo
              className="items-start"
              iconClassName="!text-warm-ivory h-12 w-auto"
            />
            <p className="mt-4 font-sans text-xs text-warm-ivory/60 leading-relaxed max-w-sm">
              A premium sustainable clothing brand inspired by handcrafted linen, nature, and slow living. Crafted ethically to bring quiet luxury and Scandinavian simplicity to your lifestyle.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4 text-xs font-sans tracking-widest text-warm-ivory/50 uppercase">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-warm-ivory transition-colors">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-warm-ivory transition-colors">Pinterest</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-warm-ivory transition-colors">Journal</a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {/* Column 1 */}
          <div>
            <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-warm-ivory/40 mb-3">Shop</h4>
            <ul className="flex flex-col gap-2 font-sans text-xs text-warm-ivory/75">
              <li><Link to="/shop?collection=apparel" className="hover:text-warm-ivory transition-colors">All Apparel</Link></li>
              <li><Link to="/shop?collection=resort" className="hover:text-warm-ivory transition-colors">Resort Wear</Link></li>
              <li><Link to="/shop?collection=essentials" className="hover:text-warm-ivory transition-colors">Essentials</Link></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-warm-ivory/40 mb-3">Brand</h4>
            <ul className="flex flex-col gap-2 font-sans text-xs text-warm-ivory/75">
              <li><Link to="/about" className="hover:text-warm-ivory transition-colors">Our Story</Link></li>
              <li><Link to="/manifesto" className="hover:text-warm-ivory transition-colors">Manifesto</Link></li>
              <li><Link to="/blog" className="hover:text-warm-ivory transition-colors">Journal</Link></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-warm-ivory/40 mb-3">Support</h4>
            <ul className="flex flex-col gap-2 font-sans text-xs text-warm-ivory/75">
              <li><a href="#" className="hover:text-warm-ivory transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-warm-ivory transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-warm-ivory transition-colors">Care Guide</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="md:col-span-3">
          <h4 className="font-sans text-[10px] tracking-widest uppercase font-bold text-warm-ivory/40 mb-3">Newsletter</h4>
          <p className="font-sans text-xs text-warm-ivory/60 leading-relaxed mb-4">
            Subscribe to receive editorial stories, sustainable design updates, and private lookbook access.
          </p>
          <form onSubmit={handleSubmit} className="flex border-b border-warm-ivory/20 py-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              required
              className="bg-transparent text-xs text-warm-ivory font-sans focus:outline-none flex-1 placeholder:text-warm-ivory/30 tracking-widest uppercase"
            />
            <button type="submit" className="p-1 text-warm-ivory/60 hover:text-warm-ivory transition-colors focus:outline-none">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-warm-ivory/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase text-warm-ivory/40 font-sans">
        <span>© {new Date().getFullYear()} Boho Vana. All Rights Reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-warm-ivory transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-warm-ivory transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
