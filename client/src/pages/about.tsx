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
      {/* Clean Hero Section */}
      <section className="content-section-large hero-section">
        <div className="container mx-auto text-center">
          <h1 className="text-display-2 font-display mb-6">
            <span className="brand-text">Meet The Hosts</span>
          </h1>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Two elite minds bringing championship-level insights from performance psychology, 
            business strategy, and professional sports.
          </p>
        </div>
      </section>

      {/* Refined Presenters Section */}
      <section className="content-section-large">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-24">
            {presenters.map((presenter, index) => (
              <div key={presenter.name} className="animate-fade-in">
                {/* Clean Image Presentation */}
                <div className="mb-8">
                  <div className="aspect-[3/4] presenter-image">
                    <img
                      src={presenter.image}
                      alt={presenter.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-presenter-${presenter.name.toLowerCase().replace(' ', '-')}`}
                    />
                  </div>
                </div>

                {/* Content with Proper Hierarchy */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-display-2 font-display" data-testid={`text-presenter-name-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                      {presenter.name}
                    </h2>
                    <p className="text-headline brand-text" data-testid={`text-presenter-role-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                      {presenter.role}
                    </p>
                  </div>

                  <p className="text-body-large text-muted-foreground leading-relaxed" data-testid={`text-presenter-bio-${presenter.name.toLowerCase().replace(' ', '-')}`}>
                    {presenter.bio}
                  </p>

                  {/* Clean Expertise Tags */}
                  <div className="space-y-4">
                    <h3 className="text-headline">Expertise</h3>
                    <div className="flex flex-wrap gap-3">
                      {presenter.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="apple-card px-4 py-2 text-caption"
                          data-testid={`tag-expertise-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Minimal Social Links */}
                  <div className="flex space-x-3 pt-2">
                    {Object.entries(presenter.socials).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="apple-card w-12 h-12 flex items-center justify-center"
                        data-testid={`link-${platform}-${presenter.name.toLowerCase().replace(' ', '-')}`}
                      >
                        <span className="text-caption font-semibold">
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

      {/* Clean Mission Statement */}
      <section className="content-section bg-muted/30">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-display-2 font-display mb-8">
            <span className="brand-text">Our Mission</span>
          </h2>
          <p className="text-body-large text-muted-foreground leading-relaxed">
            The Pressure Play decodes the mindset, strategies, and systems that separate good from great. 
            We bring you exclusive conversations with championship athletes, visionary entrepreneurs, 
            and performance experts who operate at the highest levels.
          </p>
        </div>
      </section>

      {/* Simplified Call to Action */}
      <section className="content-section">
        <div className="container mx-auto text-center">
          <h2 className="text-display-2 font-display mb-6">
            <span className="brand-text">Ready to Elevate?</span>
          </h2>
          <p className="text-body-large text-muted-foreground mb-12 max-w-xl mx-auto">
            Join our community of high performers and access exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/episodes"
              className="apple-card px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200"
              data-testid="button-episodes"
            >
              Latest Episodes
            </a>
            <a
              href="/listen"
              className="apple-card px-8 py-4 font-medium transition-all duration-200"
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