import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE1_1756537613972.jpg";

const topics = [
  "The Parallel",
  "Technology Edge",
  "Tools & Systems",
  "Biohacking & Peak Performance",
  "Titan Interviews",
  "Athletic Edge in Business",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

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
    <section id="hero-email" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pp-midnight">
      {/* Background with diamond pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-pp-midnight via-pp-deep-black to-pp-midnight diamond-bg"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Host Images */}
          <motion.div
            className="flex justify-center items-center gap-6 md:gap-12 mb-12 md:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg overflow-hidden shadow-2xl hover:shadow-pp-blue/20 transition-all duration-300 transform hover:scale-105">
                <img
                  src={sayedImage}
                  alt="Sayed Baharun - Performance Architect & Entrepreneur"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pp-midnight/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <p className="text-white text-xs md:text-sm font-semibold">Sayed Baharun</p>
                  <p className="text-pp-teal text-xs hidden md:block">Performance Architect</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <span className="text-pp-slate text-2xl md:text-4xl font-light">&times;</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg overflow-hidden shadow-2xl hover:shadow-pp-blue/20 transition-all duration-300 transform hover:scale-105">
                <img
                  src={patriceImage}
                  alt="Patrice Evra - 5x Premier League Champion"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pp-midnight/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <p className="text-white text-xs md:text-sm font-semibold">Patrice Evra</p>
                  <p className="text-pp-teal text-xs hidden md:block">Global Champion</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 25 }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mb-8 md:mb-12 leading-tight max-w-4xl mx-auto">
              What do a <span className="text-pp-blue">5x Premier League Champion</span> and a{" "}
              <span className="text-pp-teal">Performance Architect & Entrepreneur</span> argue about every week?
            </h1>

            <div className="mb-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold gradient-text mb-3">
                PRESSURE PLAY
              </h2>
              <p className="text-lg md:text-xl text-pp-slate font-medium">
                Where the boardroom meets the field
              </p>
            </div>
          </motion.div>

          {/* Email Capture Form */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-6 md:py-7 text-base md:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-pp-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-pp-blue focus:border-pp-blue"
                required
                data-testid="hero-email-input"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                size="lg"
                className="btn-cta px-8 md:px-12 py-6 md:py-7 text-base md:text-lg rounded-lg"
                data-testid="hero-subscribe-button"
              >
                {subscribeMutation.isPending ? "Joining..." : "Join the Waitlist"}
              </Button>
            </form>
          </motion.div>

          {/* Value Props */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <div className="text-center p-6 brand-card">
                <h3 className="text-white font-semibold mb-2">The Parallel</h3>
                <p className="text-pp-slate text-small">Same pressure, different arena</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-center p-6 brand-card">
                <h3 className="text-white font-semibold mb-2">Technology Edge</h3>
                <p className="text-pp-slate text-small">AI, blockchain, and the unfair advantage</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-center p-6 brand-card">
                <h3 className="text-white font-semibold mb-2">Peak Performance</h3>
                <p className="text-pp-slate text-small">Biohacking, recovery, cognition</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Pillars */}
          <motion.div
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <h3 className="text-center text-2xl md:text-3xl font-semibold text-white mb-10">
              What We Cover
            </h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {topics.map((topic) => (
                <motion.div
                  key={topic}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-center p-5 brand-card cursor-default"
                >
                  <p className="text-white font-medium text-sm md:text-base">{topic}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
