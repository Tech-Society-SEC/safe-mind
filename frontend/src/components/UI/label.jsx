// label.jsx
import React from "react";

export const Label = ({ children, htmlFor, error = false, className = "", ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium ${error ? "text-destructive" : "text-foreground"} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
