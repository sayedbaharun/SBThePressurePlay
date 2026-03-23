import ScrollReveal from "@/components/scroll-reveal";
import { motion } from "framer-motion";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE2_1756540349604.jpg";

const hosts = [
  {
    name: "Patrice Evra",
    role: "Global Champion",
    image: patriceImage,
    bio: "5x Premier League Champion. Manchester United Captain. 14M+ global following. First elite athlete bridging sports excellence with business strategy.",
    stats: "5x Premier League Champion",
  },
  {
    name: "Sayed Baharun",
    role: "Performance Architect",
    image: sayedImage,
    bio: "Visionary behind Pressure Play. 15+ years optimizing Fortune 500 performance. Pioneer of the Champion's Framework methodology.",
    stats: "15+ Years Elite Performance",
  },
];

export default function GuestSpotlightSection() {
  return (
    <section className="relative py-20 md:py-32 bg-pp-deep-black">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-display-2 text-white mb-4">
              Your Hosts
            </h2>
            <p className="text-body-large text-pp-slate max-w-2xl mx-auto">
              Two titans from different worlds, united by a mission to decode
              what it really takes to perform under pressure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hosts.map((host, index) => (
            <ScrollReveal key={host.name} delay={index * 0.12}>
              <motion.div
                className="brand-card p-0 overflow-hidden group cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src={host.image}
                    alt={host.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pp-midnight/80 via-pp-midnight/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-pp-blue/20 backdrop-blur-sm text-pp-blue text-small font-semibold px-3 py-1.5 rounded-full border border-pp-blue/30">
                      {host.stats}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-display-3 text-white mb-1">
                      {host.name}
                    </h3>
                    <p className="text-caption text-pp-teal font-semibold">
                      {host.role}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-body text-pp-slate leading-relaxed">
                    {host.bio}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
