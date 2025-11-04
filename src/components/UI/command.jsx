import React, { useState } from "react";

// ----------------- Command Base -----------------
export const Command = ({ children, style, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 6,
        background: "#fff",
        color: "#111",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// ----------------- Command Dialog -----------------
export const CommandDialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 400,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: 0,
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ----------------- Command Input -----------------
export const CommandInput = ({ placeholder, value, onChange, style }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        padding: "8px 12px",
        gap: 8,
        ...style,
      }}
    >
      <span style={{ opacity: 0.5 }}>🔍</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: 14,
          background: "transparent",
        }}
      />
    </div>
  );
};

// ----------------- Example Usage -----------------
export default function CommandExample() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "8px 16px",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Open Command
      </button>

      <CommandDialog open={open} onClose={() => setOpen(false)}>
        <Command>
          <CommandInput
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div style={{ padding: 12 }}>
            <p>Result for: {query || "..."}</p>
          </div>
        </Command>
      </CommandDialog>
    </div>
  );
}
