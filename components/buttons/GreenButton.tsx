"use client";

import React from "react";

interface GreenButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const GreenButton = ({
  label,
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: GreenButtonProps) => {
  const baseClass = `
    inline-flex items-center justify-center gap-2 whitespace-nowrap
    rounded-md text-sm py-2.5 px-6 font-medium ring-offset-[hsl(0_0%_100%)] 
    transition-all duration-200 focus:outline-none focus-visible:ring-2
    focus-visible:ring-[hsl(160_84%_39%)]  focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    shadow-sm hover:shadow-md hover:-translate-y-0.5
  `;

  const heroVariant = `
    bg-[hsl(160_84%_39%)]  text-white
    hover:bg-[hsl(160_84%_39%)/0.9]
    shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] 
    hover:shadow-[0_0_40px_hsl(160_84%_50%/0.4)] 
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${heroVariant}  ${className}`}
    >
      {label || children}
    </button>
  );
};

export default GreenButton;
