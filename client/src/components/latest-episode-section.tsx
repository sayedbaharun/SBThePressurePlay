import ScrollReveal from "@/components/scroll-reveal";
import { Clock, Radio } from "lucide-react";

export default function LatestEpisodeSection() {
  return (
    <section className="relative py-20 md:py-32 bg-pp-midnight overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pp-blue/10 blur-[120px]" />
      </div>

      <div className="container-max relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-pp-blue/10 border border-pp-blue/30 rounded-full px-5 py-2 mb-6">
              <Radio className="w-4 h-4 text-pp-blue animate-pulse" />
              <span className="text-caption text-pp-blue font-semibold uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <h2 className="text-display-2 text-white mb-4">
              The First Drop
            </h2>
            <p className="text-body-large text-pp-slate max-w-2xl mx-auto">
              Where the boardroom meets the field — unfiltered conversations
              about pressure, performance, and winning.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-4xl mx-auto">
            <div className="brand-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-gradient-to-br from-pp-blue/30 via-pp-teal/10 to-transparent border border-pp-blue/20 flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-pp-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="stat-large text-pp-blue/40">01</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-caption text-pp-blue font-semibold uppercase tracking-wider mb-2 stat-small">
                  Episode 1
                </p>
                <h3 className="text-headline text-white mb-4">
                  The Pressure Principle
                </h3>
                <p className="text-body text-pp-slate mb-6 leading-relaxed">
                  In the premiere episode, Patrice Evra and Sayed Baharun break
                  down the one principle that separates champions from everyone
                  else — how you respond when the pressure is at its peak. From
                  Champions League finals to billion-dollar boardroom decisions,
                  the science is the same.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                  <a
                    href="#hero-email"
                    className="btn-cta flex items-center gap-3 text-base rounded-lg"
                  >
                    Get Notified When It Drops
                  </a>
                  <div className="flex items-center gap-2 text-pp-slate text-caption">
                    <Clock className="w-4 h-4" />
                    <span className="stat-small">~45 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
