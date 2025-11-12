import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Plus, Trash2, Shield, Clock } from "lucide-react";

// 🔹 Reusable Card component
const Card = ({ children, style }) => (
  <div
    style={{
      borderRadius: 12,
      padding: 16,
      background: "#fff",
      border: "1px solid #e0e0e0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      ...style,
    }}
  >
    {children}
  </div>
);

// 🔹 Reusable Blue Button component
const Button = ({ children, onClick, disabled, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      border: "none",
      padding: "8px 14px",
      borderRadius: 8,
      background: "#4285F4", // 💙 Main blue color
      color: "#fff",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      gap: 6,
      transition: "background 0.2s",
      ...style,
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#2f6ae6")}
    onMouseOut={(e) => (e.currentTarget.style.background = "#4285F4")}
  >
    {children}
  </button>
);

// 🔹 Reusable Input component
const Input = ({ value, onChange, placeholder, style }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #ccc",
      fontSize: 14,
      ...style,
    }}
  />
);

// 🔹 Badge (priority label)
const Badge = ({ children, style }) => (
  <span
    style={{
      padding: "2px 6px",
      borderRadius: 4,
      fontSize: 10,
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      ...style,
    }}
  >
    {children}
  </span>
);

// 🔹 Default Indian emergency + personal contacts
const defaultContacts = [
  { id: 1, name: "Parent", relationship: "Family", phone: "+91 9876543210", notes: "Always available for emergencies", priority: "high", available24h: true },
  { id: 2, name: "Close Friend", relationship: "Friend", phone: "+91 9123456789", notes: "Knows my situation well", priority: "medium", available24h: false },
  { id: 3, name: "Local Police", relationship: "Emergency Service", phone: "100", notes: "Emergency helpline", priority: "high", available24h: true },
  { id: 4, name: "Ambulance", relationship: "Emergency Service", phone: "102", notes: "Call for medical emergencies", priority: "high", available24h: true },
  { id: 5, name: "Women Helpline", relationship: "Support", phone: "1091", notes: "For women safety", priority: "high", available24h: true },
  { id: 6, name: "Mental Health Helpline (KIRAN)", relationship: "Support Helpline", phone: "1800-599-0019", notes: "Mental health & emotional support (24x7)", priority: "high", available24h: true },
];

// 🔹 Component
export default function EmergencyContacts() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : defaultContacts;
  });
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    notes: "",
    priority: "medium",
    available24h: false,
  });

  // Save contacts to localStorage on change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { id: Date.now(), ...newContact }]);
      setNewContact({
        name: "",
        relationship: "",
        phone: "",
        notes: "",
        priority: "medium",
        available24h: false,
      });
      setIsAddingContact(false);
    }
  };

  const deleteContact = (id) => setContacts(contacts.filter((c) => c.id !== id));

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return {
          background: "#e3f2fd",
          color: "#1565c0",
          border: "1px solid #90caf9",
        };
      case "medium":
        return {
          background: "#fef3c7",
          color: "#b45309",
          border: "1px solid #fde68a",
        };
      case "low":
        return {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #bbf7d0",
        };
      default:
        return {
          background: "#f3f4f6",
          color: "#374151",
          border: "1px solid #d1d5db",
        };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4, color: "#1E40AF" }}>
          Emergency Contacts
        </h2>
        <p style={{ color: "#666" }}>
          Quick access to your trusted support network when you need it most
        </p>
      </div>

      {/* Personal Support Network */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "#1E3A8A" }}>Personal Support Network</h3>
          <Button onClick={() => setIsAddingContact(!isAddingContact)}>
            <Plus size={14} /> Add Contact
          </Button>
        </div>

        {/* Add Contact Form */}
        {isAddingContact && (
          <Card>
            <h4 style={{ fontWeight: "bold", marginBottom: 8, color: "#1E40AF" }}>
              Add New Contact
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <Input
                placeholder="Relationship"
                value={newContact.relationship}
                onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              />
              <Input
                placeholder="Phone Number"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
              <select
                value={newContact.priority}
                onChange={(e) => setNewContact({ ...newContact, priority: e.target.value })}
                style={{
                  padding: 6,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                  fontSize: 14,
                }}
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <Input
                placeholder="Notes (optional)"
                value={newContact.notes}
                onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                style={{ flex: "1 1 100%" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <input
                type="checkbox"
                checked={newContact.available24h}
                onChange={(e) =>
                  setNewContact({ ...newContact, available24h: e.target.checked })
                }
              />
              <label style={{ fontSize: 12 }}>Available 24/7</label>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button onClick={addContact}>Add Contact</Button>
              <Button
                onClick={() => setIsAddingContact(false)}
                style={{
                  background: "#fff",
                  color: "#4285F4",
                  border: "1px solid #4285F4",
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Contact List */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {contacts.map((c) => (
            <Card key={c.id} style={{ flex: "1 1 300px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div>
                  <h4 style={{ fontWeight: "bold", margin: 0, color: "#1E3A8A" }}>{c.name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{c.relationship}</p>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <Badge style={getPriorityStyle(c.priority)}>{c.priority}</Badge>
                  {c.available24h && (
                    <Badge style={{ border: "1px solid #4285F4", color: "#4285F4" }}>
                      <Clock size={12} /> 24/7
                    </Badge>
                  )}
                </div>
              </div>
              {c.notes && (
                <p
                  style={{
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 8,
                  }}
                >
                  "{c.notes}"
                </p>
              )}
              <div style={{ display: "flex", gap: 4 }}>
                <Button onClick={() => window.open(`tel:${c.phone}`)} style={{ flex: 1 }}>
                  <Phone size={12} /> Call
                </Button>
                <Button
                  onClick={() => window.open(`sms:${c.phone}`)}
                  style={{
                    flex: 1,
                    background: "#fff",
                    color: "#4285F4",
                    border: "1px solid #4285F4",
                  }}
                >
                  <MessageCircle size={12} />
                </Button>
                <Button
                  onClick={() => deleteContact(c.id)}
                  style={{
                    background: "#fff",
                    color: "#ff4d4f",
                    border: "1px solid #ff4d4f",
                  }}
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
