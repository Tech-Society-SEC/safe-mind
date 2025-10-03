// ScrollExample.jsx
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ScrollExample() {
  return (
    <div className="h-screen w-full p-4">
      <ScrollArea className="h-64 w-96 border rounded-md">
        <div className="space-y-4 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="bg-gray-100 p-2 rounded-md">
              Item {i + 1}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
