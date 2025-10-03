// src/components/Toaster.jsx
import React, { useState, useEffect } from "react";

// Global reference to push toasts
let pushToastRef;

// Toast container
export function Toaster() {
  const [toasts, setToasts] = useState([]);

  // Function to push a toast
  pushToastRef = ({ title, description, duration = 3000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description }]);

    // Remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column-reverse",
      gap: "10px",
      zIndex: 1000
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: "#333",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          minWidth: "200px"
        }}>
          {t.title && <strong>{t.title}</strong>}
          {t.description && <div>{t.description}</div>}
        </div>
      ))}
    </div>
  );
}

// Function to trigger a toast anywhere
export function toast({ title, description, duration }) {
  if (pushToastRef) {
    pushToastRef({ title, description, duration });
  } else {
    console.warn("Toaster is not mounted yet.");
  }
}
