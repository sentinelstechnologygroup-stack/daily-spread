import React from "react";

export default function SectionHeading({ eyebrow, title, description, centered = true, light = false }) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} mb-10 md:mb-14`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${
          light ? "text-primary-foreground/60" : "text-primary"
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${
          light ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}