import React, { useState } from "react";
import { Phone, MessageCircle, Plus, Trash2, Shield, Clock } from "lucide-react";

// Minimal Card, Button, Input, Badge components
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
      padding: "6px 12px",
      borderRadius: 6,
      background: "#007bff",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      gap: 4,
      ...style
    }}
  >
    {children}
  </button>
);

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
      ...style
    }}
  />
);

const Badge = ({ children, style }) => (
  <span style={{
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    ...style
  }}>
    {children}
  </span>
);

const emergencyContacts = [
  { id: 1, name: "Dr. Sarah Wilson", relationship: "Therapist", phone: "+1 (555) 123-4567", notes: "Available for crisis sessions", priority: 'high', available24h: false },
  { id: 2, name: "Mom", relationship: "Family", phone: "+1 (555) 987-6543", notes: "Always available for support", priority: 'high', available24h: true },
  { id: 3, name: "Alex Chen", relationship: "Best Friend", phone: "+1 (555) 456-7890", notes: "Great listener, knows my situation", priority: 'medium', available24h: false },
  { id: 4, name: "Crisis Hotline", relationship: "Professional Support", phone: "988", notes: "24/7 suicide & crisis lifeline", priority: 'high', available24h: true }
];

const professionalResources = [
  { name: "National Suicide Prevention Lifeline", phone: "988", description: "Free, confidential support 24/7" },
  { name: "Crisis Text Line", phone: "Text HOME to 741741", description: "Free, 24/7 support via text message" },
  { name: "SAMHSA Helpline", phone: "1-800-662-4357", description: "Treatment referral service" }
];

export function EmergencyContacts() {
  const [contacts, setContacts] = useState(emergencyContacts);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", relationship: "", phone: "", notes: "", priority: 'medium', available24h: false });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { id: Date.now(), ...newContact }]);
      setNewContact({ name: "", relationship: "", phone: "", notes: "", priority: 'medium', available24h: false });
      setIsAddingContact(false);
    }
  };

  const deleteContact = (id) => setContacts(contacts.filter(c => c.id !== id));

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high': return { background: "#fee2e2", color: "#b91c1c", border: "1px solid #fca5a5" };
      case 'medium': return { background: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" };
      case 'low': return { background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" };
      default: return { background: "#f3f4f6", color: "#374151", border: "1px solid #d1d5db" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>Emergency Contacts</h2>
        <p style={{ color: "#666" }}>Quick access to your support network when you need it most</p>
      </div>

      {/* Professional Resources */}
      <Card style={{ background: "#ffe4e6", border: "1px solid #fecaca" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Shield size={16} color="#b91c1c" />
          <h3 style={{ fontWeight: "bold", color: "#991b1b", margin: 0 }}>Immediate Crisis Support</h3>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {professionalResources.map((res, i) => (
            <Card key={i} style={{ flex: "1 1 200px", background: "#fff", border: "1px solid #fecaca" }}>
              <h4 style={{ margin: "0 0 4px 0", fontWeight: "bold", color: "#991b1b" }}>{res.name}</h4>
              <p style={{ margin: "0 0 8px 0", fontSize: 12, color: "#b91c1c" }}>{res.description}</p>
              <Button onClick={() => window.open(`tel:${res.phone.replace(/\D/g, '')}`)}>
                <Phone size={12} /> {res.phone}
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Personal Contacts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: "bold" }}>Personal Support Network</h3>
          <Button onClick={() => setIsAddingContact(!isAddingContact)} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Plus size={12} /> Add Contact
          </Button>
        </div>

        {/* Add Contact Form */}
        {isAddingContact && (
          <Card>
            <h4 style={{ fontWeight: "bold", marginBottom: 8 }}>Add New Contact</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Input placeholder="Name" value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} />
              <Input placeholder="Relationship" value={newContact.relationship} onChange={e => setNewContact({ ...newContact, relationship: e.target.value })} />
              <Input placeholder="Phone Number" value={newContact.phone} onChange={e => setNewContact({ ...newContact, phone: e.target.value })} />
              <select value={newContact.priority} onChange={e => setNewContact({ ...newContact, priority: e.target.value })} style={{ padding: 6, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 }}>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <Input placeholder="Notes (optional)" value={newContact.notes} onChange={e => setNewContact({ ...newContact, notes: e.target.value })} style={{ flex: "1 1 100%" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <input type="checkbox" checked={newContact.available24h} onChange={e => setNewContact({ ...newContact, available24h: e.target.checked })} />
              <label style={{ fontSize: 12 }}>Available 24/7</label>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button onClick={addContact}>Add Contact</Button>
              <Button onClick={() => setIsAddingContact(false)} style={{ background: "#fff", color: "#007bff", border: "1px solid #007bff" }}>Cancel</Button>
            </div>
          </Card>
        )}

        {/* Contact List */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {contacts.map(c => (
            <Card key={c.id} style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div>
                  <h4 style={{ fontWeight: "bold", margin: 0 }}>{c.name}</h4>
                  <p style={{ margin: 0, fontSize: 12, color: "#666" }}>{c.relationship}</p>
                </div>
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <Badge style={getPriorityStyle(c.priority)}>{c.priority}</Badge>
                  {c.available24h && <Badge style={{ border: "1px solid #007bff", color: "#007bff" }}><Clock size={12} /> 24/7</Badge>}
                </div>
              </div>
              {c.notes && <p style={{ fontStyle: "italic", fontSize: 12, color: "#666", marginBottom: 8 }}>"{c.notes}"</p>}
              <div style={{ display: "flex", gap: 4 }}>
                <Button onClick={() => window.open(`tel:${c.phone}`)} style={{ flex: 1 }}> <Phone size={12} /> Call </Button>
                <Button onClick={() => window.open(`sms:${c.phone}`)} style={{ flex: 1, background: "#fff", color: "#007bff", border: "1px solid #007bff" }}> <MessageCircle size={12} /> </Button>
                <Button onClick={() => deleteContact(c.id)} style={{ background: "#fff", color: "#ff4d4f", border: "1px solid #ff4d4f" }}> <Trash2 size={12} /> </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
