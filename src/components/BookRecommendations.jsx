import React from "react";

export default function BookRecommendations() {
  const books = [
    {
      title: "The Happiness Trap",
      author: "Russ Harris",
      description:
        "Learn practical strategies to manage anxiety and stress using ACT therapy.",
      link: "https://www.goodreads.com/book/show/44276.The_Happiness_Trap",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      description:
        "Small habits that create big changes for productivity and happiness.",
      link: "https://www.goodreads.com/book/show/40121378-atomic-habits",
    },
    {
      title: "The Power of Now",
      author: "Eckhart Tolle",
      description:
        "A guide to mindfulness and living in the present moment.",
      link: "https://www.goodreads.com/book/show/6708.The_Power_of_Now",
    },
    {
      title: "Feeling Good: The New Mood Therapy",
      author: "David D. Burns",
      description:
        "Cognitive Behavioral Therapy (CBT) techniques to fight depression and negative thinking.",
      link: "https://www.goodreads.com/book/show/46674.Feeling_Good",
    },
  ];

  return (
    <div className="p-6 bg-transparent min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        📚 SafeRead – Book Recommendations
      </h1>
      <p className="text-gray-700 mb-6">
        Here are some books that promote emotional balance, mindfulness, and mental health.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600">
              {book.title}
            </h2>
            <p className="text-gray-500 mb-2">by {book.author}</p>
            <p className="text-gray-700 mb-3">{book.description}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
