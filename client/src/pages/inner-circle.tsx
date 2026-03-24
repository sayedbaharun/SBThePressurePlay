import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Users, Book, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Quarterly Networking",
    description: "Exclusive access to members-only events with elite performers",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Early Access",
    description: "First to hear about new episodes, guests, and announcements",
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Premium Content",
    description: "Deep-dive archives and extended, uncut interviews",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Direct Access",
    description: "Submit questions directly to Patrice and Sayed",
  },
];

export default function InnerCircle() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", {
        email,
        name: email.split("@")[0],
        tier: "elite",
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "You're on the Elite Circle waitlist!",
        description: "We'll reach out with exclusive details before launch.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
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
    <div className="min-h-screen bg-pp-midnight">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-pp-blue/10 border border-pp-blue/30 rounded-full px-5 py-2 mb-6">
              <span className="text-caption text-pp-blue font-semibold uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <h1 className="text-display-1 gradient-text mb-4">THE ELITE CIRCLE</h1>
            <p className="text-body-large text-pp-slate max-w-2xl mx-auto">
              A private community of champions, leaders, and innovators. Launching alongside Episode 1.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            {/* Left — Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-display-3 text-white mb-8">
                What You'll Get
              </h2>

              <div className="space-y-6 mb-12">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-pp-blue/10 border border-pp-blue/20 flex items-center justify-center flex-shrink-0 text-pp-blue">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-pp-slate text-body">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Waitlist Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="brand-card p-8 md:p-10"
            >
              <div className="mb-8">
                <h3 className="text-display-3 text-white mb-3">Join the Waitlist</h3>
                <p className="text-body text-pp-slate">
                  Be the first to know when the Elite Circle opens. Early members get founding-member pricing.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-6 text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-pp-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-pp-blue focus:border-pp-blue"
                  required
                  data-testid="elite-waitlist-email"
                />
                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="btn-cta w-full py-6 text-base rounded-lg"
                  data-testid="elite-waitlist-submit"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {subscribeMutation.isPending ? "Joining..." : "Get Early Access"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-pp-slate text-caption">
                      <CheckCircle className="w-4 h-4 text-pp-teal flex-shrink-0" />
                      <span>{feature.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-body-large text-pp-slate mb-4">
              Have questions about the Elite Circle?
            </p>
            <Link href="/contact" className="text-pp-blue hover:text-pp-teal transition-colors font-medium">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
