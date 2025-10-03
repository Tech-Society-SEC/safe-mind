import React, { useState, useRef, useEffect } from "react";
import { Send, Smile, Paperclip } from "lucide-react";

// Minimal Card, Button, Input, Avatar components (replace if you have your own)
const Card = ({ children, style }) => (
  <div style={{ borderRadius: 16, padding: 0, background: "#f5f7fa", display: "flex", flexDirection: "column", height: "100%", ...style }}>
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
      background: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      borderRadius: 12,
      ...style
    }}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, onKeyPress, placeholder, style }) => (
  <textarea
    value={value}
    onChange={onChange}
    onKeyPress={onKeyPress}
    placeholder={placeholder}
    style={{
      width: "100%",
      minHeight: 44,
      padding: "8px 40px 8px 12px",
      borderRadius: 22,
      border: "1px solid #ccc",
      resize: "none",
      fontSize: 14,
      ...style
    }}
  />
);

const Avatar = ({ children, style }) => (
  <div style={{
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#007bff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    ...style
  }}>
    {children}
  </div>
);

export function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hello! I'm here to support you today. How are you feeling?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse = {
        id: (Date.now() + 1).toString(),
        content: "I understand. Thank you for sharing that with me. Would you like to talk more about how you're feeling, or would you prefer to try a mood tracking exercise?",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card style={{ height: "100%" }}>
      {/* Chat header */}
      <div style={{ padding: 16, borderBottom: "1px solid #ccc", display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar>WC</Avatar>
        <div>
          <h2 style={{ margin: 0, fontWeight: "bold" }}>SafeMind Assistant</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#666" }}>Always here to listen and support</p>
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div style={{
              maxWidth: "70%",
              borderRadius: 20,
              padding: "8px 12px",
              background: msg.sender === "user" ? "#007bff" : "#fff",
              color: msg.sender === "user" ? "#fff" : "#000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              <p style={{ margin: 0, fontSize: 14 }}>{msg.content}</p>
              <p style={{
                marginTop: 4,
                fontSize: 10,
                color: msg.sender === "user" ? "#e0f0ff" : "#999"
              }}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{ padding: 16, borderTop: "1px solid #ccc", display: "flex", alignItems: "flex-end", gap: 8 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Input
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
          />
          <div style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 4 }}>
            <Button>
              <Paperclip size={16} />
            </Button>
            <Button>
              <Smile size={16} />
            </Button>
          </div>
        </div>
        <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} style={{ background: "#007bff", color: "#fff", borderRadius: 22, width: 44, height: 44 }}>
          <Send size={16} />
        </Button>
      </div>
    </Card>
  );
}
