import { motion } from "framer-motion";
import { Share2, Heart, ArrowRight } from "lucide-react";
import { useState } from "react";

interface InteractiveEpisodeCardProps {
  title: string;
  guest?: string;
  duration: string;
  image: string;
  featured?: boolean;
}

export default function InteractiveEpisodeCard({
  title,
  guest,
  duration,
  image,
  featured,
}: InteractiveEpisodeCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!featured) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = (e.clientX - rect.left - rect.width / 2) / -20;
    
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-card border border-primary/20 hover:border-primary/50 transition-all duration-300 group h-full"
    >
      {/* Image */}
      <div className="relative h-full overflow-hidden bg-black/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

        {/* Interactive Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
        >
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-primary" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/40 text-primary transition-all"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>
          <motion.button
            whileHover={{ gap: "0.75rem" }}
            className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-lg font-bold"
          >
            Listen Now <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        {guest && <p className="text-sm text-gray-400 mb-2">{guest}</p>}
        <p className="text-xs text-gray-500">{duration}</p>
      </div>
    </motion.div>
  );
}
