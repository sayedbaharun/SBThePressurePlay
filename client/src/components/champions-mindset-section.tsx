import { Target, Brain, Zap, Globe } from "lucide-react";

const mindsetPillars = [
  {
    icon: Target,
    title: "Elite Performance Psychology",
    description: "Mental frameworks used by champions to perform under extreme pressure and maintain consistency at the highest levels.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "Strategic Decision Making", 
    description: "Decision-making methodologies that separate elite leaders from the competition in high-stakes environments.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "AI-Powered Optimization",
    description: "Cutting-edge technology integration for performance enhancement and data-driven competitive advantages.",
    color: "text-secondary"
  },
  {
    icon: Globe,
    title: "Global Leadership Insights",
    description: "Leadership principles that scale across cultures, industries, and competitive environments worldwide.",
    color: "text-primary"
  }
];

export default function ChampionsMindsetSection() {
  return (
    <section className="content-section bg-muted/30">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">The Champion's Advantage</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
              What separates champions from competitors? We decode the mindset, strategies, and systems 
              used at the highest levels of sports, business, and innovation.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mindsetPillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <div 
                  key={pillar.title} 
                  className="apple-card p-8 text-center group hover:scale-105 transition-all duration-300"
                  data-testid={`pillar-${pillar.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`w-8 h-8 ${pillar.color}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-headline font-display mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Champion Quote */}
          <div className="mt-16 text-center">
            <div className="apple-card p-8 bg-gradient-to-r from-primary/5 to-accent/5 max-w-4xl mx-auto">
              <blockquote className="text-headline font-display mb-4 text-foreground/90">
                "Pressure is a privilege. It's where champions are made and legends are born."
              </blockquote>
              <cite className="text-caption text-muted-foreground">
                — Patrice Evra, 5x Premier League Champion
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}