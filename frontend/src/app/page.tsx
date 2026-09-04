import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionsGrid } from "@/components/marketing/SolutionsGrid";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { WhyAlapSection } from "@/components/marketing/WhyAlapSection";
import { TargetIndustriesSection } from "@/components/marketing/TargetIndustriesSection";
import { RealProblemsSpotlight } from "@/components/marketing/RealProblemsSpotlight";
import { FinalCTASection } from "@/components/marketing/FinalCTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      {/* Global Responsive Navigation Header */}
      <Navbar />

      {/* Main Marketing Homepage Content */}
      <main id="main-content" className="flex-1 mx-auto max-w-7xl px-6 py-8 space-y-20">
        <HeroSection />
        <hr className="border-border" />
        <ProblemSection />
        <hr className="border-border" />
        <SolutionsGrid />
        <hr className="border-border" />
        <HowItWorksSection />
        <hr className="border-border" />
        <WhyAlapSection />
        <hr className="border-border" />
        <TargetIndustriesSection />
        <hr className="border-border" />
        <RealProblemsSpotlight />
        <hr className="border-border" />
        <FinalCTASection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
