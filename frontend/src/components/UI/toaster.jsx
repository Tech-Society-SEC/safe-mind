import React, { useState, useCallback } from "react";

// --- Simple Toast System ---
let pushToast; // reference to trigger new toasts

export function Toaster() {
  const [toasts, setToasts] = useState([]);

  // Provide pushToast functionality
  pushToast = useCallback(
    ({ title, description }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, description }]);

      // Remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [setToasts]
  );

  return (
    <div style={{
      position: "fixed",
      bottom: "16px",
      right: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      zIndex: 9999
    }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            backgroundColor: "#333",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            minWidth: "200px",
          }}
        >
          {t.title && <strong style={{ display: "block", marginBottom: "4px" }}>{t.title}</strong>}
          {t.description && <div>{t.description}</div>}
        </div>
      ))}
    </div>
  );
}

// --- Function you can call anywhere ---
export function toast({ title, description }) {
  if (pushToast) {
    pushToast({ title, description });
  } else {
    console.warn("Toaster is not mounted yet.");
  }
}
