import { motion } from "framer-motion";

export default function SponsorMarquee() {
  const sponsors = ["ROLEX", "1XBET", "EMIRATES", "HSBC", "BLOOMBERG", "MASTERCLASS"];

  return (
    <section id="sponsors" className="section-padding bg-gradient-to-b from-black to-gray-900" data-testid="sponsor-marquee">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
        >
          TRUSTED BY THE ELITE
        </motion.h2>

        {/* Marquee Container */}
        <div className="relative overflow-hidden rounded-lg bg-black/50 border border-primary/20 py-8">
          <div className="flex gap-16 animate-marquee">
            {[...sponsors, ...sponsors].map((sponsor, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-8 min-w-max text-xl md:text-2xl font-bold tracking-widest text-white/70 hover:text-primary transition-colors"
                data-testid={`sponsor-logo-${idx}`}
              >
                {sponsor}
              </div>
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Want to reach the inner circle?</p>
          <button className="btn-outline-gold" data-testid="sponsor-inquiry-btn">
            Sponsorship Inquiries
          </button>
        </div>
      </div>
    </section>
  );
}
