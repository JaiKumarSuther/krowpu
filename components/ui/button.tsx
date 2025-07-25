import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors ring-offset-[hsl(0_0%_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(160_84%_39%)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(160_84%_39%/0.9)] shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] hover:shadow-[0_0_40px_hsl(160_84%_50%/0.05)]",
        destructive:
          "bg-[hsl(0_84.2%_60.2%)] text-[hsl(210_40%_98%)] hover:bg-[hsl(0_84.2%_55%)]",
        outline:
          "border border-[hsl(214.3_31.8%_91.4%)] bg-[hsl(0_0%_100%)] text-[hsl(222.2_84%_4.9%)] hover:bg-[hsl(210_40%_96.1%/0.5)] hover:text-[hsl(222.2_84%_4.9%)]",
        secondary:
          "bg-[hsl(210_40%_96.1%)] text-[hsl(222.2_84%_4.9%)] hover:bg-[hsl(210_40%_94%)]",
        ghost:
          "hover:bg-[hsl(210_40%_96.1%)] hover:text-[hsl(222.2_84%_4.9%)]",
        link:
          "text-[hsl(160_84%_39%)] underline-offset-4 hover:underline",
        hero:
          "bg-[hsl(160_84%_39%)] text-[hsl(0_0%_100%)] hover:bg-[hsl(160_84%_39%/0.9)] shadow-[0_10px_30px_-10px_hsl(160_84%_39%/0.3)] hover:shadow-[0_0_40px_hsl(160_84%_50%/0.4)] hover:-translate-y-0.5 transition-all duration-200",
        premium:
          "bg-[linear-gradient(135deg,hsl(160_84%_39%),hsl(160_84%_50%))] text-[hsl(0_0%_100%)] hover:shadow-[0_0_40px_hsl(160_84%_50%/0.4)] hover:-translate-y-0.5 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
