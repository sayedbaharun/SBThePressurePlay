import HeroSection from "@/components/hero-section";
import ContentPillarsSection from "@/components/content-pillars-section";
import LatestEpisodeSection from "@/components/latest-episode-section";
import GuestSpotlightSection from "@/components/guest-spotlight-section";
import CountdownSection from "@/components/countdown-section";
import SocialProofSection from "@/components/social-proof-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <ContentPillarsSection />
      <LatestEpisodeSection />
      <GuestSpotlightSection />
      <CountdownSection />
      <SocialProofSection />
    </div>
  );
}
