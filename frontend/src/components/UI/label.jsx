// SafeMindLabel.jsx
import React from "react";
import { Label } from "@/components/ui/label";

export default function SafeMindLabel({ children, htmlFor, error, className, ...props }) {
  return (
    <Label
      htmlFor={htmlFor}
      className={`${error ? "text-destructive" : ""} ${className}`}
      {...props}
    >
      {children}
    </Label>
  );
}

// Usage Example
/*
<SafeMindLabel htmlFor="username" error={formErrors.username}>
  Username
</SafeMindLabel>
*/
