import React, { useState, forwardRef } from "react";

// Tooltip Provider (no-op in plain React)
const TooltipProvider = ({ children }) => <>{children}</>;

// Tooltip root component
const Tooltip = forwardRef(({ children }, ref) => <>{children}</>);

// Tooltip trigger
const TooltipTrigger = forwardRef(({ children, onHover, ...props }, ref) => (
  <span
    ref={ref}
    onMouseEnter={onHover}
    onMouseLeave={onHover}
    style={{ display: "inline-block", cursor: "pointer" }}
    {...props}
  >
    {children}
  </span>
));

// Tooltip content
const TooltipContent = forwardRef(({ children, visible, side = "top", offset = 8, style, ...props }, ref) => {
  if (!visible) return null;

  const positionStyles = {
    position: "absolute",
    zIndex: 1000,
    padding: "6px 12px",
    borderRadius: "4px",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "12px",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    transform: "translate(0,0)",
  };

  switch (side) {
    case "top":
      positionStyles.transform = `translateY(-${offset}px)`;
      break;
    case "bottom":
      positionStyles.transform = `translateY(${offset}px)`;
      break;
    case "left":
      positionStyles.transform = `translateX(-${offset}px)`;
      break;
    case "right":
      positionStyles.transform = `translateX(${offset}px)`;
      break;
  }

  return (
    <div ref={ref} style={{ ...positionStyles, ...style }} {...props}>
      {children}
    </div>
  );
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
