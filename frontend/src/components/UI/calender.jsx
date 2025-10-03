import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Basic default styles

// Calendar wrapper component
export function Calendar({ style, ...props }) {
  return (
    <div style={{ padding: 12, maxWidth: 320, ...style }}>
      <DayPicker {...props} />
    </div>
  );
}

Calendar.displayName = "Calendar";

// Example usage
export default function SafeMindCalendarDemo() {
  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Select a Date:</h2>
      <Calendar />
    </div>
  );
}
