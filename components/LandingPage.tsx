"use client";

import { useEffect } from "react";
import Categories from "./Categories";
import CTASection from "./CTASection";
import DataSection from "./DataSection";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import ProblemBand from "./ProblemBand";
import TrustSection from "./TrustSection";

export default function LandingPage() {
  useEffect(() => {
    // Intersection observer for scroll reveals
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemBand />
        <Categories />
        <HowItWorks />
        <DataSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
