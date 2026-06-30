import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    title: "Slow Living,\nHandcrafted Linen.",
    subtitle: "Linen Apparel Designed for Slow Living",
    tagline: "Upgrade your resort wardrobe with organic, handcrafted linen garments designed for natural breathability.",
    image: "/images/hero_resort_wear.jpg",
    link: "/shop?collection=resort"
  },
  {
    id: 2,
    title: "Raw Textures,\nOrganic Knits.",
    subtitle: "Handcrafted Sustainability",
    tagline: "Upgrade your layering pieces with raw, GOTS-certified organic cotton knits designed for year-round ease.",
    image: "/images/linen_textures.jpg",
    link: "/shop?collection=essentials"
  },
  {
    id: 3,
    title: "The Signature\nWrap Dress.",
    subtitle: "Timeless Resort Silhouette",
    tagline: "Upgrade your travel essentials with the organic flax wrap dress, crafted to grow softer with every beach walk.",
    image: "/images/amara_linen_dress.jpg",
    link: "/shop/amara-linen-wrap-dress"
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 8500);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="sticky top-0 h-screen w-full overflow-hidden bg-natural-linen/20">
      {/* Immersive Slide Image Background */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={slide.id}
            src={slide.image}
            alt={slide.subtitle}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1, scale: 1, zIndex: -1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
          />
        </AnimatePresence>
        {/* Dark vignette tint to let white typography pop */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Grid Overlay Content */}
      <div className="absolute inset-0 flex items-end pb-8 md:pb-12 pt-32 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            
            {/* Left Block (col-span-7): Huge Title & Visual Thumbnail Controller */}
            <div className="md:col-span-7 flex flex-col items-start text-left">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slide.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-warm-ivory leading-[1.1] tracking-tight whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>
              </AnimatePresence>

              {/* Interactive Thumbnail Slider (Bottom Left) */}
              <div className="flex items-center gap-6 mt-6 md:mt-10">
                <span className="font-serif text-2xl md:text-3xl text-warm-ivory/80 italic font-medium leading-none select-none">
                  {`0${currentSlide + 1}`}
                </span>
                <div className="flex items-center gap-3">
                  {SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative aspect-[3/2] w-20 md:w-32 rounded-[6px] overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                        currentSlide === idx ? 'border-warm-ivory opacity-100 scale-102 shadow-lg' : 'border-transparent opacity-50 hover:opacity-85'
                      }`}
                    >
                      <img src={s.image} alt={s.subtitle} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Block (col-span-5): Slogan description & Action button */}
            <div className="md:col-span-5 flex flex-col items-start gap-5 md:gap-6 text-left max-w-sm md:pl-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="font-sans text-xs sm:text-sm text-warm-ivory/85 leading-relaxed tracking-wider"
                >
                  {slide.tagline}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Link to={slide.link}>
                    <button className="bg-warm-ivory/85 backdrop-blur-sm text-charcoal hover:bg-warm-ivory transition-colors px-6 py-3 rounded-[6px] text-[10px] tracking-widest uppercase font-sans font-bold shadow-md cursor-pointer">
                      Browse Collection
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
