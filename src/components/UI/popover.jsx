// PopoverExample.jsx
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function PopoverExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center mt-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button>Click me</Button>
        </PopoverTrigger>

        <PopoverContent>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">Popover Title</h4>
            <p className="text-xs text-muted-foreground">
              This is some content inside the popover. You can put buttons, links, or any custom elements here.
            </p>
            <button
              className="mt-2 rounded-md bg-primary px-3 py-1 text-sm text-white hover:bg-primary/80"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
