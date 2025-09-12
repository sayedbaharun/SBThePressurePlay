import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Star,
  Shield,
  Zap,
  Crown
} from "lucide-react";
import type { NewsletterSubscriber } from "@shared/schema";
import executiveImage from "@assets/generated_images/Executive_leadership_portrait_1a759e03.png";

const benefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Champion Insights",
    description: "Weekly strategies for high-pressure performance"
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "Exclusive Content",
    description: "Behind-the-scenes insights from champions"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Performance Tips",
    description: "Weekly strategies from our guests and research team"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Ad-Free Experience",
    description: "Premium content without interruptions"
  }
];

const pastEditions = [
  {
    title: "The AI Leadership Playbook",
    date: "Dec 15, 2024",
    topics: ["AI Strategy", "Leadership", "Innovation"],
    excerpt: "How top executives are integrating AI into their decision-making processes..."
  },
  {
    title: "Olympic Mindset: Mental Resilience",
    date: "Dec 8, 2024", 
    topics: ["Performance", "Psychology", "Sports"],
    excerpt: "Exclusive insights from Olympic champions on building unbreakable mental toughness..."
  },
  {
    title: "Future of Work: Remote Leadership",
    date: "Dec 1, 2024",
    topics: ["Leadership", "Remote Work", "Productivity"],
    excerpt: "How Fortune 500 CEOs are reinventing leadership for distributed teams..."
  }
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscribers = [] } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/newsletter/subscribers"],
    enabled: false, // Don't auto-fetch subscriber data for privacy
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to The Elite Circle! 🎉",
        description: "Check your email to confirm your subscription and get your welcome bonus.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate(email);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              The Elite Circle
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join 50,000+ high achievers who get exclusive insights, early episode access, 
              and performance strategies delivered to their inbox every week.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="flex items-center space-x-1 justify-center mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-bold text-lg">50K+</span>
                </div>
                <span className="text-sm text-muted-foreground">Subscribers</span>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 justify-center mb-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-lg">4.9</span>
                </div>
                <span className="text-sm text-muted-foreground">Rating</span>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 justify-center mb-1">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-bold text-lg">Weekly</span>
                </div>
                <span className="text-sm text-muted-foreground">Delivery</span>
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <Card className="mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
              <img
                src={executiveImage}
                alt=""
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background"></div>
            </div>
            
            <CardContent className="p-8 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 font-display">
                    Join The Elite Circle
                  </h2>
                  <p className="text-muted-foreground">
                    Get started with exclusive content and insights from industry leaders.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    data-testid="newsletter-email-input"
                  />
                  <Button
                    type="submit"
                    disabled={subscribeMutation.isPending}
                    size="lg"
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
                    data-testid="newsletter-subscribe-button"
                  >
                    {subscribeMutation.isPending ? "Subscribing..." : "Join Now"}
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                    Free to join • Unsubscribe anytime • No spam, ever
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              What You'll Get
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-primary flex-shrink-0">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              What Subscribers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "The weekly insights have transformed how I approach leadership challenges. 
                    The content is always actionable and backed by real experience."
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-muted-foreground">VP of Strategy, TechCorp</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "Getting episodes early plus the exclusive content makes this newsletter 
                    invaluable. Worth its weight in gold for any high performer."
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold">Marcus Rodriguez</p>
                    <p className="text-muted-foreground">Olympic Coach</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    "The performance strategies and guest insights have been game-changing 
                    for my business. Highly recommend to any serious entrepreneur."
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold">David Kim</p>
                    <p className="text-muted-foreground">Founder & CEO</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Privacy & Terms */}
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Privacy & Terms
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  ✓ We respect your privacy and will never share your email address with third parties.
                </p>
                <p>
                  ✓ You can unsubscribe at any time with one click.
                </p>
                <p>
                  ✓ We send one email per week, typically on Sundays.
                </p>
                <p>
                  ✓ All content is original and exclusive to newsletter subscribers.
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                <a href="/contact" className="text-primary hover:underline">Contact Us</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
