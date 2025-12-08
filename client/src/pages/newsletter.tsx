import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
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
import ReferralShareModal from "@/components/referral-share-modal";

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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [subscriberData, setSubscriberData] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check for referral code in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      // Store in localStorage for persistence
      localStorage.setItem("tpp_referral_code", ref);
      setReferralCode(ref);
    } else {
      // Check localStorage for existing referral code
      const storedRef = localStorage.getItem("tpp_referral_code");
      if (storedRef) {
        setReferralCode(storedRef);
      }
    }
  }, []);

  const { data: subscribers = [] } = useQuery<NewsletterSubscriber[]>({
    queryKey: ["/api/newsletter/subscribers"],
    enabled: false, // Don't auto-fetch subscriber data for privacy
  });

  const subscribeMutation = useMutation({
    mutationFn: async (formData: { email: string; name: string; phone?: string; country?: string; referredBy?: string }) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", formData);
      return response.json();
    },
    onSuccess: (data) => {
      setSubscriberData(data.subscriber);
      setShowShareModal(true);
      setEmail("");
      setName("");
      setPhone("");
      setCountry("");

      // Clear referral code from localStorage after successful signup
      localStorage.removeItem("tpp_referral_code");

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
    if (!email || !name) return;

    const subscriptionData: any = {
      email,
      name,
      phone: phone || undefined,
      country: country || undefined
    };

    if (referralCode) {
      subscriptionData.referredBy = referralCode;
    }

    subscribeMutation.mutate(subscriptionData);
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
              Join our growing community of high achievers who get exclusive insights, early episode access,
              and performance strategies delivered to their inbox every week.
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="flex items-center space-x-1 justify-center mb-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-bold text-lg">Free</span>
                </div>
                <span className="text-sm text-muted-foreground">Forever</span>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 justify-center mb-1">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span className="font-bold text-lg">Weekly</span>
                </div>
                <span className="text-sm text-muted-foreground">Delivery</span>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-1 justify-center mb-1">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="font-bold text-lg">No Spam</span>
                </div>
                <span className="text-sm text-muted-foreground">Unsubscribe Anytime</span>
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

                {/* Referral Notice */}
                {referralCode && (
                  <div className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-xl max-w-lg mx-auto">
                    <p className="text-sm text-foreground">
                      You've been referred! Sign up to help your friend move up the tiers.
                    </p>
                  </div>
                )}
                
                <div className="space-y-4 max-w-lg mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      data-testid="newsletter-name-input"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      data-testid="newsletter-email-input"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="newsletter-phone-input"
                    />
                    <Input
                      type="text"
                      placeholder="Country (Optional)"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="px-6 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      data-testid="newsletter-country-input"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={subscribeMutation.isPending}
                    size="lg"
                    className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25"
                    data-testid="newsletter-subscribe-button"
                  >
                    {subscribeMutation.isPending ? "Subscribing..." : "Join Elite Circle Now"}
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


          {/* What You'll Get - Keep this valuable information without fake testimonials */}

        </div>
      </div>

      {/* Referral Share Modal */}
      {subscriberData && (
        <ReferralShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          subscriber={subscriberData}
        />
      )}
    </div>
  );
}
