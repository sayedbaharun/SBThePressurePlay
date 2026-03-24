import { motion } from "framer-motion";
import ScrollReveal from "@/components/scroll-reveal";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE2_1756540349604.jpg";
import podcastStudioImage from "@assets/generated_images/Professional_podcast_studio_setup_80248453.png";

const presenters = [
  {
    name: "Patrice Evra",
    role: "Co-Host & Champion Validator",
    image: patriceImage,
    bio: "5x Premier League Champion and Manchester United Captain with 14M+ global social following. First elite athlete bridging sports excellence with business strategy and AI innovation. From Old Trafford to Silicon Valley, Patrice brings the championship credibility and global platform to amplify these insights to millions worldwide.",
    expertise: ["Elite Sports Psychology", "High-Pressure Leadership", "Global Platform & Credibility", "Performance Under Pressure", "Elite Sports Validation"],
    socials: {
      linkedin: { url: "https://linkedin.com/in/patrice-evra", icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      )},
      x: { url: "https://x.com/patrice_evra", icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      )},
      instagram: { url: "https://instagram.com/patrice_evra", icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      )},
    }
  },
  {
    name: "Sayed Baharun",
    role: "Co-Host & Performance Architect",
    image: sayedImage,
    bio: "Visionary behind The Pressure Play concept. Pioneer of the Champion's Framework methodology combining neuroscience, business strategy, and AI innovation. 15+ years optimizing Fortune 500 C-suite performance and championship teams. Trusted advisor to elite performers across industries who saw the opportunity to bridge three worlds that had never been connected at this level.",
    expertise: ["Visionary Architect of The Pressure Play", "Champion's Framework Methodology", "High-Performance Business Strategy", "Entrepreneurship & Startups", "Neuroscience-Based Performance"],
    socials: {
      linkedin: { url: "https://linkedin.com/in/sayed-baharun", icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      )},
      x: { url: "https://x.com/sayed_baharun", icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      )},
      instagram: { url: "https://instagram.com/sayed_baharun", icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      )},
    }
  }
];

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 },
  }),
};

export default function About() {
  return (
    <div className="min-h-screen bg-pp-midnight">
      {/* Hero */}
      <ScrollReveal>
        <section className="content-section-large hero-section">
          <div className="container mx-auto text-center">
            <h1 className="text-display-2 mb-6">
              <span className="brand-text">Meet Your Co-Hosts</span>
            </h1>
            <p className="text-body-large text-pp-slate max-w-2xl mx-auto">
              Two titans from different worlds, united by a shared mission to unlock human potential.
            </p>
            <div className="mt-8">
              <p className="text-headline font-medium brand-text">
                Strategic Vision &times; Championship Validation = Global Impact
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Presenters Section */}
      <section className="content-section-large">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24">
            {presenters.map((presenter, index) => (
              <ScrollReveal key={presenter.name} delay={index * 0.15}>
                <div>
                  {/* Image */}
                  <div className="mb-8">
                    <motion.div
                      className="aspect-[3/4] overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <img
                        src={presenter.image}
                        alt={presenter.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        data-testid={`img-presenter-${presenter.name.toLowerCase().replace(' ', '-')}`}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-display-2" data-testid={`text-presenter-name-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                        {presenter.name}
                      </h2>
                      <p className="text-headline brand-text" data-testid={`text-presenter-role-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                        {presenter.role}
                      </p>
                    </div>

                    <p className="text-body-large text-pp-slate leading-relaxed" data-testid={`text-presenter-bio-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                      {presenter.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="space-y-4">
                      <h3 className="text-headline">Expertise</h3>
                      <motion.div
                        className="flex flex-wrap gap-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {presenter.expertise.map((skill, i) => (
                          <motion.span
                            key={skill}
                            custom={i}
                            variants={tagVariants}
                            className="apple-card px-4 py-2 text-caption"
                            data-testid={`tag-expertise-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Social Links — proper SVG icons */}
                    <div className="flex space-x-3 pt-2">
                      {Object.entries(presenter.socials).map(([platform, { url, icon }]) => (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="apple-card w-12 h-12 flex items-center justify-center text-pp-slate hover:text-pp-blue transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                          title={platform}
                          data-testid={`link-${platform}-${presenter.name.toLowerCase().replace(' ', '-')}`}
                        >
                          {icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Story */}
      <ScrollReveal>
        <section className="content-section bg-pp-deep-black">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-display-2 mb-6">
                <span className="brand-text">The Partnership That Changed Everything</span>
              </h2>
              <p className="text-body-large text-pp-slate max-w-4xl mx-auto leading-relaxed">
                When performance architect Sayed Baharun met Manchester United legend Patrice Evra,
                they discovered something extraordinary: the same principles that create champions on the
                pitch also drive breakthrough success in business and AI innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { title: "Sayed's Vision", desc: "The strategic architect who saw the opportunity to revolutionize how we think about performance" },
                { title: "Shared Mission", desc: "Decode pressure performance and make championship-level thinking accessible to everyone" },
                { title: "Patrice's Platform", desc: "The champion's credibility and global reach to amplify these insights worldwide" },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <motion.div
                    className="brand-card p-8 text-center h-full"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <h3 className="text-headline mb-4">{item.title}</h3>
                    <p className="text-body text-pp-slate">{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Mission Statement */}
      <ScrollReveal>
        <section className="content-section relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={podcastStudioImage} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70"></div>
          </div>
            <div className="container mx-auto text-center max-w-4xl relative z-10">
            <h2 className="text-display-2 mb-8">
              <span className="brand-text">Our Mission</span>
            </h2>
            <p className="text-body-large text-pp-slate leading-relaxed">
              Sayed Baharun and Patrice Evra decode the mindset, strategies, and systems that separate good from great.
              Together, we bring you exclusive conversations combining elite sports psychology, cutting-edge business strategy,
              and AI innovation to unlock championship-level performance in any field.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
