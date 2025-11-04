import React, { useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Great", value: 5, color: { background: "#d1fae5", color: "#065f46", border: "2px solid #10b981" } },
  { emoji: "🙂", label: "Good", value: 4, color: { background: "#dbeafe", color: "#1e40af", border: "2px solid #3b82f6" } },
  { emoji: "😐", label: "Okay", value: 3, color: { background: "#fef9c3", color: "#78350f", border: "2px solid #facc15" } },
  { emoji: "🙁", label: "Low", value: 2, color: { background: "#ffedd5", color: "#c2410c", border: "2px solid #f97316" } },
  { emoji: "😢", label: "Difficult", value: 1, color: { background: "#fee2e2", color: "#b91c1c", border: "2px solid #f87171" } },
];

const recentEntries = [
  { date: "Today", mood: "Good", note: "Had a productive day at work" },
  { date: "Yesterday", mood: "Great", note: "Spent time with friends" },
  { date: "2 days ago", mood: "Okay", note: "Feeling a bit stressed about deadlines" },
];

const Card = ({ children, style }) => (
  <div style={{
    borderRadius: 12,
    padding: 16,
    background: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    ...style
  }}>
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
      gap: 4,
      transition: "all 0.2s",
      ...(disabled ? { opacity: 0.5 } : {}),
      ...style
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
      ...style
    }}
  />
);

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const handleSaveMood = () => {
    if (selectedMood !== null) {
      console.log("Saving mood:", { mood: selectedMood, note, date: new Date() });
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>How are you feeling today?</h2>
        <p style={{ color: "#666" }}>Track your mood and reflect on your day</p>
      </div>

      {/* Mood Selection */}
      <Card style={{ background: "#f0f4f8" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          {moods.map((mood) => (
            <Button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              style={{
                flex: 1,
                flexDirection: "column",
                height: 80,
                fontSize: 14,
                border: selectedMood === mood.value ? "2px solid #3b82f6" : "2px solid #ccc",
                background: selectedMood === mood.value ? mood.color.background : "#fff",
                color: selectedMood === mood.value ? mood.color.color : "#000",
                fontWeight: "bold",
              }}
            >
              <span style={{ fontSize: 24 }}>{mood.emoji}</span>
              {mood.label}
            </Button>
          ))}
        </div>

        {/* Note Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <label style={{ fontWeight: "bold" }}>Add a note about your day (optional)</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What made you feel this way? Any thoughts you'd like to remember..."
          />
        </div>

        <Button
          onClick={handleSaveMood}
          disabled={selectedMood === null}
          style={{ width: "100%" }}
        >
          Save Mood Entry
        </Button>
      </Card>

      {/* Recent Entries */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Calendar size={16} />
          <h3 style={{ fontWeight: "bold", margin: 0 }}>Recent Entries</h3>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {recentEntries.map((entry, index) => (
            <div key={index} style={{ display: "flex", gap: 8, padding: 8, borderRadius: 8, background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <div style={{ minWidth: 80, fontWeight: "bold", color: "#3b82f6" }}>{entry.date}</div>
              <div>
                <div style={{ fontWeight: "bold" }}>{entry.mood}</div>
                <div style={{ fontSize: 12, color: "#666" }}>{entry.note}</div>
              </div>
            </div>
          ))}
        </div>

        <Button style={{ marginTop: 16, width: "100%", background: "#fff", color: "#3b82f6", border: "1px solid #3b82f6" }}>
          <TrendingUp size={16} /> View Mood Trends
        </Button>
      </Card>
    </div>
  );
}