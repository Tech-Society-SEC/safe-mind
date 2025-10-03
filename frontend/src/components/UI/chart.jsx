import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ----------------- Chart Container -----------------
export function ChartContainer({ children, width = "100%", height = 300, style }) {
  return (
    <div
      style={{
        width,
        height,
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 8,
        backgroundColor: "#f9f9f9",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ----------------- Tooltip -----------------
const ChartTooltipContent = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: 8,
        borderRadius: 4,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {payload.map((item) => (
        <div key={item.dataKey} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{item.name || item.dataKey}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

// ----------------- Example Usage -----------------
export default function SafeMindChartDemo() {
  const data = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 70 },
  ];

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
