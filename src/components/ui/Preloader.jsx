import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: Centered, 1: Split + Img 1, 2: Split + Img 2, 3: Split + Img 3, 4: Re-merged, 5: Out
  const [isDone, setIsDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = 'hidden';

    // Track mobile breakpoint for tight layout calculations
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Phases sequence matching Sōma 3-image preloader timing
    const t1 = setTimeout(() => setPhase(1), 700);  // Split + Image 1
    const t2 = setTimeout(() => setPhase(2), 1400); // Image 2
    const t3 = setTimeout(() => setPhase(3), 2100); // Image 3
    const t4 = setTimeout(() => setPhase(4), 2800); // Merge back
    const t5 = setTimeout(() => {
      setPhase(5);
      setTimeout(() => {
        document.body.style.overflow = '';
        setIsDone(true);
        if (onComplete) onComplete();
      }, 800); // wait for slide-up exit transition
    }, 3400);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      // Unlock scroll
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  // Dynamic pixel offsets that work in combination with the initial flex gap to create a tight split gap
  const textLeftVariants = {
    centered: { x: 0 },
    split: { x: isMobile ? -65 : -105 },
    merged: { x: 0 }
  };

  const textRightVariants = {
    centered: { x: 0 },
    split: { x: isMobile ? 65 : 105 },
    merged: { x: 0 }
  };

  // Get current active campaign image for the split slideshow
  const getCurrentImage = () => {
    if (phase === 1) return "/images/amara_linen_dress.jpg";
    if (phase === 2) return "/images/sundance_resort_shirt.png";
    return "https://cdn.shopify.com/s/files/1/0985/3757/0377/files/women_stripe_shirt_pant_e87e9366-0ba8-406f-b31c-28ef90777b90.jpg?v=1782820303"; // phase === 3
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: phase === 5 ? '-100%' : 0 }}
      transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
      className="fixed inset-0 z-50 bg-warm-ivory flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center w-full">
        
        {/* Large Splitting Brand Logo with initial flex gap */}
        <div className="relative flex items-center justify-center font-sans text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-[0.15em] text-charcoal h-32 md:h-40 w-full select-none gap-6 sm:gap-8">
          <motion.span
            variants={textLeftVariants}
            animate={phase >= 1 && phase <= 3 ? 'split' : phase >= 4 ? 'merged' : 'centered'}
            transition={{ duration: 0.65, ease: [0.85, 0, 0.15, 1] }}
            className="inline-block z-10 pl-[0.15em]" // offsets tracking gap
          >
            BOHO
          </motion.span>
          
          <motion.span
            variants={textRightVariants}
            animate={phase >= 1 && phase <= 3 ? 'split' : phase >= 4 ? 'merged' : 'centered'}
            transition={{ duration: 0.65, ease: [0.85, 0, 0.15, 1] }}
            className="inline-block z-10"
          >
            VANA
          </motion.span>

          {/* Center Image Container (Direct source change in place, single container key) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <AnimatePresence>
              {(phase >= 1 && phase <= 3) && (
                <motion.div
                  key="preloader-image-container"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="w-[20vw] max-w-[190px] min-w-[110px] aspect-[3/4.5] rounded-[8px] overflow-hidden bg-natural-linen shadow-xl"
                >
                  <img 
                    src={getCurrentImage()} 
                    alt="Loading Campaign" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Large Handwriting Subtitle */}
        <motion.div
          animate={{ opacity: phase >= 1 && phase <= 3 ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="font-cursive text-5xl md:text-6xl text-charcoal/80 lowercase italic select-none mt-4 md:mt-6"
          style={{ fontFamily: '"Mrs Saint Delafield", cursive' }}
        >
          slow living
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Preloader;
