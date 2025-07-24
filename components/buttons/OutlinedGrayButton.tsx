"use client";

import React from "react";

interface OutlinedGrayButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  label?: string;
}

const OutlinedGrayButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  label,
}: OutlinedGrayButtonProps) => {
  const baseClasses = [
    "inline-flex items-center justify-center px-6 py-3",
    "bg-transparent hover:bg-[hsl(140_30%_95%)]  text-[hsl(222.2_84%_4.9%)]  font-semibold",
    "border border-[hsl(140_20%_90%)]  hover:border-[hsl(140_75%_20%)/0.3]",
    "rounded-lg transition-all duration-150",
    "hover:shadow-sm hover:-translate-y-0.5",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
    "focus:outline-none focus:ring-2 focus:ring-[hsl(140_75%_20%)]  focus:ring-offset-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {label || children}
    </button>
  );
};

export default OutlinedGrayButton;
