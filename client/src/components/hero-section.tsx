import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE1_1756537613972.jpg";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check for referral code in URL
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("tpp_referral_code", ref);
      setReferralCode(ref);
    } else {
      const stored = localStorage.getItem("tpp_referral_code");
      if (stored) setReferralCode(stored);
    }
  });

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const payload: any = {
        email,
        name: email.split("@")[0],
      };
      if (referralCode) {
        payload.referredBy = referralCode;
      }
      const response = await apiRequest("POST", "/api/newsletter/subscribe", payload);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the waitlist!",
        description: "We'll notify you when Episode 1 drops. Check your email to confirm.",
      });
      setEmail("");
      setReferralCode(null);
      localStorage.removeItem("tpp_referral_code");
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
    <section id="hero-email" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-pp-midnight">
      {/* Background with diamond pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-pp-midnight via-pp-deep-black to-pp-midnight diamond-bg"></div>

      {/* Content — single focused message */}
      <div className="relative z-10 container mx-auto px-5 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Host Images — compact */}
          <motion.div
            className="flex justify-center items-center gap-4 md:gap-8 mb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-pp-blue/30">
              <img
                src={sayedImage}
                alt="Sayed Baharun"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-pp-slate text-lg md:text-2xl font-light">&times;</div>

            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-pp-teal/30">
              <img
                src={patriceImage}
                alt="Patrice Evra"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Single headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold gradient-text mb-4 leading-[1.1]">
              PRESSURE PLAY
            </h1>
            <p className="text-lg md:text-xl text-pp-slate mb-3">
              Where the boardroom meets the field
            </p>
            <p className="text-sm md:text-base text-pp-slate/70 max-w-xl mx-auto mb-10">
              Patrice Evra and Sayed Baharun decode the mindset of champions — across sport, business, and technology.
            </p>
          </motion.div>

          {/* Single CTA — email capture */}
          <motion.div
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-6 text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-pp-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-pp-blue focus:border-pp-blue"
                required
                data-testid="hero-email-input"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                size="lg"
                className="btn-cta px-8 py-6 text-base rounded-lg whitespace-nowrap"
                data-testid="hero-subscribe-button"
              >
                {subscribeMutation.isPending ? "Joining..." : "Join the Waitlist"}
              </Button>
            </form>
            <p className="text-xs text-pp-slate/50 mt-3">
              Episode 1 drops soon. Be the first to know.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
