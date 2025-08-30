import { Star, Quote, Trophy, Building, Lightbulb } from "lucide-react";

const impactStories = [
  {
    quote: "This podcast changed how I approach high-pressure decisions. The champion's mindset framework is now embedded in our C-suite strategy sessions.",
    author: "Sarah Chen",
    role: "Fortune 500 CEO",
    company: "TechGlobal Industries",
    icon: Building,
    rating: 5,
    result: "40% improvement in strategic decision speed"
  },
  {
    quote: "Finally, someone who understands both the boardroom and the pitch. Patrice's insights on pressure management transformed our team's performance in crucial matches.",
    author: "Marcus Rodriguez",
    role: "Premier League Manager", 
    company: "Elite Football Club",
    icon: Trophy,
    rating: 5,
    result: "Championship win following mindset implementation"
  },
  {
    quote: "The AI insights are game-changing for our startup. We've applied the performance optimization principles to scale our team from 10 to 200 people.",
    author: "David Kim",
    role: "Silicon Valley Founder",
    company: "InnovateAI",
    icon: Lightbulb,
    rating: 5,
    result: "$50M Series B funding secured"
  }
];

const metrics = [
  { number: "500+", label: "C-Suite Executives", description: "transformed their leadership approach" },
  { number: "50+", label: "Championship Teams", description: "implemented our methodologies" },
  { number: "25+", label: "Unicorn Startups", description: "scaled using our frameworks" },
  { number: "98%", label: "Success Rate", description: "in pressure performance improvement" }
];

export default function ImpactStoriesSection() {
  return (
    <section className="content-section bg-background">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">Championship Results</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
              Real transformations from leaders who applied the champion's mindset to achieve breakthrough results 
              in business, sports, and innovation.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <div 
                key={metric.label} 
                className="text-center"
                data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="apple-card p-6 hover:scale-105 transition-all duration-300">
                  <div className="text-display-2 font-display brand-text mb-2">
                    {metric.number}
                  </div>
                  <div className="text-caption font-medium text-foreground mb-1">
                    {metric.label}
                  </div>
                  <div className="text-small text-muted-foreground">
                    {metric.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {impactStories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <div 
                  key={story.author}
                  className="apple-card p-8 relative group hover:scale-105 transition-all duration-300"
                  data-testid={`testimonial-${story.author.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="w-8 h-8" />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-body text-foreground/90 mb-6 leading-relaxed">
                    "{story.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-4">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{story.author}</div>
                      <div className="text-small text-muted-foreground">{story.role}</div>
                      <div className="text-small text-muted-foreground/70">{story.company}</div>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="apple-card p-3 bg-primary/5 border-primary/20">
                    <div className="text-small font-medium text-primary">
                      Result: {story.result}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="apple-card p-8 bg-gradient-to-r from-primary/5 to-accent/5 max-w-3xl mx-auto">
              <h3 className="text-headline font-display mb-4">
                Ready to Join the Champions?
              </h3>
              <p className="text-body text-muted-foreground mb-6">
                Transform your approach to pressure, leadership, and performance with proven methodologies 
                from the world's elite performers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-200"
                  data-testid="cta-latest-episode"
                >
                  Listen to Latest Episode
                </button>
                <button 
                  className="px-6 py-3 border border-primary/20 text-primary rounded-xl font-medium hover:bg-primary/10 transition-all duration-200"
                  data-testid="cta-join-elite-circle"
                >
                  Join Elite Circle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}