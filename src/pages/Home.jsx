import React from "react";
import HeroSection from "../components/home/HeroSection";
import CateringFeature from "../components/home/CateringFeature";
import SpecialMeals from "../components/home/SpecialMeals";
import MenuPreview from "../components/home/MenuPreview";
import GalleryStrip from "../components/home/GalleryStrip";
import TrustSection from "../components/home/TrustSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CateringFeature />
      <SpecialMeals />
      <MenuPreview />
      <GalleryStrip />
      <TrustSection />
    </>
  );
}