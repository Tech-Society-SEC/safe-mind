import React from "react";

// Utility for conditional class names
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Skeleton component
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-300",
        className
      )}
      {...props}
    />
  );
};

export { Skeleton };
