import React, { createContext, useContext, useState, useMemo, useCallback, forwardRef } from "react";
import { cn } from "./utils";
import { PanelLeft } from "lucide-react";

// Sidebar Context
const SidebarContext = createContext(null);

// Hook to use Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

// Sidebar Provider
export const SidebarProvider = forwardRef(({ children, defaultOpen = true, className, style }, ref) => {
  const [open, setOpen] = useState(defaultOpen);

  const toggleSidebar = useCallback(() => setOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggleSidebar,
    }),
    [open, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn("flex h-screen flex-col bg-gray-100 transition-all duration-300", className)}
        style={{ width: open ? "16rem" : "4rem", ...style }}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
});

// Sidebar Toggle Button
export const SidebarTrigger = forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      ref={ref}
      onClick={toggleSidebar}
      className={cn("p-2 m-2 bg-blue-500 text-white rounded flex items-center justify-center", className)}
      {...props}
    >
      <PanelLeft />
    </button>
  );
});

// Sidebar Content wrapper
export const SidebarContent = forwardRef(({ children, className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col flex-1 p-2 overflow-y-auto", className)} {...props}>
    {children}
  </div>
));

// Sidebar Item
export const SidebarItem = forwardRef(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-2 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
