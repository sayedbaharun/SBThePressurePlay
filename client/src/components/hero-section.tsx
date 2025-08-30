import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Youtube, ChevronDown } from "lucide-react";

export default function HeroSection() {
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
              Where the locker room meets the boardroom — and the future
            </p>
            <p className="text-body-large text-white/70 mb-12">
              Championship mindset × Business mastery × AI innovation
            </p>
          </div>

          {/* Championship CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/episodes">
              <Button 
                size="lg" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
                data-testid="hero-latest-episode"
              >
                <Play className="w-5 h-5 mr-3" />
                Latest Episode
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 rounded-2xl font-medium bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm hover:scale-105"
                data-testid="hero-join-elite-circle"
              >
                Join Elite Circle
              </Button>
            </Link>
          </div>

          {/* Championship Pillars Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "🏆 Elite Performance", 
              "🎯 Strategic Decision Making", 
              "🤖 AI-Powered Optimization", 
              "🌍 Global Leadership"
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
