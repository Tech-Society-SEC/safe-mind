import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

// Breadcrumb container
const Breadcrumb = React.forwardRef(({ children, style, ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" style={{ display: "block", ...style }} {...props}>
    {children}
  </nav>
));
Breadcrumb.displayName = "Breadcrumb";

// Breadcrumb list
const BreadcrumbList = React.forwardRef(({ children, style, ...props }, ref) => (
  <ol
    ref={ref}
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 6,
      fontSize: 14,
      color: "#6b7280", // muted gray
      ...style,
    }}
    {...props}
  >
    {children}
  </ol>
));
BreadcrumbList.displayName = "BreadcrumbList";

// Breadcrumb item
const BreadcrumbItem = React.forwardRef(({ children, style, ...props }, ref) => (
  <li ref={ref} style={{ display: "inline-flex", alignItems: "center", gap: 6, ...style }} {...props}>
    {children}
  </li>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

// Breadcrumb link
const BreadcrumbLink = React.forwardRef(({ asChild, children, style, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      style={{ textDecoration: "none", color: "#111", cursor: "pointer", transition: "color 0.2s", ...style }}
      {...props}
    >
      {children}
    </Comp>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

// Breadcrumb current page
const BreadcrumbPage = React.forwardRef(({ children, style, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    style={{ fontWeight: "normal", color: "#111", ...style }}
    {...props}
  >
    {children}
  </span>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

// Breadcrumb separator
const BreadcrumbSeparator = ({ children, style, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    style={{ display: "flex", alignItems: "center", ...style }}
    {...props}
  >
    {children || <ChevronRight size={16} />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Breadcrumb ellipsis
const BreadcrumbEllipsis = ({ style, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    style={{
      display: "flex",
      height: 36,
      width: 36,
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
    {...props}
  >
    <MoreHorizontal size={16} />
    <span style={{ position: "absolute", left: -9999 }}>More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
