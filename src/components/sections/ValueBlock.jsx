import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const ValueBlock = () => {
  return (
    <section className="bg-natural-linen/25 border-y border-charcoal/5 py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Values list */}
        <div className="md:col-span-4 space-y-8">
          <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green block">
            Our Foundation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-charcoal leading-tight">
            We are Boho Vana
          </h2>
          <div className="space-y-4 pt-4 border-t border-charcoal/5">
            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal">
                Quiet Luxury
              </h3>
              <p className="mt-1 font-sans text-xs text-charcoal/60 leading-relaxed">
                Minimalist tailoring designed to emphasize natural textures and elegant flow.
              </p>
            </div>
            <div>
              <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal">
                Handcrafted & Slow
              </h3>
              <p className="mt-1 font-sans text-xs text-charcoal/60 leading-relaxed">
                Made in boutique batches to respect artisans, reduce waste, and avoid fast-fashion cycles.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Philosophy Narrative */}
        <div className="md:col-span-8 flex flex-col justify-between items-start md:pl-8">
          <p className="font-serif text-xl sm:text-2xl text-charcoal/80 leading-relaxed italic font-light">
            "Your wardrobe is a reflection of the life you want to lead. We believe in breathability, honest fabrics, and timeless design that lives and breathes with you."
          </p>
          <div className="mt-8 space-y-4">
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed max-w-xl">
              Inspired by resort environments and Scandinavian simplicity, Boho Vana creates pieces with organic European linen and GOTS-certified cottons. Every button is carved from natural coconut shell, and every garment is dyed using eco-friendly colorants that are gentle on your skin and the Earth.
            </p>
            <div className="pt-4">
              <Link to="/manifesto">
                <Button variant="outline" size="md">
                  Read Our Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
