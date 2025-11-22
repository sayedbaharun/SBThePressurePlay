import { motion } from "framer-motion";
import { CheckCircle, Zap, Users, Book } from "lucide-react";
import { Link } from "wouter";

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Quarterly Networking",
    description: "Exclusive access to members-only events",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Early Access",
    description: "First to hear about new episodes and content",
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Premium Content",
    description: "Deep-dive archives and extended interviews",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Direct Access",
    description: "Ask questions directly to our founders",
  },
];

export default function InnerCircle() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">THE ELITE CIRCLE</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join a community of champions, leaders, and innovators.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Become an Elite Member
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Get exclusive access to our inner circle. Connect with like-minded champions, get early episode access, and direct engagement with Sayed and Patrice.
              </p>

              <div className="space-y-4 mb-12">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="btn-gold text-lg" data-testid="subscribe-elite-btn">
                Subscribe Now - $97/Month
              </button>
            </motion.div>

            {/* Right - Premium Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-8 rounded-2xl border-2 border-primary/50 hover:border-primary transition-colors"
            >
              <div className="mb-6">
                <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase mb-4">
                  Premium
                </div>
                <h3 className="text-3xl font-bold text-white">Elite Circle</h3>
              </div>

              <div className="mb-8">
                <div className="text-5xl font-bold text-primary mb-2">$97</div>
                <p className="text-gray-400">per month • Cancel anytime</p>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>

              <button className="btn-gold w-full mb-4" data-testid="inner-circle-subscribe-btn">
                Subscribe Now
              </button>

              <p className="text-center text-xs text-gray-500">
                30-day money-back guarantee. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-white/5">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Join 5,000+ Elite Members</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Champions from 50+ countries trust The Pressure Play to elevate their performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">Ready to Join?</h2>
            <button className="btn-gold text-lg" data-testid="final-cta-subscribe">
              Subscribe Now
            </button>
            <p className="text-gray-400 mt-4">
              Questions? <Link href="/contact" className="text-primary hover:text-primary/80">Contact us</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
