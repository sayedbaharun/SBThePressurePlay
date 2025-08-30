import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Play, Youtube, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const topics = ["AI Innovation", "Leadership Excellence", "High Performance", "Business Strategy", "Championship Mindset"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200" 
          alt="Professional podcast studio" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Podcast Cover Art */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden neon-border animate-float">
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white text-4xl md:text-6xl font-bold font-display">P</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-30 animate-glow"></div>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-display">
            <span className="gradient-text">THE PRESSURE PLAY</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            High-impact conversations blending elite performance, business strategy, AI innovation, and championship sports. 
            Where pressure creates diamonds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/episodes">
              <Button 
                size="lg" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                data-testid="hero-listen-latest"
              >
                <Play className="w-5 h-5 mr-2" />
                Listen to Latest Episode
              </Button>
            </Link>
            <Link href="/watch">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all duration-300"
                data-testid="hero-watch-youtube"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Watch on YouTube
              </Button>
            </Link>
          </div>

          {/* Rolling Topics Marquee */}
          <div className="overflow-hidden bg-muted/30 rounded-full py-3 backdrop-blur-sm">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...topics, ...topics].map((topic, index) => (
                <span key={index} className="mx-8 text-muted-foreground">
                  {topic}
                  {index < topics.length * 2 - 1 && <span className="mx-8">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
}
