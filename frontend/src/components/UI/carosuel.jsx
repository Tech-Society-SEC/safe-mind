import React, { useRef } from "react";

// ----------------- Carousel Component -----------------
export function Carousel({ children, style }) {
  const containerRef = useRef(null);

  const scrollPrev = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollNext = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", ...style }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 16,
          padding: 16,
        }}
      >
        {children}
      </div>
      <button
        onClick={scrollPrev}
        style={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        &lt;
      </button>
      <button
        onClick={scrollNext}
        style={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        &gt;
      </button>
    </div>
  );
}

// ----------------- Carousel Item -----------------
export function CarouselItem({ style, children }) {
  return (
    <div
      style={{
        minWidth: 300,
        minHeight: 150,
        flexShrink: 0,
        backgroundColor: "#3b82f6",
        color: "white",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ----------------- Example Usage -----------------
export default function SafeMindCarouselDemo() {
  return (
    <div style={{ padding: 40 }}>
      <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>
        SafeMind Carousel
      </h2>
      <Carousel>
        <CarouselItem>Slide 1</CarouselItem>
        <CarouselItem style={{ backgroundColor: "#6b7280" }}>Slide 2</CarouselItem>
        <CarouselItem style={{ backgroundColor: "#dc2626" }}>Slide 3</CarouselItem>
      </Carousel>
    </div>
  );
}
