import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Youtube, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-section">
      <div className="container mx-auto px-5 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Simplified Logo */}
          <div className="mb-12 flex justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-gentle-float">
              <span className="text-white text-3xl md:text-4xl font-bold font-display">P</span>
            </div>
          </div>

          {/* Clean Title Hierarchy */}
          <h1 className="text-display-1 font-display mb-6">
            <span className="brand-text">THE PRESSURE PLAY</span>
          </h1>
          
          <p className="text-body-large text-muted-foreground mb-12 max-w-2xl mx-auto">
            Elite conversations on performance, strategy, and innovation. 
            <br className="hidden sm:block" />
            Where pressure creates excellence.
          </p>

          {/* Refined CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/episodes">
              <Button 
                size="lg" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-all duration-200"
                data-testid="hero-listen-latest"
              >
                <Play className="w-5 h-5 mr-3" />
                Latest Episode
              </Button>
            </Link>
            <Link href="/watch">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 rounded-2xl font-medium hover:bg-muted/50 transition-all duration-200"
                data-testid="hero-watch-youtube"
              >
                <Youtube className="w-5 h-5 mr-3" />
                Watch
              </Button>
            </Link>
          </div>

          {/* Simplified Topics Display */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {["AI Innovation", "Leadership", "Performance", "Strategy", "Sports"].map((topic) => (
              <div key={topic} className="apple-card p-4 text-center">
                <span className="text-caption">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-50">
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-pulse" />
      </div>
    </section>
  );
}
