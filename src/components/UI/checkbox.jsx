import React, { useState, forwardRef } from "react";

// Simple Checkbox component
const Checkbox = forwardRef(({ checked, onChange, disabled, style, ...props }, ref) => {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        disabled={disabled}
        style={{
          width: 16,
          height: 16,
          border: "1px solid #4f46e5",
          borderRadius: 3,
          display: "inline-block",
          verticalAlign: "middle",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        {...props}
      />
      <span style={{ fontSize: 14, userSelect: "none" }}>Accept terms and conditions</span>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

// ----------------- Example Usage -----------------
export default function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={setChecked}
      />
      <p>Checkbox is {checked ? "checked" : "unchecked"}</p>
    </div>
  );
}

export { Checkbox };
