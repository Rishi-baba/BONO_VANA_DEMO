import React from 'react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/ui/SEO';

export const Manifesto = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-left space-y-16">
      <SEO 
        title="Our Manifesto" 
        description="Boho Vana's declaration on slow fashion, breathable design, and living with intention."
      />
      {/* Manifesto Title */}
      <div className="max-w-3xl space-y-4">
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
          Our Declaration
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal leading-tight">
          To wear clothing is to walk with the Earth.
        </h1>
        <p className="font-sans text-xs sm:text-sm text-charcoal/50 uppercase tracking-widest pt-2">
          Boho Vana Manifesto on Quiet Luxury & Sustainable Living
        </p>
      </div>

      {/* Grid: Philosophy Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-charcoal/5 pt-12">
        <div className="space-y-3">
          <span className="font-serif text-3xl text-forest-green font-bold">01 /</span>
          <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal">Breathable Design</h2>
          <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
            Our skin is an active organ that breathes. We reject synthetics, plastics, and petrochemical fibers. We believe clothing should be open-weave, porous, and responsive to the temperature of your body.
          </p>
        </div>
        <div className="space-y-3">
          <span className="font-serif text-3xl text-forest-green font-bold">02 /</span>
          <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal">Artisanal Respect</h2>
          <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
            Every garment carries the energy of the hands that loomed it. We collaborate with family-owned mills in Scandinavia and Europe that treat tailoring as a sacred heritage. We construct items in boutique runs, avoiding the waste of overproduction.
          </p>
        </div>
        <div className="space-y-3">
          <span className="font-serif text-3xl text-forest-green font-bold">03 /</span>
          <h2 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal">Timeless Integrity</h2>
          <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
            Fast fashion makes garments disposable; slow living elevates them to heirloom objects. A Boho Vana linen top is designed to remain in your wardrobe for a decade, growing more beautiful, wrinkling naturally, and telling your story.
          </p>
        </div>
      </div>

      {/* Narrative block with Stacked Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center pt-8">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-medium text-charcoal leading-tight">
            We return to the soil, where elegance begins.
          </h2>
          <p className="font-sans text-xs text-charcoal/65 leading-relaxed">
            Flax is a zero-waste crop. It demands no extra watering beside standard rain, and leaves the soil fertile for crop rotation. By committing exclusively to organic natural flax linen, we build a clothing circle that decomposes safely back into the ground when its decades of service are finished.
          </p>
          <blockquote className="border-l-2 border-forest-green pl-6 italic font-serif text-lg text-deep-olive">
            "To live slowly is to choose objects that honor the time it took to create them."
          </blockquote>
        </div>
        <div className="aspect-[16/10] rounded-[8px] overflow-hidden bg-natural-linen/30">
          <img
            src="/images/hero_resort_wear.jpg"
            alt="Boho Vana Campaign Shot"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CTA Box */}
      <div className="pt-12 text-center">
        <Link to="/shop">
          <Button variant="primary">Explore the Wardrobe</Button>
        </Link>
      </div>
    </div>
  );
};
