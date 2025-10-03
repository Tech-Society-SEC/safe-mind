import React, { useState } from "react";

// ----------------- Context Menu Base -----------------
export const ContextMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };

  const handleClick = () => setOpen(false);

  return (
    <div onContextMenu={handleContextMenu} onClick={handleClick} style={{ display: "inline-block" }}>
      {children({ open, position, close: () => setOpen(false) })}
    </div>
  );
};

// ----------------- Menu Content -----------------
export const ContextMenuContent = ({ open, position, children }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 4,
        minWidth: 150,
        zIndex: 9999,
        boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </div>
  );
};

// ----------------- Menu Item -----------------
export const ContextMenuItem = ({ children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "6px 12px",
      cursor: "pointer",
      borderRadius: 4,
      fontSize: 14,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {children}
  </div>
);

// ----------------- Checkbox Item -----------------
export const ContextMenuCheckboxItem = ({ children, checked, onChange }) => (
  <ContextMenuItem onClick={() => onChange(!checked)}>
    <span style={{ marginRight: 8 }}>{checked ? "☑" : "☐"}</span>
    {children}
  </ContextMenuItem>
);

// ----------------- Radio Item -----------------
export const ContextMenuRadioItem = ({ children, selected, onSelect }) => (
  <ContextMenuItem onClick={onSelect}>
    <span style={{ marginRight: 8 }}>{selected ? "●" : "○"}</span>
    {children}
  </ContextMenuItem>
);

// ----------------- Submenu -----------------
export const ContextMenuSub = ({ label, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <ContextMenuItem>{label} ▶</ContextMenuItem>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: 4,
            minWidth: 120,
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// ----------------- Example -----------------
export default function ContextMenuExample() {
  const [showHidden, setShowHidden] = useState(true);
  const [sort, setSort] = useState("asc");

  return (
    <ContextMenu>
      {({ open, position, close }) => (
        <>
          <div
            style={{
              width: 200,
              height: 80,
              border: "1px solid #ccc",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            Right Click Me
          </div>

          <ContextMenuContent open={open} position={position}>
            <ContextMenuItem onClick={() => alert("Open clicked")}>Open</ContextMenuItem>
            <ContextMenuItem onClick={() => alert("Rename clicked")}>Rename</ContextMenuItem>
            <hr />
            <ContextMenuCheckboxItem checked={showHidden} onChange={setShowHidden}>
              Show Hidden Files
            </ContextMenuCheckboxItem>
            <ContextMenuRadioItem selected={sort === "asc"} onSelect={() => setSort("asc")}>
              Sort Ascending
            </ContextMenuRadioItem>
            <ContextMenuRadioItem selected={sort === "desc"} onSelect={() => setSort("desc")}>
              Sort Descending
            </ContextMenuRadioItem>
            <ContextMenuSub label="More Options">
              <ContextMenuItem onClick={() => alert("Share")}>Share</ContextMenuItem>
              <ContextMenuItem onClick={() => alert("Move")}>Move</ContextMenuItem>
            </ContextMenuSub>
          </ContextMenuContent>
        </>
      )}
    </ContextMenu>
  );
}
