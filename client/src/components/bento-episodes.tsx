import { Play, Zap } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveEpisodeCard from "./interactive-episode-card";

interface Episode {
  id: string;
  title: string;
  guest?: string;
  duration: string;
  image: string;
  featured?: boolean;
  badge?: string;
}

const episodes: Episode[] = [
  {
    id: "1",
    title: "The Champion's Mindset",
    guest: "Patrice Evra",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop",
    featured: true,
    badge: "BREAKING NEWS",
  },
  {
    id: "2",
    title: "AI & Elite Performance",
    guest: "Sayed Baharun",
    duration: "52 min",
    image: "https://images.unsplash.com/photo-1559027615-cdEL+pFk+4Ioq30bdb9bfe4OAl+UH=w=600&h=600&fit=crop",
    badge: "VIRAL",
  },
  {
    id: "3",
    title: "Quote of the Week",
    duration: "3 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=600&h=600&fit=crop",
  },
];

export default function BentoEpisodes() {
  return (
    <section id="episodes" className="section-padding bg-black" data-testid="bento-episodes">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">EPISODE VAULT</h2>
          <p className="text-lg text-gray-400">Latest conversations decoded</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {/* Featured Large Card - Interactive */}
          <div
            className="md:col-span-2 md:row-span-2"
            data-testid="featured-episode-card"
          >
            <InteractiveEpisodeCard
              title={episodes[0].title}
              guest={episodes[0].guest}
              duration={episodes[0].duration}
              image={episodes[0].image}
              featured
            />
          </div>

          {/* Vertical Episode Card */}
          <div
            className="relative group overflow-hidden rounded-lg bg-card hover:scale-105 transition-transform duration-300 cursor-pointer"
            data-testid="vertical-episode-card"
          >
            <img
              src={episodes[1].image}
              alt={episodes[1].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

            {episodes[1].badge && (
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold uppercase">
                {episodes[1].badge}
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-bold mb-1 line-clamp-2">{episodes[1].title}</h3>
              <p className="text-xs text-gray-400">{episodes[1].duration}</p>
            </div>

            <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-12 h-12 text-primary fill-primary" />
            </button>
          </div>

          {/* Quote Card - Typography Based */}
          <div
            className="relative group overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col items-center justify-center p-6"
            data-testid="quote-card"
          >
            <Zap className="w-8 h-8 text-primary mb-4" />
            <blockquote className="text-center text-white font-bold text-lg md:text-xl leading-tight">
              "Pressure doesn't break you. It reveals you."
            </blockquote>
            <p className="text-sm text-gray-400 mt-4">— Episode 42</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="btn-gold" data-testid="view-all-episodes-btn">
            View All Episodes
          </button>
        </div>
      </div>
    </section>
  );
}
