import React, { forwardRef, useState } from "react";

// Utility to get styles for toggle based on variant and size
const getToggleStyles = ({ variant = "default", size = "default", active }) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    userSelect: "none",
  };

  const sizeStyles = {
    default: { height: "40px", padding: "0 12px", fontSize: "14px" },
    sm: { height: "36px", padding: "0 10px", fontSize: "12px" },
    lg: { height: "44px", padding: "0 16px", fontSize: "16px" },
  };

  const variantStyles = {
    default: {
      backgroundColor: active ? "#007bff" : "#f0f0f0",
      color: active ? "#fff" : "#000",
      border: "none",
    },
    outline: {
      backgroundColor: active ? "#007bff" : "#fff",
      color: active ? "#fff" : "#007bff",
      border: "1px solid #007bff",
    },
  };

  return { ...base, ...sizeStyles[size], ...variantStyles[variant] };
};

// Toggle component
const Toggle = forwardRef(({ variant, size, children, onToggle, ...props }, ref) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
    if (onToggle) onToggle(!active);
  };

  return (
    <div
      ref={ref}
      style={getToggleStyles({ variant, size, active })}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
});

Toggle.displayName = "Toggle";

export { Toggle };
