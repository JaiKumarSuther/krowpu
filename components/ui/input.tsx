"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md",
          "border border-[hsl(214.3_31.8%_91.4%)]", // --border / --input
          "bg-[hsl(0_0%_100%)]", // --background
          "px-3 py-2 text-base md:text-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[hsl(222.2_84%_4.9%)]", // --foreground
          "text-[hsl(222.2_84%_4.9%)]", // --foreground
          "placeholder:text-[hsl(215.4_16.3%_46.9%)]", // --muted-foreground
          "ring-offset-[hsl(0_0%_100%)]", // --ring-offset-background
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[hsl(160_84%_39%)]", // --ring
          "focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
