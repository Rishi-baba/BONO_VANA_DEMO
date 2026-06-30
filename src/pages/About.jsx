import React from 'react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left">
      <SEO 
        title="About Us" 
        description="Learn about Boho Vana's heritage, our commitment to slow fashion, and our sustainable materials."
      />
      {/* Editorial Title */}
      <div className="max-w-3xl space-y-4 mb-16">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
          Our Heritage
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal leading-tight">
          Slow fashion loomed with intention.
        </h1>
        <p className="font-sans text-sm md:text-base text-charcoal/70 leading-relaxed pt-2">
          Boho Vana was founded by Mira Lindstrom and Jonas Vana to create a breathable, sustainable alternative to fast fashion. Inspired by resort environments, organic materials, and Scandinavian simplicity, we make clothes that encourage you to slow down, breathe, and live in the moment.
        </p>
      </div>

      {/* Grid: Story Sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-charcoal/5 pt-12 items-center">
        <div className="md:col-span-5 aspect-[4/5] rounded-[8px] overflow-hidden bg-natural-linen/30">
          <img
            src="/images/linen_textures.jpg"
            alt="Linen Weaving Details"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-7 space-y-6">
          <h2 className="font-serif text-2xl font-medium text-charcoal">
            The Weave of Sustainability
          </h2>
          <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
            All our fibers are harvested ethically from European flax fields, which rely naturally on rainfall rather than heavy irrigation. We weave our apparel in small artisan workshops that guarantee safe working environments and living wages.
          </p>
          <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
            Fast fashion focuses on hyper-consumption; we focus on wardrobe integrity. Each wrap dress, resort shirt, and wide-leg trousers we design is built to mold to your form over years of gentle wash and wear, retaining its tactile, premium comfort.
          </p>
          
          {/* Sustainability Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-charcoal/5 text-center sm:text-left">
            <div>
              <span className="font-serif text-3xl font-bold text-forest-green block">100%</span>
              <span className="font-sans text-[9px] tracking-widest uppercase text-charcoal/50">Organic Linen</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-forest-green block">0%</span>
              <span className="font-sans text-[9px] tracking-widest uppercase text-charcoal/50">Synthetic Plastic</span>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-forest-green block">20+</span>
              <span className="font-sans text-[9px] tracking-widest uppercase text-charcoal/50">Artisan Cooperatives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign call to action */}
      <div className="bg-natural-linen/25 rounded-[12px] p-8 md:p-12 mt-20 text-center space-y-4">
        <h3 className="font-serif text-2xl font-medium text-charcoal">Experience the Collection</h3>
        <p className="font-sans text-xs text-charcoal/60 max-w-md mx-auto leading-relaxed">
          Discover breathable comfort loomed with patience and crafted for quiet, sunlit luxury.
        </p>
        <div className="pt-2">
          <Link to="/shop"><Button variant="primary">Shop Collection</Button></Link>
        </div>
      </div>
    </div>
  );
};
