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
    bio: "Visionary behind The Pressure Play. 15+ years optimizing Fortune 500 performance. Pioneer of the Champion's Framework methodology.",
    stats: "15+ Years Elite Performance",
  },
];

export default function GuestSpotlightSection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display text-white mb-4">
              YOUR HOSTS
            </h2>
            <p className="text-body-large text-white/60 max-w-2xl mx-auto">
              Two champions from different worlds, united by a mission to decode
              what it really takes to perform under pressure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {hosts.map((host, index) => (
            <ScrollReveal key={host.name} delay={index * 0.12}>
              <motion.div
                className="apple-card p-0 overflow-hidden group cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Image */}
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src={host.image}
                    alt={host.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Stats Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary/20 backdrop-blur-sm text-primary text-small font-semibold px-3 py-1.5 rounded-full border border-primary/30">
                      {host.stats}
                    </span>
                  </div>

                  {/* Name Overlay */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-display-3 text-white mb-1">
                      {host.name}
                    </h3>
                    <p className="text-caption text-primary font-semibold">
                      {host.role}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="p-6">
                  <p className="text-body text-white/60 leading-relaxed">
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
