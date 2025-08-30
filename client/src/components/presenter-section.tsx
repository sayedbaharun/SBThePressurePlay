import { Linkedin, Twitter, Instagram } from "lucide-react";
import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE2_1756540349604.jpg";

interface Presenter {
  name: string;
  role: string;
  bio: string;
  headshot: string;
  expertise: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const presenters: Presenter[] = [
  {
    name: "Sayed Baharun",
    role: "Co-Founder & Performance Architect",
    bio: "🚀 Visionary behind The Pressure Play concept. Pioneer of the Champion's Framework methodology combining neuroscience, business strategy, and AI innovation. 15+ years optimizing Fortune 500 C-suite performance and championship teams. Trusted advisor to elite performers across industries who saw the opportunity to bridge three worlds that had never been connected at this level.",
    headshot: sayedImage,
    expertise: ["Visionary Architect of The Pressure Play", "Champion's Framework Methodology", "AI Strategy Expert for Elite Performers", "C-Suite Transformation", "Neuroscience-Based Performance"],
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "Patrice Evra",
    role: "Co-Founder & Champion Validator",
    bio: "🏆 5x Premier League Champion and Manchester United Captain with 14M+ global social following. First elite athlete bridging sports excellence with business strategy and AI innovation. From Old Trafford to Silicon Valley, Patrice brings the championship credibility and global platform to amplify these insights to millions worldwide.",
    headshot: patriceImage,
    expertise: ["Championship Psychology", "High-Pressure Leadership", "Global Platform & Credibility", "Performance Under Pressure", "Elite Sports Validation"],
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  }
];

export default function PresenterSection() {
  return (
    <section className="content-section bg-muted/30">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">Meet Your Co-Founders</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto mb-8">
              Two champions from different worlds, united by a shared mission to unlock human potential.
            </p>
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-2xl">
              <span className="text-body font-medium">Strategic Vision</span>
              <span className="text-primary font-bold">×</span>
              <span className="text-body font-medium">Championship Validation</span>
              <span className="text-primary font-bold">=</span>
              <span className="text-body font-medium brand-text">Global Impact</span>
            </div>
          </div>

          {/* Presenters Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {presenters.map((presenter) => (
              <div key={presenter.name} className="apple-card p-8 text-center">
                {/* Headshot */}
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto rounded-3xl overflow-hidden">
                    <img 
                      src={presenter.headshot || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
                      alt={presenter.name}
                      className="w-full h-full object-cover"
                      data-testid={`presenter-${presenter.name.toLowerCase().replace(' ', '-')}`}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="mb-6">
                  <h3 className="text-headline font-display mb-2">{presenter.name}</h3>
                  <p className="text-caption text-primary mb-4">{presenter.role}</p>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {presenter.bio}
                  </p>
                </div>

                {/* Expertise */}
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {presenter.expertise?.map((skill) => (
                      <div key={skill} className="apple-card px-3 py-1 bg-muted/50">
                        <span className="text-small text-muted-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {presenter.socials.linkedin && (
                    <button
                      onClick={() => window.open(presenter.socials.linkedin, '_blank')}
                      className="apple-card p-3 hover:bg-primary/10 transition-colors duration-200"
                      data-testid={`${presenter.name.toLowerCase().replace(' ', '-')}-linkedin`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  )}
                  {presenter.socials.twitter && (
                    <button
                      onClick={() => window.open(presenter.socials.twitter, '_blank')}
                      className="apple-card p-3 hover:bg-primary/10 transition-colors duration-200"
                      data-testid={`${presenter.name.toLowerCase().replace(' ', '-')}-twitter`}
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                  )}
                  {presenter.socials.instagram && (
                    <button
                      onClick={() => window.open(presenter.socials.instagram, '_blank')}
                      className="apple-card p-3 hover:bg-primary/10 transition-colors duration-200"
                      data-testid={`${presenter.name.toLowerCase().replace(' ', '-')}-instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Story */}
          <div className="space-y-12">
            <div className="text-center">
              <div className="apple-card p-8 bg-muted/50 max-w-4xl mx-auto">
                <h3 className="text-headline font-display mb-4">
                  <span className="brand-text">Our Mission</span>
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-6">
                  Sayed Baharun and Patrice Evra decode the mindset, strategies, and systems that separate good from great. 
                  Together, we bring you exclusive conversations combining elite sports psychology, cutting-edge business strategy, and AI innovation.
                </p>
              </div>
            </div>
            
            {/* Partnership Origin */}
            <div className="text-center">
              <div className="apple-card p-8 bg-gradient-to-r from-primary/5 to-accent/5 max-w-5xl mx-auto">
                <h3 className="text-headline font-display mb-6">
                  The Partnership That Changed Everything
                </h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-8">
                  When performance architect Sayed Baharun met Manchester United legend Patrice Evra, they discovered something extraordinary: 
                  the same principles that create champions on the pitch also drive breakthrough success in business and AI innovation.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <h4 className="text-caption font-medium mb-2">Sayed's Vision</h4>
                    <p className="text-small text-muted-foreground">
                      The strategic architect who saw the opportunity to revolutionize how we think about performance
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h4 className="text-caption font-medium mb-2">Shared Mission</h4>
                    <p className="text-small text-muted-foreground">
                      Decode pressure performance and make championship-level thinking accessible to everyone
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h4 className="text-caption font-medium mb-2">Patrice's Platform</h4>
                    <p className="text-small text-muted-foreground">
                      The champion's credibility and global reach to amplify these insights worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}