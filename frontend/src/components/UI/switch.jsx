// src/components/UI/switch.jsx
import React, { forwardRef } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

// Utility for merging Tailwind classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const Switch = forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors " +
        "data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 " +
        "focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg transition-transform " +
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = "Switch";
