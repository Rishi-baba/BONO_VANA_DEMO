import React from 'react';

export const Logo = ({ showText = true, className = '', iconClassName = '', textClassName = '' }) => {
  if (!showText) {
    // Render only the monogram cropped to its boundaries
    return (
      <svg
        viewBox="40 10 125 78"
        fill="currentColor"
        className={`h-10 w-auto ${iconClassName.includes('text-') ? '' : 'text-forest-green'} ${iconClassName}`}
      >
        {/* Left stem of 'b' */}
        <rect x="45" y="12" width="12" height="72" />
        {/* Left loop of 'b' */}
        <circle cx="78" cy="60" r="18" stroke="currentColor" strokeWidth="12" fill="none" />
        
        {/* Right stem of 'va' */}
        <rect x="140" y="24" width="12" height="60" />
        {/* Right loop of 'va' */}
        <circle cx="128" cy="60" r="18" stroke="currentColor" strokeWidth="12" fill="none" />
        {/* Top bar of 'va' */}
        <rect x="95" y="18" width="63" height="12" />
      </svg>
    );
  }

  // Render the full logo with monogram, clean stencil B, text, and foliage swag
  return (
    <svg
      viewBox="0 0 300 170"
      fill="currentColor"
      className={`h-24 w-auto ${iconClassName.includes('text-') ? '' : 'text-forest-green'} ${iconClassName}`}
    >
      {/* Monogram Section */}
      <g>
        {/* Left stem of 'b' */}
        <rect x="95" y="12" width="12" height="72" />
        {/* Left loop of 'b' */}
        <circle cx="128" cy="60" r="18" stroke="currentColor" strokeWidth="12" fill="none" />
        
        {/* Right stem of 'va' */}
        <rect x="190" y="24" width="12" height="60" />
        {/* Right loop of 'va' */}
        <circle cx="178" cy="60" r="18" stroke="currentColor" strokeWidth="12" fill="none" />
        {/* Top bar of 'va' */}
        <rect x="145" y="18" width="63" height="12" />
      </g>

      {/* Stencil Letter 'B' (Cleaned loop and stem separation) */}
      <g>
        {/* Vertical stem */}
        <rect x="52" y="103" width="3.2" height="19.5" rx="0.5" />
        {/* Loops of B drawn as a clean double-arc stroke, avoiding any secondary back-stem */}
        <path
          d="M 59 104.5 C 64 104.5, 66.5 106.5, 64.5 109.5 C 63 111.5, 63 112, 64.5 113.8 C 67 116.5, 65 121.5, 59 121.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Remaining Text 'OHO VANA' with exact spacing alignment */}
      <text
        x="76"
        y="122.5"
        fontFamily="'Plus Jakarta Sans', 'Montserrat', system-ui, sans-serif"
        fontWeight="800"
        fontSize="21.5"
        letterSpacing="0.25em"
        fill="currentColor"
        className={textClassName}
      >
        OHO VANA
      </text>

      {/* Hand-Drawn Foliage Swag */}
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Center Line */}
        <line x1="60" y1="148" x2="240" y2="148" strokeWidth="1.5" />
        
        {/* Left Branch Leaves (pointing left-upwards and left-downwards) */}
        {/* Top leaves */}
        <path d="M 135 148 C 125 137, 110 140, 103 143 C 115 146, 125 147, 135 148 Z" />
        <path d="M 115 148 C 105 134, 90 137, 83 141 C 95 144, 105 146, 115 148 Z" />
        <path d="M 95 148 C 85 132, 70 135, 63 139 C 75 141, 85 144, 95 148 Z" />
        {/* Bottom leaves */}
        <path d="M 140 148 C 130 159, 115 156, 108 152 C 120 149, 130 148, 140 148 Z" />
        <path d="M 120 148 C 110 162, 95 159, 88 154 C 100 151, 110 149, 120 148 Z" />
        <path d="M 100 148 C 90 164, 75 160, 68 155 C 80 152, 90 150, 100 148 Z" />

        {/* Right Branch Leaves (pointing right-upwards and right-downwards) */}
        {/* Top leaves */}
        <path d="M 165 148 C 175 137, 190 140, 197 143 C 185 146, 175 147, 165 148 Z" />
        <path d="M 185 148 C 195 134, 210 137, 217 141 C 205 144, 195 146, 185 148 Z" />
        <path d="M 205 148 C 215 132, 230 135, 237 139 C 225 141, 215 144, 205 148 Z" />
        {/* Bottom leaves */}
        <path d="M 160 148 C 170 159, 185 156, 192 152 C 180 149, 170 148, 160 148 Z" />
        <path d="M 180 148 C 190 162, 205 159, 212 154 C 200 151, 190 149, 180 148 Z" />
        <path d="M 200 148 C 210 164, 225 160, 232 155 C 220 152, 210 150, 200 148 Z" />
      </g>
    </svg>
  );
};

export default Logo;
