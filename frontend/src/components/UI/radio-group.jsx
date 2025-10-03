// RadioGroupExample.jsx
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupExample() {
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <div className="flex flex-col gap-4 w-64 mx-auto mt-20">
      <h3 className="text-center font-medium">Choose an Option</h3>
      
      <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="option1" />
          Option 1
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="option2" />
          Option 2
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <RadioGroupItem value="option3" />
          Option 3
        </label>
      </RadioGroup>

      <p className="text-center mt-2 text-sm text-muted-foreground">
        Selected: {selectedValue}
      </p>
    </div>
  );
}
