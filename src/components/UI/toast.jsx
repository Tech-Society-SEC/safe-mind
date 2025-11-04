import React, { useState, useRef, forwardRef, useEffect } from "react";

// Toast provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const pushRef = useRef(null);

  pushRef.current = ({ title, description, type = "default", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  };

  return (
    <>
      {children}
      <ToastViewport toasts={toasts} />
    </>
  );
};

// Toast viewport
const ToastViewport = ({ toasts }) => {
  const getBgColor = (type) => {
    switch (type) {
      case "destructive": return "#f44336";
      case "default": return "#fff";
      default: return "#333";
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case "destructive": return "#fff";
      case "default": return "#000";
      default: return "#fff";
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column-reverse",
      gap: "10px",
      zIndex: 1000,
      maxWidth: "300px"
    }}>
      {toasts.map((t) => (
        <Toast key={t.id} title={t.title} description={t.description} type={t.type} />
      ))}
    </div>
  );
};

// Single Toast
const Toast = ({ title, description, type }) => (
  <div style={{
    backgroundColor: type === "destructive" ? "#f44336" : "#fff",
    color: type === "destructive" ? "#fff" : "#000",
    padding: "12px 16px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    minWidth: "200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}>
    <div>
      {title && <strong>{title}</strong>}
      {description && <div>{description}</div>}
    </div>
    <ToastClose />
  </div>
);

// Close button
const ToastClose = () => (
  <button onClick={(e) => {
    const toast = e.target.closest("div");
    if (toast) toast.remove();
  }} style={{
    background: "transparent",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px"
  }}>×</button>
);

// Global function to trigger a toast
let pushToastGlobal = null;
export function toast({ title, description, type, duration }) {
  if (pushToastGlobal) pushToastGlobal({ title, description, type, duration });
  else console.warn("Toaster is not mounted yet.");
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => { pushToastGlobal = ({ title, description, type, duration = 3000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }}, []);
  return { toasts, pushToast: pushToastGlobal };
}
