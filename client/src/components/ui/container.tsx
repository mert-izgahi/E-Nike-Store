import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
const containerVariants = cva("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-screen-2xl",
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
);
Container.displayName = "Container";
export { Container };
