import React, { createContext, useContext, forwardRef } from "react";

// Context for size and variant
const ToggleGroupContext = createContext({
  size: "default",
  variant: "default",
});

// Utility to get styles based on size and variant
const getToggleStyles = ({ size, variant, active }) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
    margin: "2px",
    transition: "all 0.2s ease",
  };

  const sizeStyles = {
    default: { padding: "6px 12px", fontSize: "14px" },
    sm: { padding: "4px 8px", fontSize: "12px" },
    lg: { padding: "8px 16px", fontSize: "16px" },
  };

  const variantStyles = {
    default: { backgroundColor: active ? "#007bff" : "#f0f0f0", color: active ? "#fff" : "#000" },
    outline: { backgroundColor: active ? "#007bff" : "#fff", color: active ? "#fff" : "#007bff", border: "1px solid #007bff" },
  };

  return { ...base, ...sizeStyles[size || "default"], ...variantStyles[variant || "default"] };
};

// ToggleGroup container
const ToggleGroup = forwardRef(({ variant, size, children, style, ...props }, ref) => (
  <div
    ref={ref}
    style={{ display: "flex", gap: "4px", ...style }}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </div>
));

ToggleGroup.displayName = "ToggleGroup";

// ToggleGroup Item
const ToggleGroupItem = forwardRef(({ active, children, style, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <div
      ref={ref}
      style={getToggleStyles({ size: context.size, variant: context.variant, active, ...style })}
      {...props}
    >
      {children}
    </div>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
