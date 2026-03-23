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
  "Championship Mindset",
  "High-Pressure Decision Making",
  "Leadership Under Fire",
  "Athletic Edge in Business",
  "Mental Resilience",
  "Building Empires from Zero",
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
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", {
        email,
        name: email.split("@")[0],
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the waitlist!",
        description: "We'll notify you when Episode 1 drops. Check your email to confirm.",
      });
      setEmail("");
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
    <section id="hero-email" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(207, 159, 71, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

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
              <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl hover:border-primary/60 transition-all duration-300 transform hover:scale-105">
                <img
                  src={sayedImage}
                  alt="Sayed Baharun - Performance Architect & Entrepreneur"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-white text-xs md:text-sm font-semibold">Sayed Baharun</p>
                  <p className="text-primary text-xs hidden md:block">Entrepreneur & Performance Architect</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <span className="text-white/50 text-2xl md:text-4xl font-light">&times;</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl hover:border-primary/60 transition-all duration-300 transform hover:scale-105">
                <img
                  src={patriceImage}
                  alt="Patrice Evra - 5x Premier League Champion"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-white text-xs md:text-sm font-semibold">Patrice Evra</p>
                  <p className="text-primary text-xs hidden md:block">Global Champion</p>
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
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 md:mb-12 leading-tight max-w-4xl mx-auto">
              What do a <span className="text-primary">5x Premier League Champion</span> and a{" "}
              <span className="text-primary">Performance Architect & Entrepreneur</span> argue about every week?
            </h1>

            <div className="mb-6">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold gradient-text mb-3">
                THE PRESSURE PLAY
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-medium">
                Where the locker room meets the boardroom
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
                className="flex-1 px-6 py-6 md:py-7 text-base md:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
                data-testid="hero-email-input"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                size="lg"
                className="px-8 md:px-12 py-6 md:py-7 text-base md:text-lg bg-gradient-to-r from-primary to-secondary text-black rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
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
              <div className="text-center p-6 apple-card hover:bg-white/10">
                <div className="text-2xl mb-2">🏆</div>
                <h3 className="text-white font-semibold mb-2">Elite Performance</h3>
                <p className="text-white/70 text-sm">Same pressure, different arena</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-center p-6 apple-card hover:bg-white/10">
                <div className="text-2xl mb-2">💡</div>
                <h3 className="text-white font-semibold mb-2">Raw Conversations</h3>
                <p className="text-white/70 text-sm">Unfiltered debates from two worlds</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-center p-6 apple-card hover:bg-white/10">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="text-white font-semibold mb-2">Early Access</h3>
                <p className="text-white/70 text-sm">Be first to hear Episode 1</p>
              </div>
            </motion.div>
          </motion.div>

          {/* What We Talk About */}
          <motion.div
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <h3 className="text-center text-2xl md:text-3xl font-display font-bold text-white mb-10 tracking-wide">
              WHAT WE TALK ABOUT
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
                  whileHover={{ scale: 1.04, borderColor: "hsl(51 100% 50% / 0.5)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-center p-5 apple-card cursor-default"
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
