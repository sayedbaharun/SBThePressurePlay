import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Users } from "lucide-react";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE1_1756537613972.jpg";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch subscriber count
  const { data: subscriberData } = useQuery({
    queryKey: ["/api/newsletter/count"],
    queryFn: async () => {
      const response = await fetch("/api/newsletter/count");
      if (!response.ok) throw new Error("Failed to fetch count");
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", {
        email,
        name: email.split("@")[0], // Generate a simple name from email
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the waitlist!",
        description: "We'll notify you when Episode 1 drops. Check your email to confirm.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter/count"] });
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

  const subscriberCount = subscriberData?.count || 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(207, 159, 71, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Founder Images */}
          <div className="flex justify-center items-center gap-6 md:gap-12 mb-12 md:mb-16">
            {/* Sayed Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl hover:border-primary/60 transition-all duration-300 transform hover:scale-105">
              <img
                src={sayedImage}
                alt="Sayed Baharun - Fortune 500 Performance Architect"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-white text-xs md:text-sm font-semibold">Sayed Baharun</p>
                <p className="text-primary text-xs hidden md:block">Boardroom Champion</p>
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-white text-lg md:text-2xl font-bold">VS</span>
              </div>
            </div>

            {/* Patrice Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl hover:border-primary/60 transition-all duration-300 transform hover:scale-105">
              <img
                src={patriceImage}
                alt="Patrice Evra - 5x Premier League Champion"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <p className="text-white text-xs md:text-sm font-semibold">Patrice Evra</p>
                <p className="text-primary text-xs hidden md:block">Locker Room Legend</p>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12 leading-tight max-w-4xl mx-auto">
              What do a <span className="text-primary">5x Premier League Champion</span> and a{" "}
              <span className="text-primary">Fortune 500 Performance Architect</span> argue about every week?
            </h1>

            {/* Brand */}
            <div className="mb-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold gradient-text mb-3">
                THE PRESSURE PLAY
              </h2>
              <p className="text-lg md:text-xl text-white/80 font-medium">
                Coming Soon — Be First In
              </p>
            </div>
          </div>

          {/* Email Capture Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-6 md:py-7 text-base md:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
                data-testid="hero-email-input"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                size="lg"
                className="px-8 md:px-12 py-6 md:py-7 text-base md:text-lg bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                data-testid="hero-subscribe-button"
              >
                {subscribeMutation.isPending ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <Users className="w-5 h-5 text-primary" />
              <p className="text-white/90 text-sm md:text-base font-medium">
                Join <span className="text-primary font-bold">{subscriberCount.toLocaleString()}</span> others waiting for Episode 1
              </p>
            </div>
          </div>

          {/* Value Props */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="text-white font-semibold mb-2">Elite Performance</h3>
              <p className="text-white/70 text-sm">Same pressure, different arena</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="text-white font-semibold mb-2">Raw Conversations</h3>
              <p className="text-white/70 text-sm">Unfiltered debates from two worlds</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-white font-semibold mb-2">Early Access</h3>
              <p className="text-white/70 text-sm">Be first to hear Episode 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
