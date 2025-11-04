import React from "react";

// ----------------- Card Components -----------------
export const Card = React.forwardRef(({ style, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      borderRadius: 12,
      border: "1px solid #e5e7eb",
      backgroundColor: "#fff",
      color: "#111",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ style, children, ...props }, ref) => (
  <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 6, padding: 24, ...style }} {...props}>
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ style, children, ...props }, ref) => (
  <h3 ref={ref} style={{ fontSize: 20, fontWeight: 600, margin: 0, ...style }} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ style, children, ...props }, ref) => (
  <p ref={ref} style={{ fontSize: 14, color: "#6b7280", margin: 0, ...style }} {...props}>
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ style, children, ...props }, ref) => (
  <div ref={ref} style={{ padding: 24, paddingTop: 0, ...style }} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ style, children, ...props }, ref) => (
  <div ref={ref} style={{ display: "flex", alignItems: "center", padding: 24, paddingTop: 0, gap: 8, ...style }} {...props}>
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

// ----------------- Example usage -----------------
export default function SafeMindCardDemo() {
  return (
    <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to SafeMind</CardTitle>
          <CardDescription>This is a simple card description.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you can put any content like text, images, or components.</p>
        </CardContent>
        <CardFooter>
          <button style={{ padding: "8px 16px", backgroundColor: "#3b82f6", color: "#fff", borderRadius: 6, border: "none", cursor: "pointer" }}>
            Action
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
