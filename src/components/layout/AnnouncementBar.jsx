import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const AnnouncementBar = () => {
  const [currency, setCurrency] = useState('UNITED STATES (USD)');
  const [isOpen, setIsOpen] = useState(false);

  const currencies = ['UNITED STATES (USD)', 'EUROPE (EUR)', 'UNITED KINGDOM (GBP)', 'CANADA (CAD)'];

  return (
    <div className="fixed top-3 left-0 right-0 z-40 px-4 md:px-8">
      <div className="w-[92%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto bg-warm-ivory/80 backdrop-blur-md border border-charcoal/5 text-charcoal py-2 px-6 rounded-[8px] text-[10px] tracking-widest uppercase flex flex-col sm:grid sm:grid-cols-3 items-center gap-2 font-sans font-medium shadow-md">
        
        {/* Left: Currency selector */}
        <div className="relative sm:justify-self-start">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-charcoal/80 hover:text-charcoal transition-colors focus:outline-none cursor-pointer"
          >
            <span>{currency}</span>
            <ChevronDown className="h-3 w-3" />
          </button>
          {isOpen && (
            <div className="absolute left-0 mt-2 py-1 bg-warm-ivory border border-charcoal/10 rounded-md shadow-lg z-50 w-48 text-left">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCurrency(c);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-1.5 hover:bg-natural-linen/40 text-charcoal/80 hover:text-charcoal transition-colors text-[9px]"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Center: Free delivery info */}
        <div className="text-center text-charcoal font-medium sm:justify-self-center">
          Free Delivery Over $200
        </div>

        {/* Right: Star rating */}
        <div className="flex items-center gap-1.5 text-charcoal/80 sm:justify-self-end">
          <span className="text-charcoal text-[12px] leading-none">★★★★★</span>
          <span>4.85 / 5 on Trusted Shops</span>
        </div>

      </div>
    </div>
  );
};
