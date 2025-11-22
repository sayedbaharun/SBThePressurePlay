import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import BentoEpisodes from "@/components/bento-episodes";
import SponsorMarquee from "@/components/sponsor-marquee";
import VibeShifter from "@/components/vibe-shifter";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <VibeShifter />
      
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Episode Vault - Bento Grid */}
      <BentoEpisodes />
      
      {/* 3. Sponsor Marquee */}
      <SponsorMarquee />
    </div>
  );
}
