import { motion } from "framer-motion";
import ScrollReveal from "@/components/scroll-reveal";

const pillars = [
  { title: "The Parallel", desc: "Same pressure, different arena" },
  { title: "Technology Edge", desc: "AI, blockchain, and the unfair advantage" },
  { title: "Peak Performance", desc: "Biohacking, recovery, cognition" },
];

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
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

export default function ContentPillarsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-pp-deep-black">
      <div className="container-max">
        {/* Value Props */}
        <ScrollReveal>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {pillars.map((p) => (
              <motion.div key={p.title} variants={itemVariants}>
                <div className="text-center p-6 brand-card">
                  <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                  <p className="text-pp-slate text-small">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>

        {/* What We Cover */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-4xl mx-auto">
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
