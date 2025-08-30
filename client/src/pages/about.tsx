import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE2_1756540349604.jpg";

const presenters = [
  {
    name: "Sayed Baharun",
    role: "Co-Host & Performance Strategist",
    image: sayedImage,
    bio: "Elite performance coach and business strategist with over a decade of experience working with championship athletes and Fortune 500 executives. Sayed brings cutting-edge insights from the worlds of sports psychology, business optimization, and human performance.",
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
    image: patriceImage,
    bio: "Former Manchester United captain and French national team legend. Patrice brings championship-level insights from the highest levels of professional sports, sharing the mindset and strategies that led to multiple Premier League titles and international success.",
    expertise: ["Championship Mindset", "Team Leadership", "Elite Sports Performance", "Mental Resilience"],
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 hero-gradient">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 font-display">
            Meet The Hosts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Two elite minds bringing you championship-level insights from the worlds of 
            performance psychology, business strategy, and professional sports.
          </p>
        </div>
      </section>

      {/* Presenters Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {presenters.map((presenter, index) => (
              <div 
                key={presenter.name} 
                className={`flex flex-col ${index === 1 ? 'lg:flex-col-reverse' : ''}`}
              >
                {/* Image */}
                <div className="relative mb-8">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl neon-border">
                    <img
                      src={presenter.image}
                      alt={presenter.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-presenter-${presenter.name.toLowerCase().replace(' ', '-')}`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold gradient-text font-display mb-2" data-testid={`text-presenter-name-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                      {presenter.name}
                    </h2>
                    <p className="text-lg text-primary font-medium" data-testid={`text-presenter-role-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                      {presenter.role}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-presenter-bio-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                    {presenter.bio}
                  </p>

                  {/* Expertise */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Expertise Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {presenter.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground border border-border"
                          data-testid={`tag-expertise-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    {Object.entries(presenter.socials).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors border border-border hover:border-primary/50"
                        data-testid={`link-${platform}-${presenter.name.toLowerCase().replace(' ', '-')}`}
                      >
                        <span className="capitalize text-sm font-medium">
                          {platform.charAt(0).toUpperCase()}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8 font-display">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The Pressure Play combines elite performance insights with cutting-edge business strategy 
            and AI innovation. We bring you exclusive conversations with championship athletes, 
            visionary entrepreneurs, and performance experts who operate at the highest levels. 
            Our mission is to decode the mindset, strategies, and systems that separate good from great.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of high performers and get access to exclusive content, 
            early episode releases, and behind-the-scenes insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/episodes"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-episodes"
            >
              Latest Episodes
            </a>
            <a
              href="/listen"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              data-testid="button-listen"
            >
              Start Listening
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}