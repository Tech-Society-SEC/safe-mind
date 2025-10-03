import React, { useState } from "react";

export default function Accordion() {
  const [openItem, setOpenItem] = useState(null);

  const faqs = [
    {
      question: "What is SafeMind?",
      answer:
        "SafeMind is a mental health platform designed to provide IT employees with support, including a dedicated helpline, SafeSpace app, and wellness resources.",
    },
    {
      question: "How does it work?",
      answer:
        "Employees can reach out via the helpline or app to get instant support, track mental wellness, and access professional resources confidentially.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>SafeMind FAQ</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            marginBottom: 10,
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => toggleItem(index)}
            style={{
              padding: 12,
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              fontWeight: "bold",
            }}
          >
            {faq.question}
          </div>
          {openItem === index && (
            <div style={{ padding: 12, backgroundColor: "white" }}>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}
