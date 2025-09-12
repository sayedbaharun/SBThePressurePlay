import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useABTest } from "@/hooks/useABTest";

export default function HeroSection() {
  // A/B test different CTA copy versions
  const heroCtaVariant = useABTest({
    testName: 'hero_cta_copy',
    variants: [
      { id: 'original', text: 'Join Free Newsletter' },
      { id: 'champion', text: 'Get Champion Insights Free' },
      { id: 'elite', text: 'Join Elite Circle Now' },
      { id: 'playbook', text: 'Get Free Pressure Playbook' },
      { id: 'strategies', text: 'Access Championship Strategies' },
    ],
    persistInSession: true
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/wz1r_VJaJZw?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playlist=wz1r_VJaJZw"
            title="The Pressure Play Hero Video"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              width: '100vw',
              height: '100vh',
              transform: 'scale(1.1)',
              pointerEvents: 'none'
            }}
            allow="autoplay; encrypted-media"
          />
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Simplified Logo */}
          <div className="mb-12 flex justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-gentle-float shadow-2xl">
              <span className="text-white text-3xl md:text-4xl font-bold font-display">P</span>
            </div>
          </div>

          {/* Championship Title Hierarchy */}
          <h1 className="text-display-1 font-display mb-6 text-white">
            <span className="text-white">THE PRESSURE PLAY</span>
          </h1>
          
          <div className="mb-8">
            <p className="text-headline text-white/90 mb-4 font-medium">
              Same pressure, different arena
            </p>
            <p className="text-body-large text-white/70 mb-8">
              Where locker room champions and boardroom leaders discover they're fighting the same battles
            </p>
            
            {/* Co-Founders Introduction */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-3xl mx-auto mb-12">
              <h3 className="text-caption font-medium text-white/90 mb-4">Bridging Two Worlds, One Mindset</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-body font-medium text-white">Sayed Baharun</div>
                  <div className="text-small text-white/70">Boardroom Champion & AI Pioneer</div>
                </div>
                <div className="text-white/60 font-bold text-xl">×</div>
                <div className="text-center">
                  <div className="text-body font-medium text-white">Patrice Evra</div>
                  <div className="text-small text-white/70">Locker Room Legend & Business Leader</div>
                </div>
              </div>
            </div>
          </div>

          {/* Championship CTA Button */}
          <div className="flex justify-center mb-16">
            <Link href="/newsletter">
              <Button 
                size="xl" 
                variant="magnetic"
                className="px-12 py-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl"
                data-testid="hero-join-newsletter"
              >
                {heroCtaVariant?.text || 'Join Free Newsletter'}
              </Button>
            </Link>
          </div>

          {/* Parallel Pressure Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "🏆 Clutch Moments", 
              "⚡ High-Stakes Decisions", 
              "🤖 AI Game Changers", 
              "🔄 Parallel Worlds"
            ].map((pillar) => (
              <div key={pillar} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-200 hover:scale-105">
                <span className="text-caption text-white/90 font-medium">{pillar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70">
        <ChevronDown className="w-5 h-5 text-white animate-pulse" />
      </div>
    </section>
  );
}
