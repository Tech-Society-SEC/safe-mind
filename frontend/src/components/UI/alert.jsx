import React from "react";

// Basic Alert component
const Alert = React.forwardRef(({ variant = "default", children, style, ...props }, ref) => {
  const baseStyle = {
    position: "relative",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    backgroundColor: variant === "destructive" ? "#fee2e2" : "#f9fafb",
    color: variant === "destructive" ? "#b91c1c" : "#111",
    boxSizing: "border-box",
  };

  return (
    <div ref={ref} role="alert" style={{ ...baseStyle, ...style }} {...props}>
      {children}
    </div>
  );
});
Alert.displayName = "Alert";

// Alert title
const AlertTitle = React.forwardRef(({ children, style, ...props }, ref) => (
  <h5
    ref={ref}
    style={{ marginBottom: 8, fontWeight: 500, fontSize: 16, lineHeight: 1.2, ...style }}
    {...props}
  >
    {children}
  </h5>
));
AlertTitle.displayName = "AlertTitle";

// Alert description
const AlertDescription = React.forwardRef(({ children, style, ...props }, ref) => (
  <div ref={ref} style={{ fontSize: 14, lineHeight: 1.5, ...style }} {...props}>
    {children}
  </div>
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
