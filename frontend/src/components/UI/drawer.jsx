import React, { useState, forwardRef } from "react";

// ----------------- Drawer -----------------
export const Drawer = ({ open, onOpenChange, children }) => {
  return open ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, onOpenChange })
      )}
    </div>
  ) : null;
};

// ----------------- Drawer Overlay -----------------
export const DrawerOverlay = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 900,
    }}
  />
);

// ----------------- Drawer Content -----------------
export const DrawerContent = forwardRef(({ children, onClose }, ref) => (
  <div
    ref={ref}
    style={{
      position: "relative",
      background: "#fff",
      borderRadius: "10px 10px 0 0",
      width: "100%",
      maxWidth: 500,
      padding: 20,
      boxShadow: "0 -5px 20px rgba(0,0,0,0.2)",
      zIndex: 1001,
    }}
  >
    <div
      style={{
        margin: "0 auto 10px auto",
        height: 4,
        width: 60,
        borderRadius: 2,
        backgroundColor: "#ccc",
      }}
    />
    {children}
    <button
      onClick={onClose}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        background: "transparent",
        border: "none",
        fontSize: 18,
        cursor: "pointer",
      }}
      aria-label="Close"
    >
      ×
    </button>
  </div>
));
DrawerContent.displayName = "DrawerContent";

// ----------------- Drawer Header -----------------
export const DrawerHeader = ({ children, style }) => (
  <div style={{ marginBottom: 16, textAlign: "center", ...style }}>{children}</div>
);

// ----------------- Drawer Footer -----------------
export const DrawerFooter = ({ children, style }) => (
  <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8, ...style }}>
    {children}
  </div>
);

// ----------------- Drawer Title -----------------
export const DrawerTitle = forwardRef(({ children, style }, ref) => (
  <h2 ref={ref} style={{ margin: 0, fontSize: 20, fontWeight: 600, ...style }}>
    {children}
  </h2>
));
DrawerTitle.displayName = "DrawerTitle";

// ----------------- Drawer Description -----------------
export const DrawerDescription = forwardRef(({ children, style }, ref) => (
  <p ref={ref} style={{ margin: 0, fontSize: 14, color: "#555", ...style }}>
    {children}
  </p>
));

// ----------------- Example Usage -----------------
export default function DrawerExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Drawer</button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerOverlay onClick={() => setOpen(false)} />
        <DrawerContent onClose={() => setOpen(false)}>
          <DrawerHeader>
            <DrawerTitle>SafeMind Drawer</DrawerTitle>
            <DrawerDescription>This is a simple drawer description.</DrawerDescription>
          </DrawerHeader>

          <div>
            <p>Put any content here like text, forms, or images.</p>
          </div>

          <DrawerFooter>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4 }}>
              Confirm
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
