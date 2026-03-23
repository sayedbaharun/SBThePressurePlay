import { useState, useEffect } from "react";
import ScrollReveal from "@/components/scroll-reveal";
import { motion } from "framer-motion";

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="brand-card w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-3 mx-auto"
      >
        <span className="stat-large text-pp-blue">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-caption text-pp-slate uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

function getTargetDate() {
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + 14);
  target.setHours(0, 0, 0, 0);
  return target;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = getTargetDate();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target.getTime() - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 md:py-32 bg-pp-midnight overflow-hidden diamond-bg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-pp-blue/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-pp-blue/30 to-transparent" />

      <div className="container-max relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-display-2 text-white mb-4">
              Episode 1 Drops In
            </h2>
            <p className="text-body-large text-pp-slate max-w-xl mx-auto">
              Be the first to hear Patrice and Sayed break down the pressure
              principle that changes everything.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="flex items-center text-pp-blue/30 text-3xl font-light">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="flex items-center text-pp-blue/30 text-3xl font-light">:</div>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <div className="flex items-center text-pp-blue/30 text-3xl font-light">:</div>
            <TimeUnit value={timeLeft.seconds} label="Sec" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <a href="#hero-email" className="btn-cta text-base inline-flex items-center gap-2 rounded-lg">
              Get Notified First
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
