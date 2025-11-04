import React from "react";
import { Slot } from "@radix-ui/react-slot";

// Button component
const Button = React.forwardRef(
  ({ variant = "default", size = "default", asChild = false, children, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Base styles
    const baseStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      whiteSpace: "nowrap",
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      border: "none",
      transition: "background-color 0.2s",
    };

    // Variants
    const variantStyles = {
      default: { backgroundColor: "#3b82f6", color: "white" },
      destructive: { backgroundColor: "#dc2626", color: "white" },
      secondary: { backgroundColor: "#6b7280", color: "white" },
      outline: { backgroundColor: "white", border: "1px solid #ccc", color: "#111" },
      ghost: { backgroundColor: "transparent", color: "#111" },
      link: { backgroundColor: "transparent", color: "#3b82f6", textDecoration: "underline" },
    };

    // Sizes
    const sizeStyles = {
      default: { height: 40, padding: "0 16px" },
      sm: { height: 36, padding: "0 12px" },
      lg: { height: 44, padding: "0 20px" },
      icon: { height: 40, width: 40, padding: 0 },
    };

    return (
      <Comp
        ref={ref}
        style={{ ...baseStyle, ...variantStyles[variant], ...sizeStyles[size], ...style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Example usage
export default function SafeMindButtonDemo() {
  return (
    <div style={{ display: "flex", gap: 16, padding: 40 }}>
      <Button>Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline" size="sm">
        Small Outline
      </Button>
      <Button variant="ghost" size="lg">
        Large Ghost
      </Button>
      <Button asChild>
        <a href="/login">Link Button</a>
      </Button>
    </div>
  );
}

export { Button };
