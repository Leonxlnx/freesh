import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-8 py-4 font-sans text-sm font-semibold tracking-wide transition-all duration-300 rounded-full overflow-hidden";
  
  const variants = {
    primary: "bg-freesh-lime text-freesh-black shadow-[0_0_20px_-5px_rgba(190,242,100,0.5)] hover:shadow-[0_0_30px_-5px_rgba(190,242,100,0.7)]",
    outline: "bg-white/5 text-white border border-white/20 backdrop-blur-md hover:bg-white/10 hover:border-white/30",
    ghost: "bg-transparent text-freesh-muted hover:text-white"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10">{icon}</span>}
      
      {/* Soft Glow Reflection for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.button>
  );
};