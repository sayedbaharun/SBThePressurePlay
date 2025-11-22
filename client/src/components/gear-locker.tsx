import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Whoop Band",
    description: "Biometric wearable for peak performance tracking",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
    affiliate: "https://whoop.com",
    tag: "Recovery",
  },
  {
    name: "TradingView",
    description: "Professional charting & market analysis platform",
    image: "https://images.unsplash.com/photo-1611974802130-5ffad13e4d0a?w=400&h=300&fit=crop",
    affiliate: "https://tradingview.com",
    tag: "Markets",
  },
  {
    name: "NordVPN",
    description: "Secure your online presence with premium privacy",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    affiliate: "https://nordvpn.com",
    tag: "Security",
  },
];

export default function GearLocker() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-black via-gray-900/50 to-black" data-testid="gear-locker">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">THE TOOLS WE USE</h2>
          <p className="text-lg text-gray-400">Handpicked tech that champions trust</p>
        </motion.div>

        {/* Product Carousel Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-3 gap-8"
          data-testid="gear-products-grid"
        >
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group relative overflow-hidden rounded-xl bg-card border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              data-testid={`gear-product-${idx}`}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-black/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  {product.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{product.description}</p>

                {/* CTA Button */}
                <a
                  href={product.affiliate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-opacity-80 transition-colors group"
                  data-testid={`gear-affiliate-link-${idx}`}
                >
                  Explore
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            * Some links contain affiliate partnerships. We only recommend tools we genuinely use.
          </p>
          <button className="btn-outline-gold" data-testid="gear-locker-all-tools-btn">
            Explore All Tools
          </button>
        </motion.div>
      </div>
    </section>
  );
}
