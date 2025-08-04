import { useState, useEffect } from "react";
import { CheckSquare, Calendar, BarChart3, Moon, Zap, ArrowRight, Star, Github, Linkedin, Mail } from "lucide-react";
import HeroSection from "../components/Welcome/HeroSection";
import FeatureSection from "../components/Welcome/FeatureSection";
import AboutSection from "../components/Welcome/AboutSection";
import CtaSection from "../components/Welcome/CtaSection";

export default function WelcomePage() {

  return (
    <>
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Preview Section */}
        <FeatureSection />

        {/* About Section + Developer Info */}
        <AboutSection />

        {/* Call To Action Section */}
        <CtaSection />     
    </>
  );
}
