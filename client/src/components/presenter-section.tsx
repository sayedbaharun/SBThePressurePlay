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
    role: "Co-Host & Performance Strategist",
    bio: "Elite performance coach and business strategist with over a decade of experience working with championship athletes and Fortune 500 executives. Sayed brings cutting-edge insights from the worlds of sports psychology, business optimization, and human performance.",
    headshot: sayedImage,
    expertise: ["Performance Psychology", "Business Strategy", "Leadership Development", "Elite Mindset Training"],
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    name: "Patrice Evra",
    role: "Co-Host & Champion Mindset Expert",
    bio: "Former Manchester United captain and French national team legend. Patrice brings championship-level insights from the highest levels of professional sports, sharing the mindset and strategies that led to multiple Premier League titles and international success.",
    headshot: patriceImage,
    expertise: ["Championship Mindset", "Team Leadership", "Elite Sports Performance", "Mental Resilience"],
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
              <span className="brand-text">Meet Your Hosts</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Two decades of combined experience in elite performance, business strategy, and human optimization.
            </p>
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

          {/* Why We Started */}
          <div className="text-center">
            <div className="apple-card p-8 bg-muted/50 max-w-4xl mx-auto">
              <h3 className="text-headline font-display mb-4">
                <span className="brand-text">Our Mission</span>
              </h3>
              <p className="text-body text-muted-foreground leading-relaxed">
                The Pressure Play decodes the mindset, strategies, and systems that separate good from great. 
                We bring you exclusive conversations with championship athletes, visionary entrepreneurs, 
                and performance experts who operate at the highest levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}