// SafeMindInput.jsx
import React from "react";
import { Input } from "@/components/UI/input";

export default function Input({ label, description, error, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className={`text-sm font-medium ${error ? "text-destructive" : "text-foreground"}`}>
        {label}
      </label>}
      
      <Input {...props} className={`${error ? "border-destructive focus:ring-destructive" : ""}`} />
      
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

// Usage Example
/*
<SafeMindInput
  type="text"
  label="Username"
  placeholder="Enter your username"
  description="This will be visible to others"
  error={formErrors.username}
/>
*/
