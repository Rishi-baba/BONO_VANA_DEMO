import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal, TextReveal } from '../ui/ScrollReveal';
import { Button } from '../ui/Button';

export const EditorialHighlight = ({
  tag,
  title,
  description,
  image,
  link,
  reverse = false
}) => {
  return (
    <section className={`py-16 md:py-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
      {/* Image Block */}
      <ScrollReveal className="w-full md:w-1/2" direction={reverse ? "right" : "left"}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[4px]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </ScrollReveal>

      {/* Content Block */}
      <div className="w-full md:w-1/2 flex flex-col items-start text-left space-y-6">
        <ScrollReveal delay={0.1}>
          <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-forest-green">
            {tag}
          </span>
        </ScrollReveal>
        
        <TextReveal delay={0.2}>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-charcoal leading-tight">
            {title}
          </h2>
        </TextReveal>
        
        <ScrollReveal delay={0.3}>
          <p className="font-sans text-sm md:text-base text-charcoal/60 leading-relaxed max-w-md">
            {description}
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <div className="pt-2">
            <Link to={link}>
              <Button variant="outline" size="md">
                Discover Piece
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
