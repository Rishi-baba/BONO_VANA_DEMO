import React from 'react';
import { HeroSlider } from '../components/sections/HeroSlider';
import { CategoryList } from '../components/sections/CategoryList';
import { CarouselTabSection } from '../components/sections/CarouselTabSection';
import { ValueBlock } from '../components/sections/ValueBlock';
import { EditorialHighlight } from '../components/sections/EditorialHighlight';
import { CollectionsGrid } from '../components/sections/CollectionsGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { SEO } from '../components/ui/SEO';
import { ScrollReveal, TextReveal } from '../components/ui/ScrollReveal';

export const Home = () => {
  return (
    <div className="w-full">
      <SEO 
        title="Home" 
        description="Boho Vana offers premium sustainable fashion, crafted with organic materials. Discover our minimalist, timeless collections for women."
      />
      {/* Hero Section */}
      <HeroSlider />

      {/* Rest of the content wrapped to overlap the sticky hero */}
      <div className="relative z-10 bg-warm-ivory">
        {/* Categories Bar */}
        <CategoryList />

      {/* Curated Product Carousel Tabs */}
      <CarouselTabSection />

      {/* Narrative Brand Values Block */}
      <ValueBlock />

      {/* Staggered Editorial Feature Sections */}
      <EditorialHighlight
        tag="Signature Silhouette"
        title="Amara Linen Wrap Dress"
        description="Thoughtfully tailored from GOTS-certified European organic flax. A midi-wrap dress built for long beach strolls, quiet picnics, and resort-inspired elegance. Complete with natural coconut buttons."
        image="/images/amara_linen_dress.jpg"
        link="/shop/amara-linen-wrap-dress"
      />

      <EditorialHighlight
        tag="Organic Minimalism"
        title="Sundance Resort Shirt"
        description="Crafted in unisex camp collar layout. Linen-cotton breathable yarn that softens with every wash, bringing Scandinavian simplicity and beach comfort to your slow living weekends."
        image="/images/sundance_resort_shirt.png"
        link="/shop/sundance-resort-shirt"
        reverse={true}
      />

      {/* Curated Collection Cards Grid */}
      <CollectionsGrid />

      {/* Customer Testimonials */}
      <Testimonials />

        {/* Mid-Page Editorial Quote Banner */}
        <section className="bg-natural-linen/15 py-24 md:py-32 text-center border-b border-charcoal/5 px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <ScrollReveal delay={0.1}>
              <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
                Our Manifesto
              </span>
            </ScrollReveal>
            <TextReveal delay={0.2}>
              <p className="font-serif text-2xl md:text-3xl font-light text-charcoal leading-relaxed max-w-xl mx-auto pt-2">
                "Your clothing is a canvas wrapper for the life you choose to live. Walk gently, breathe deeply, live slowly."
              </p>
            </TextReveal>
          </div>
        </section>
      </div>
    </div>
  );
};
