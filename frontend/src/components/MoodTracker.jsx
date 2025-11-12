import React, { useState, useEffect, useRef } from "react";
import { Calendar, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moods = [
  { emoji: "😊", label: "Great", value: 5 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "🙁", label: "Low", value: 2 },
  { emoji: "😢", label: "Difficult", value: 1 },
];

const Card = ({ children, style }) => (
  <div
    style={{
      borderRadius: 12,
      padding: 16,
      background: "#fff",
      border: "1px solid #ddd",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Button = ({ children, onClick, disabled, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      border: "none",
      padding: "8px 12px",
      borderRadius: 6,
      background: "#3b82f6",
      color: "#fff",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      transition: "all 0.2s",
      ...(disabled ? { opacity: 0.5 } : {}),
      ...style,
    }}
  >
    {children}
  </button>
);

const Textarea = ({ value, onChange, placeholder, style }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      minHeight: 100,
      padding: 8,
      borderRadius: 6,
      border: "1px solid #ccc",
      resize: "none",
      fontSize: 14,
      ...style,
    }}
  />
);

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState(() => {
    // ✅ Load from localStorage immediately on component mount
    try {
      const saved = localStorage.getItem("moodEntries");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showTrends, setShowTrends] = useState(false);
  const [loading, setLoading] = useState(false);
  const entriesEndRef = useRef(null);

  // 💾 Save moods to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  // 👇 Auto-scroll to bottom when new entry is added
  useEffect(() => {
    entriesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const handleSaveMood = () => {
    if (selectedMood !== null) {
      setLoading(true);
      const newEntry = {
        id: Date.now(), // unique id
        date: new Date().toLocaleDateString(),
        mood: moods.find((m) => m.value === selectedMood)?.label,
        note,
      };

      setTimeout(() => {
        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        setSelectedMood(null);
        setNote("");
        setLoading(false);
        alert("Mood saved successfully!");
      }, 800);
    }
  };

  const moodChartData = entries
    .map((entry) => ({
      date: entry.date,
      moodValue: moods.find((m) => m.label === entry.mood)?.value || 0,
    }))
    .reverse();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        height: "100vh",
        overflowY: "auto",
        padding: 16,
        background: "#f8fafc",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>
          How are you feeling today?
        </h2>
        <p style={{ color: "#666" }}>Track your mood and reflect on your day</p>
      </div>

      {/* Mood Selection */}
      <Card style={{ background: "#f0f4f8" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {moods.map((mood) => (
            <Button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              style={{
                flex: "1 1 18%",
                flexDirection: "column",
                height: 80,
                fontSize: 14,
                border:
                  selectedMood === mood.value
                    ? "2px solid #3b82f6"
                    : "2px solid #ccc",
                background: selectedMood === mood.value ? "#dbeafe" : "#fff",
                color: selectedMood === mood.value ? "#1e40af" : "#000",
                fontWeight: "bold",
              }}
            >
              <span style={{ fontSize: 24 }}>{mood.emoji}</span>
              {mood.label}
            </Button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ fontWeight: "bold" }}>
            Add a note about your day (optional)
          </label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What made you feel this way?"
          />
        </div>

        <Button
          onClick={handleSaveMood}
          disabled={selectedMood === null || loading}
          style={{ width: "100%", marginTop: 16 }}
        >
          {loading ? "Saving..." : "Save Mood Entry"}
        </Button>
      </Card>

      {/* Recent Entries */}
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <Calendar size={16} />
          <h3 style={{ fontWeight: "bold", margin: 0 }}>Recent Entries</h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: 250,
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          {entries.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#666",
                fontStyle: "italic",
                margin: "20px 0",
              }}
            >
              No moods saved yet.
            </p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: "flex",
                  gap: 8,
                  padding: 8,
                  borderRadius: 8,
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    minWidth: 80,
                    fontWeight: "bold",
                    color: "#3b82f6",
                  }}
                >
                  {entry.date}
                </div>
                <div>
                  <div style={{ fontWeight: "bold" }}>{entry.mood}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{entry.note}</div>
                </div>
              </div>
            ))
          )}
          <div ref={entriesEndRef} />
        </div>

        <Button
          style={{
            marginTop: 16,
            width: "100%",
            background: "#fff",
            color: "#3b82f6",
            border: "1px solid #3b82f6",
          }}
          onClick={() => setShowTrends(!showTrends)}
        >
          <TrendingUp size={16} />{" "}
          {showTrends ? "Hide Mood Trends" : "View Mood Trends"}
        </Button>

        {showTrends && entries.length > 0 && (
          <div style={{ marginTop: 16, height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="moodValue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
}
