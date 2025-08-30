import { Check, Crown, Star, Users, Calendar, Book, Zap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with champion-level insights",
    icon: Users,
    color: "border-border",
    buttonClass: "bg-muted text-muted-foreground hover:bg-muted/80",
    features: [
      "Weekly episode access",
      "Basic performance tips",
      "Community discussions",
      "Monthly newsletter"
    ],
    popular: false
  },
  {
    name: "Elite",
    price: "$19",
    period: "month",
    description: "Accelerate your performance journey",
    icon: Star,
    color: "border-primary/50",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
    features: [
      "Everything in Free",
      "Early episode access (24h ahead)",
      "Monthly Champion's Playbook",
      "Quarterly Q&A with hosts",
      "Performance tracking tools",
      "Elite community access"
    ],
    popular: true
  },
  {
    name: "Champion",
    price: "$99",
    period: "month", 
    description: "Elite-level transformation and access",
    icon: Crown,
    color: "border-accent/50",
    buttonClass: "bg-accent text-accent-foreground hover:bg-accent/90",
    features: [
      "Everything in Elite",
      "Live monthly masterclasses",
      "1-on-1 coaching session (quarterly)",
      "AI-powered performance insights",
      "Exclusive guest interviews",
      "Champion's inner circle access",
      "Speaking event invitations",
      "Custom performance roadmap"
    ],
    popular: false
  }
];

const benefits = [
  {
    icon: MessageCircle,
    title: "Exclusive Q&As",
    description: "Regular live sessions with Patrice & Sayed"
  },
  {
    icon: Book,
    title: "Champion's Playbook",
    description: "Monthly strategy guides and frameworks"
  },
  {
    icon: Calendar,
    title: "Live Events",
    description: "Virtual masterclasses and workshops"
  },
  {
    icon: Zap,
    title: "AI Insights",
    description: "Personalized performance optimization"
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
              <span className="brand-text">Join The Elite Circle</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
              Transform your mindset, strategy, and performance with exclusive access to championship-level 
              insights, tools, and community.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit) => {
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

          {/* Pricing Plans */}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div 
                  key={plan.name}
                  className={`apple-card p-8 relative ${plan.color} ${plan.popular ? 'ring-2 ring-primary/30 scale-105' : ''}`}
                  data-testid={`plan-${plan.name.toLowerCase()}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-small font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-headline font-display mb-2">{plan.name}</h3>
                    <p className="text-small text-muted-foreground mb-4">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-display-2 font-display text-foreground">{plan.price}</span>
                      <span className="text-caption text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5 mr-3" />
                        <span className="text-body text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${plan.buttonClass}`}
                    data-testid={`cta-${plan.name.toLowerCase()}`}
                  >
                    {plan.name === 'Free' ? 'Start Free' : `Join ${plan.name}`}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Guarantee */}
          <div className="text-center mt-16">
            <div className="apple-card p-6 bg-gradient-to-r from-primary/5 to-accent/5 max-w-2xl mx-auto">
              <h3 className="text-headline font-display mb-3">Champion's Guarantee</h3>
              <p className="text-body text-muted-foreground">
                Join risk-free with our 30-day money-back guarantee. If you don't see measurable improvement 
                in your performance mindset, we'll refund every penny.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}