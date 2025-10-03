import React, { useState } from "react";

// ----------------- Collapsible Component -----------------
export default function CollapsibleExample() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: 300, border: "1px solid #ccc", borderRadius: 6 }}>
      {/* Trigger */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          cursor: "pointer",
          background: "#f9f9f9",
          borderBottom: open ? "1px solid #ccc" : "none",
        }}
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontWeight: 500 }}>More Details</span>
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </div>

      {/* Content */}
      {open && (
        <div
          style={{
            padding: "8px 12px",
            fontSize: 14,
            background: "#fff",
          }}
        >
          This is some hidden content inside the collapsible. You can put text,
          images, or any other components here.
        </div>
      )}
    </div>
  );
}

// ----------------- Optional Exports for consistency -----------------
export const Collapsible = ({ children }) => <div>{children}</div>;
export const CollapsibleTrigger = ({ children, onClick }) => (
  <div onClick={onClick}>{children}</div>
);
export const CollapsibleContent = ({ children }) => <div>{children}</div>;
