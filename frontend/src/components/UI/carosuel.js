import React, { useState, useEffect, useCallback, useContext } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ----------------- Carousel Context -----------------
const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

// ----------------- Carousel Component -----------------
export const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback(() => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, [api]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    const handleKeyDown = useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) return;
      onSelect();
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => api.off("select", onSelect);
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation: orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

// ----------------- Carousel Content -----------------
export const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// ----------------- Carousel Item -----------------
export const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-shrink-0 flex-col gap-4 p-4",
        orientation === "horizontal" ? "min-w-[300px]" : "min-h-[300px]",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// ----------------- Example Usage -----------------
export default function SafeMindCarouselDemo() {
  return (
    <div className="p-10">
      <h2 className="mb-4 text-lg font-semibold">SafeMind Carousel</h2>
      <Carousel className="overflow-hidden border rounded-lg p-4">
        <CarouselContent>
          <CarouselItem className="bg-primary text-white rounded-lg flex items-center justify-center h-40">
            Slide 1
          </CarouselItem>
          <CarouselItem className="bg-secondary text-white rounded-lg flex items-center justify-center h-40">
            Slide 2
          </CarouselItem>
          <CarouselItem className="bg-destructive text-white rounded-lg flex items-center justify-center h-40">
            Slide 3
          </CarouselItem>
        </CarouselContent>
        <div className="absolute top-1/2 left-2">
          <Button onClick={() => useCarousel()?.scrollPrev()}>&lt;</Button>
        </div>
        <div className="absolute top-1/2 right-2">
          <Button onClick={() => useCarousel()?.scrollNext()}>&gt;</Button>
        </div>
      </Carousel>
    </div>
  );
}
