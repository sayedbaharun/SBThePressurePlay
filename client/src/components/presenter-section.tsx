import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ExternalLink, Linkedin, Twitter } from "lucide-react";

interface Presenter {
  name: string;
  role: string;
  bio: string;
  headshot: string;
  credentials: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

const presenters: Presenter[] = [
  {
    name: "John Smith",
    role: "Host & Executive Producer",
    bio: "Former Fortune 500 CEO turned performance coach, with 20+ years scaling organizations from startup to IPO.",
    headshot: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    credentials: ["Former CEO, TechCorp", "Harvard MBA", "Performance Coach"],
    socials: {
      linkedin: "johnsmith",
      twitter: "@johnsmith"
    }
  },
  {
    name: "Sarah Chen",
    role: "Co-Host & Strategic Advisor",
    bio: "Elite sports psychologist who has worked with Olympic champions and professional athletes across 15+ sports.",
    headshot: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    credentials: ["PhD Sports Psychology", "Olympic Team Advisor", "Author, 'Peak Mind'"],
    socials: {
      linkedin: "sarahchen",
      twitter: "@sarahpsych"
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
                      src={presenter.headshot} 
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

                {/* Credentials */}
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {presenter.credentials.map((credential) => (
                      <div key={credential} className="apple-card px-3 py-1 bg-muted/50">
                        <span className="text-small text-muted-foreground">{credential}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  {presenter.socials.linkedin && (
                    <button
                      onClick={() => window.open(`https://linkedin.com/in/${presenter.socials.linkedin}`, '_blank')}
                      className="apple-card p-3 hover:bg-primary/10 transition-colors duration-200"
                      data-testid={`${presenter.name.toLowerCase().replace(' ', '-')}-linkedin`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  )}
                  {presenter.socials.twitter && (
                    <button
                      onClick={() => window.open(`https://twitter.com/${presenter.socials.twitter}`, '_blank')}
                      className="apple-card p-3 hover:bg-primary/10 transition-colors duration-200"
                      data-testid={`${presenter.name.toLowerCase().replace(' ', '-')}-twitter`}
                    >
                      <Twitter className="w-5 h-5" />
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
                <span className="brand-text">Why We Started The Pressure Play</span>
              </h3>
              <p className="text-body text-muted-foreground leading-relaxed">
                We believe the highest performers in business, sports, and innovation share common principles that most people never get to hear. 
                Our mission is to extract these insights from elite guests and present them in a way that transforms how you think about pressure, performance, and potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}