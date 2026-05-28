import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGalleryStrip({ images }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-6 lg:px-8 py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((img, i) => (
          <div key={i} className="shrink-0 w-72 md:w-80 aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}