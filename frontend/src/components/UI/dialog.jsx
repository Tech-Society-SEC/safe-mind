import React, { useState, forwardRef } from "react";

// ----------------- Dialog -----------------
export const Dialog = ({ open, onOpenChange, children }) => {
  return open ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, onOpenChange })
      )}
    </div>
  ) : null;
};

// ----------------- Dialog Overlay -----------------
export const DialogOverlay = ({ open, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
      }}
    />
  );
};

// ----------------- Dialog Content -----------------
export const DialogContent = forwardRef(({ children, onClose }, ref) => (
  <div
    ref={ref}
    style={{
      position: "relative",
      background: "#fff",
      borderRadius: 8,
      padding: 20,
      maxWidth: 500,
      width: "100%",
      zIndex: 101,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    }}
  >
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
DialogContent.displayName = "DialogContent";

// ----------------- Dialog Header -----------------
export const DialogHeader = ({ children, style }) => (
  <div style={{ marginBottom: 16, ...style }}>{children}</div>
);

// ----------------- Dialog Footer -----------------
export const DialogFooter = ({ children, style }) => (
  <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8, ...style }}>
    {children}
  </div>
);

// ----------------- Dialog Title -----------------
export const DialogTitle = forwardRef(({ children, style }, ref) => (
  <h2 ref={ref} style={{ margin: 0, fontSize: 20, fontWeight: 600, ...style }}>
    {children}
  </h2>
));
DialogTitle.displayName = "DialogTitle";

// ----------------- Dialog Description -----------------
export const DialogDescription = forwardRef(({ children, style }, ref) => (
  <p ref={ref} style={{ fontSize: 14, color: "#555", margin: 0, ...style }}>
    {children}
  </p>
));

// ----------------- Example Usage -----------------
export default function DialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Dialog</button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay onClick={() => setOpen(false)} />
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>SafeMind Modal</DialogTitle>
            <DialogDescription>This is a simple modal description.</DialogDescription>
          </DialogHeader>

          <div>
            <p>Put any content here, like text, forms, or images.</p>
          </div>

          <DialogFooter>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4 }}>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
