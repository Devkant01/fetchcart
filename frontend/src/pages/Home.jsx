// src/pages/Home.jsx
import React from "react";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import CategoriesPreview from "../components/home/CategoriesPreview";
import HowItWorks from "../components/home/HowItWorks";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen ">
      {/* Full width parent; center inner content at 85% */}
      <div className="w-full flex justify-center">
        <div className="w-[85%]">
          <Hero />
          <Features />
          {/* <CategoriesPreview /> */}
          <HowItWorks />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}
