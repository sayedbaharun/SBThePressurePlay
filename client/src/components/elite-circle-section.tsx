import { Check, Mail, Users, Trophy, Brain, Zap, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

const newsletterBenefits = [
  {
    icon: Trophy,
    title: "Parallel Pressure Insights",
    description: "How athletes & CEOs handle identical moments"
  },
  {
    icon: Mail,
    title: "Cross-Arena Strategies", 
    description: "Boardroom tactics that work in locker rooms & vice versa"
  },
  {
    icon: Brain,
    title: "Behind Both Scenes",
    description: "Exclusive stories from both worlds"
  },
  {
    icon: Zap,
    title: "AI Game Changers",
    description: "How technology is transforming both arenas"
  }
];

const socialProof: { number: string; label: string }[] = [];

const testimonials = [
  {
    quote: "Sayed's strategic framework combined with Patrice's championship insights transformed our entire leadership approach",
    author: "Sarah Chen, Fortune 500 CEO"
  },
  {
    quote: "Finally, a platform where world-class strategy meets authentic championship experience. Both Sayed and Patrice bring unique value", 
    author: "Marcus Rodriguez, Premier League Manager"
  },
  {
    quote: "The combination of Sayed's methodology and Patrice's real-world experience is unmatched",
    author: "Jennifer Kumar, Venture Capitalist"
  }
];

export default function EliteCircleSection() {
  return (
    <section className="content-section bg-muted/30">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">Master Pressure Like a Champion</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto mb-8">
              Patrice and Sayed - Free Download: "The Champion's Pressure Playbook"<br />
              Patrice Evra's 10 strategies for performing under pressure - from Old Trafford to the boardroom
            </p>
            
            {/* Social Proof Stats */}
            <div className="flex justify-center items-center gap-8 mb-8">
              {socialProof.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-headline font-display brand-text">{stat.number}</div>
                  <div className="text-small text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {newsletterBenefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={benefit.title}
                  className="text-center"
                  data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-caption font-medium mb-2">{benefit.title}</h3>
                  <p className="text-small text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Main Newsletter Signup */}
          <div className="apple-card p-8 mb-16 bg-gradient-to-r from-primary/5 to-accent/5 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-display-1 font-display mb-4">Get Champion-Level Insights Weekly</h3>
              <p className="text-body text-muted-foreground mb-6">
                Join thousands of entrepreneurs, executives, and innovators who start their week with Elite Circle insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <Input 
                  type="email" 
                  placeholder="Enter your email to join the elite"
                  className="flex-1"
                  data-testid="newsletter-email-input"
                />
                <Link href="/newsletter">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl font-medium whitespace-nowrap"
                    data-testid="newsletter-signup-button"
                  >
                    Join Free Today
                  </Button>
                </Link>
              </div>
              
              <p className="text-small text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            </div>

            {/* What You Get */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span className="text-body">🏆 Weekly "Pressure Points" - Champion mindset insights</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span className="text-body">🎯 Exclusive champion strategies and insights</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span className="text-body">💡 Exclusive guest quotes and bonus content</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span className="text-body">🤖 AI performance tips and future insights</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span className="text-body">📈 Business strategy breakdowns from champions</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                  <span className="text-body">🎙️ Behind-the-scenes stories from Patrice & Sayed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Preview */}
          <div className="mb-16">
            <h3 className="text-headline font-display text-center mb-8">This Week's Elite Circle Insights</h3>
            <div className="apple-card p-6 max-w-3xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-caption font-medium mb-2">🏆 Pressure Point #47: "The Strategic Champion's Mindset"</h4>
                  <p className="text-body text-muted-foreground mb-3">
                    Sayed reveals the neuroscience behind pressure performance, while Patrice shares how he applied these principles in crucial Champions League moments. Plus: 3 AI tools that amplify champion-level decision making.
                  </p>
                  <p className="text-small text-muted-foreground/70 mb-4 italic">
                    By Sayed Baharun & Patrice Evra
                  </p>
                  <Link href="/newsletter">
                    <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                      Join Elite Circle to read full insights →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Magnet */}
          <div className="apple-card p-8 mb-16 bg-gradient-to-r from-accent/5 to-primary/5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                <Download className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-headline font-display mb-2">Free Download: "The Champion's Pressure Playbook"</h3>
                <p className="text-body text-muted-foreground mb-4">
                  Patrice Evra's 10 strategies for performing under pressure - from Old Trafford to the boardroom
                </p>
                <Link href="/newsletter">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-xl font-medium">
                    Get Free Playbook + Join Elite Circle
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-headline font-display text-center mb-8">What Our Community Says</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="apple-card p-6">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-body text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-small font-medium">
                    {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Building Focus */}
          <div className="text-center">
            <div className="apple-card p-8 bg-gradient-to-r from-primary/5 to-accent/5 max-w-3xl mx-auto">
              <h3 className="text-headline font-display mb-4">Building a Global Community of Champions</h3>
              <p className="text-body text-muted-foreground mb-6">
                We're creating the world's largest community of high-performers who apply championship mindset to business and life. 
                Join thousands of entrepreneurs, executives, and innovators who never miss our weekly insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/newsletter">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Join High Achievers Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Invite Fellow Champions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}