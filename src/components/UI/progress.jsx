// ProgressExample.jsx
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function ProgressExample() {
  const [progress, setProgress] = useState(0);

  // Simulate progress increment
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-80 mx-auto mt-20 flex flex-col gap-4">
      <h3 className="text-center font-medium">Progress Example</h3>
      
      <Progress value={progress} className="h-4 rounded-lg bg-gray-200" />

      <div className="flex justify-between text-sm font-medium">
        <span>0%</span>
        <span>{progress}%</span>
        <span>100%</span>
      </div>

      <Button onClick={() => setProgress(0)}>Reset Progress</Button>
    </div>
  );
}
