import React from "react";

function Badge({ variant = "default", children, style, ...props }) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 9999,
    padding: "2px 10px",
    fontSize: 12,
    fontWeight: 600,
    transition: "background-color 0.2s",
    cursor: "default",
  };

  const variantStyles = {
    default: { backgroundColor: "#3b82f6", color: "white", border: "1px solid transparent" },
    secondary: { backgroundColor: "#6b7280", color: "white", border: "1px solid transparent" },
    destructive: { backgroundColor: "#dc2626", color: "white", border: "1px solid transparent" },
    outline: { backgroundColor: "transparent", color: "#111", border: "1px solid #ccc" },
  };

  return (
    <div style={{ ...baseStyle, ...variantStyles[variant], ...style }} {...props}>
      {children}
    </div>
  );
}

export { Badge };
