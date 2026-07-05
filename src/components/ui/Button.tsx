import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "w-full py-3.5 px-6 rounded-2xl font-semibold text-center transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-[#1d3557] dark:bg-[#2a9d8f] text-white hover:bg-[#112237] dark:hover:bg-[#238b7e]",
    secondary: "bg-[#f1faee] dark:bg-[#1a2332] text-[#1d3557] dark:text-[#e2e8f0] hover:bg-[#e63946]/10 dark:hover:bg-[#2a9d8f]/10"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};