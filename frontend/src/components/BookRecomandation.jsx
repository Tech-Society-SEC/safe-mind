import React, { useState } from "react";
import { Star, BookOpen, ExternalLink, Heart } from "lucide-react";

// Dummy Card and Button components (replace with your own)
const Card = ({ children, style }) => (
  <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, backgroundColor: "#fff", ...style }}>
    {children}
  </div>
);

const Button = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ padding: "6px 12px", cursor: "pointer", ...style }}>
    {children}
  </button>
);

const Badge = ({ children, style }) => (
  <span style={{ backgroundColor: "#eee", padding: "2px 6px", borderRadius: 4, fontSize: 12, ...style }}>
    {children}
  </span>
);

const categories = ["All", "Mindfulness", "Self-Help", "Psychology", "Wellness", "Motivation"];

const books = [
  {
    id: 1,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Mindfulness",
    rating: 4.8,
    description: "A guide to spiritual enlightenment through present-moment awareness",
    cover: "📖",
    readingTime: "6 hours",
    saved: true,
    keyPoints: [
      "Live in the present moment",
      "Understand the nature of thought",
      "Find inner peace through awareness"
    ]
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    rating: 4.9,
    description: "Tiny changes that create remarkable results in building good habits",
    cover: "⚛️",
    readingTime: "8 hours",
    saved: false,
    keyPoints: [
      "Start with 1% improvements",
      "Focus on systems over goals",
      "Make habits obvious and attractive"
    ]
  }
  // add more books as needed...
];

export function BookRecommendations() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedBooks, setSavedBooks] = useState(books.filter(b => b.saved).map(b => b.id));

  const filteredBooks = books.filter(
    book => selectedCategory === "All" || book.category === selectedCategory
  );

  const toggleSaveBook = (id) => {
    setSavedBooks(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ margin: 20 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold" }}>Book Recommendations</h2>
        <p>Discover books that can support your mental health journey</p>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {categories.map(cat => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              backgroundColor: selectedCategory === cat ? "#007bff" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#000",
              border: "1px solid #007bff",
              borderRadius: 4
            }}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Books Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
        {filteredBooks.map(book => (
          <Card key={book.id}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 80 }}>
                {book.cover}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h3 style={{ margin: 0, fontWeight: "bold" }}>{book.title}</h3>
                    <p style={{ margin: 0, fontSize: 12 }}>{book.author}</p>
                  </div>
                  <Button onClick={() => toggleSaveBook(book.id)} style={{ backgroundColor: "transparent", border: "none" }}>
                    <Heart fill={savedBooks.includes(book.id) ? "red" : "none"} />
                  </Button>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Star fill="gold" />
                    <span>{book.rating}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <BookOpen />
                    <span>{book.readingTime}</span>
                  </div>
                  <Badge>{book.category}</Badge>
                </div>

                <p style={{ fontSize: 12, marginTop: 8 }}>{book.description}</p>

                <div style={{ marginTop: 8 }}>
                  <p style={{ fontSize: 12, fontWeight: "bold", margin: "4px 0" }}>Key Points:</p>
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {book.keyPoints.map((kp, idx) => (
                      <li key={idx} style={{ fontSize: 12 }}>{kp}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <Button>
                    <BookOpen /> Read Summary
                  </Button>
                  <Button style={{ border: "1px solid #007bff", backgroundColor: "#fff", color: "#007bff" }}>
                    <ExternalLink />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Saved Books */}
      {savedBooks.length > 0 && (
        <Card style={{ marginTop: 20, backgroundColor: "#f0f8ff" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
            <Heart fill="red" /> Your Reading List ({savedBooks.length} books)
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {books.filter(b => savedBooks.includes(b.id)).map(b => (
              <Card key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}>
                <span>{b.cover}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 12 }}>{b.title}</p>
                  <p style={{ margin: 0, fontSize: 10 }}>{b.author}</p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
