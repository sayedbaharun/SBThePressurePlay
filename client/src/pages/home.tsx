import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";
import StickyNav from "@/components/sticky-nav";
import BentoEpisodes from "@/components/bento-episodes";
import SponsorMarquee from "@/components/sponsor-marquee";
import InnerCircle from "@/components/inner-circle";
import GearLocker from "@/components/gear-locker";
import StickyAudioPlayer from "@/components/sticky-audio-player";
import VibeShifter from "@/components/vibe-shifter";
import SocialProofWall from "@/components/social-proof-wall";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <StickyNav />
      <VibeShifter />
      <SocialProofWall />
      
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Episode Vault - Bento Grid */}
      <BentoEpisodes />
      
      {/* 3. Sponsor Marquee */}
      <SponsorMarquee />
      
      {/* 4. Sticky Audio Player */}
      <StickyAudioPlayer />
    </div>
  );
}
