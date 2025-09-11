import HeroSection from "@/components/hero-section";
import PresenterTeaser from "@/components/presenter-teaser";
import EliteCircleSection from "@/components/elite-circle-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Co-Founders Teaser */}
      <PresenterTeaser />
      
      {/* 3. Elite Circle Newsletter */}
      <EliteCircleSection />
    </div>
  );
}
