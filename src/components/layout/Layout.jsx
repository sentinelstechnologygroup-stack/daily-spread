import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SeoHead from "../SeoHead";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-body">
      <Navbar />
      <SeoHead />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
