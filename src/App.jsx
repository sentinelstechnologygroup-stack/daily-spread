import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "@/pages/Gallery.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}