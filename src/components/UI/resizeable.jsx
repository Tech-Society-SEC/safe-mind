// ResizableExample.jsx
import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function ResizableExample() {
  return (
    <div className="h-screen w-full p-4">
      <ResizablePanelGroup className="h-full" direction="horizontal">
        <ResizablePanel className="bg-blue-100 flex-1 p-4">
          <h3 className="font-semibold">Left Panel</h3>
          <p>Content goes here...</p>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel className="bg-green-100 flex-1 p-4">
          <h3 className="font-semibold">Right Panel</h3>
          <p>More content goes here...</p>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
