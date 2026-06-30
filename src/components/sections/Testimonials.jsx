import React from 'react';
import { ScrollReveal, TextReveal } from '../ui/ScrollReveal';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The quality and fit are absolutely perfect! From the moment I put it on, I could feel the attention to detail and craftsmanship. The fabric is soft yet durable, making it perfect for everyday wear while still looking stylish. Definitely my new go-to brand!",
    name: "Alex Carter",
    avatar: "/images/avatar_1.png"
  },
  {
    id: 2,
    quote: "Boho Vana's designs are effortlessly chic and modern. I recently purchased a linen shirt and a pair of trousers, and both exceeded my expectations. The fit is flattering, and the materials feel premium. I get compliments every time I wear them!",
    name: "Sophie Martinez",
    avatar: "/images/avatar_2.png"
  },
  {
    id: 3,
    quote: "From the fabric to the fit, every piece feels premium. You can tell that Boho Vana puts a lot of effort into making sure their designs are both fashionable and functional. I love the sophisticated yet relaxed aesthetic—it's exactly what I've been looking for in a brand!",
    name: "Lily Thompson",
    avatar: "/images/avatar_3.png"
  }
];

export const Testimonials = () => {
  return (
    <section className="bg-warm-ivory py-24 px-4 md:px-8 border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <TextReveal>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-charcoal tracking-tight">
              What Our Customers Say
            </h2>
          </TextReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-sans text-sm md:text-base text-charcoal/60 max-w-lg mx-auto leading-relaxed">
              Real experiences. Authentic style. See why everyone loves Boho Vana
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <ScrollReveal key={testimonial.id} delay={0.1 * idx + 0.3} className="h-full">
              <div 
                className="bg-natural-linen/30 rounded-[12px] p-8 md:p-10 flex flex-col justify-between items-center text-center gap-8 shadow-sm transition-all duration-300 hover:shadow-md border border-charcoal/5 h-full"
              >
                <p className="font-sans text-sm md:text-[15px] text-charcoal/80 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex flex-col items-center gap-4 mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-charcoal/10 shadow-sm">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-sans text-[11px] tracking-widest font-bold text-charcoal uppercase">
                    — {testimonial.name}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
