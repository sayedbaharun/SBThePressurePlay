import HeroSection from "@/components/hero-section";
import VibeShifter from "@/components/vibe-shifter";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <VibeShifter />

      {/* Hero Section - Pre-launch focused */}
      <HeroSection />
    </div>
  );
}
