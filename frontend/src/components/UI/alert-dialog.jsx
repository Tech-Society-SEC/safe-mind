import React, { useState } from "react";

export default function ConfirmLogout() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        Logout
      </button>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              maxWidth: 400,
              width: "90%",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Are you sure you want to log out?
            </h2>
            <p style={{ marginBottom: 20 }}>
              You will need to log back in to access your SafeMind dashboard.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  alert("Logged out!");
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
