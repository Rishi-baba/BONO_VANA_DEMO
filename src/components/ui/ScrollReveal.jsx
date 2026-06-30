import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({ children, className, delay = 0, yOffset = 40, direction = "up" }) => {
  const yStart = direction === "up" ? yOffset : direction === "down" ? -yOffset : 0;
  const xStart = direction === "left" ? yOffset : direction === "right" ? -yOffset : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yStart, x: xStart }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal = ({ children, className, delay = 0 }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
