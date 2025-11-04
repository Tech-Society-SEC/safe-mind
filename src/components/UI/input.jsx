// input.jsx
import React from "react";
import { Label } from "./label";

export const Input = React.forwardRef(
  ({ label, htmlFor, error = false, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        {label && <Label htmlFor={htmlFor} error={!!error}>{label}</Label>}
        <input
          id={htmlFor}
          ref={ref}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? "border-destructive" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {error && typeof error === "string" && (
          <span className="text-sm text-destructive mt-1">{error}</span>
        )}
      </div>
    );
  }
);
