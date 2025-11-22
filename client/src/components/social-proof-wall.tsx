import { motion } from "framer-motion";

const testimonials = [
  { name: "Alex Chen", text: "Just joined Inner Circle 🎯", initials: "AC" },
  { name: "Jordan Smith", text: "The pressure made me a champion ⚡", initials: "JS" },
  { name: "Morgan Lee", text: "Game-changing insights every week", initials: "ML" },
  { name: "Casey Williams", text: "Worth every penny 💯", initials: "CW" },
  { name: "Taylor Brown", text: "Elite minds, elite content", initials: "TB" },
];

export default function SocialProofWall() {
  return (
    <div className="fixed bottom-24 right-8 z-30 max-w-xs pointer-events-none" data-testid="social-proof-wall">
      <div className="space-y-2">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-black/80 backdrop-blur-sm border border-primary/30 rounded-lg p-3 text-xs"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-black text-xs font-bold">
                {testimonial.initials[0]}
              </div>
              <span className="font-semibold text-white">{testimonial.name}</span>
            </div>
            <p className="text-gray-300 text-xs">{testimonial.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
