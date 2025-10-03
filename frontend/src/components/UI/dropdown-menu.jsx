import React, { useState, forwardRef } from "react";

// ----------------- Dropdown -----------------
export const Dropdown = ({ children, open, onOpenChange }) => {
  return open ? (
    <div style={{ position: "relative" }}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, onOpenChange })
      )}
    </div>
  ) : null;
};

// ----------------- Dropdown Trigger -----------------
export const DropdownTrigger = ({ children, onClick }) => (
  <button onClick={onClick} style={{ cursor: "pointer" }}>
    {children}
  </button>
);

// ----------------- Dropdown Content -----------------
export const DropdownContent = forwardRef(({ children, style }, ref) => (
  <div
    ref={ref}
    style={{
      position: "absolute",
      top: "100%",
      left: 0,
      marginTop: 4,
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: 6,
      padding: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 1000,
      ...style,
    }}
  >
    {children}
  </div>
));
DropdownContent.displayName = "DropdownContent";

// ----------------- Dropdown Item -----------------
export const DropdownItem = ({ children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "6px 12px",
      cursor: "pointer",
      borderRadius: 4,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {children}
  </div>
);

// ----------------- Example Usage -----------------
export default function DropdownExample() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <DropdownTrigger onClick={() => setOpen(!open)}>Open Menu</DropdownTrigger>

      <Dropdown open={open} onOpenChange={setOpen}>
        <DropdownContent>
          <DropdownItem onClick={() => alert("Option 1 clicked")}>Option 1</DropdownItem>
          <DropdownItem onClick={() => alert("Option 2 clicked")}>Option 2</DropdownItem>
          <DropdownItem onClick={() => alert("Option 3 clicked")}>Option 3</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
