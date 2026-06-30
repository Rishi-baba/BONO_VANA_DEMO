import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'text'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans text-xs tracking-widest uppercase transition-all duration-300 font-bold focus:outline-none';
  
  const variants = {
    primary: 'bg-forest-green text-warm-ivory border border-forest-green hover:bg-transparent hover:text-forest-green',
    secondary: 'bg-warm-ivory text-charcoal border border-charcoal hover:bg-charcoal hover:text-warm-ivory',
    outline: 'bg-transparent text-charcoal border border-charcoal/20 hover:border-forest-green hover:text-forest-green',
    text: 'bg-transparent text-charcoal hover:text-deep-olive hover:underline p-0 border-none'
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] rounded-[6px]',
    md: 'px-6 py-3 rounded-[8px]',
    lg: 'px-8 py-4 text-sm rounded-[10px]'
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
