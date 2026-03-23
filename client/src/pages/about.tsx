import sayedImage from "@assets/IMG_3685_1756540300594.jpg";
import patriceImage from "@assets/PE2_1756540349604.jpg";
import podcastStudioImage from "@assets/generated_images/Professional_podcast_studio_setup_80248453.png";
import businessTeamImage from "@assets/generated_images/Business_team_strategy_session_5c675323.png";

const presenters = [
  {
    name: "Patrice Evra",
    role: "Co-Host & Champion Validator",
    image: patriceImage,
    bio: "🏆 5x Premier League Champion and Manchester United Captain with 14M+ global social following. First elite athlete bridging sports excellence with business strategy and AI innovation. From Old Trafford to Silicon Valley, Patrice brings the championship credibility and global platform to amplify these insights to millions worldwide.",
    expertise: ["Elite Sports Psychology", "High-Pressure Leadership", "Global Platform & Credibility", "Performance Under Pressure", "Elite Sports Validation"],
    socials: {
      linkedin: "https://linkedin.com/in/patrice-evra",
      twitter: "https://twitter.com/patrice_evra",
      instagram: "https://instagram.com/patrice_evra"
    }
  },
  {
    name: "Sayed Baharun",
    role: "Co-Host & Performance Architect",
    image: sayedImage,
    bio: "🚀 Visionary behind The Pressure Play concept. Pioneer of the Champion's Framework methodology combining neuroscience, business strategy, and AI innovation. 15+ years optimizing Fortune 500 C-suite performance and championship teams. Trusted advisor to elite performers across industries who saw the opportunity to bridge three worlds that had never been connected at this level.",
    expertise: ["Visionary Architect of The Pressure Play", "Champion's Framework Methodology", "High-Performance Business Strategy", "Entrepreneurship & Startups", "Neuroscience-Based Performance"],
    socials: {
      linkedin: "https://linkedin.com/in/sayed-baharun",
      twitter: "https://twitter.com/sayed_baharun", 
      instagram: "https://instagram.com/sayed_baharun"
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
            <span className="brand-text">Meet Your Co-Hosts</span>
          </h1>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Two champions from different worlds, united by a shared mission to unlock human potential.
          </p>
          <div className="mt-8">
            <p className="text-headline font-medium brand-text">
              Strategic Vision × Championship Validation = Global Impact
            </p>
          </div>
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apple-card w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform"
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

      {/* Partnership Story */}
      <section className="content-section bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-display-2 font-display mb-6">
              <span className="brand-text">The Partnership That Changed Everything</span>
            </h2>
            <p className="text-body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              When performance architect Sayed Baharun met Manchester United legend Patrice Evra, 
              they discovered something extraordinary: the same principles that create champions on the 
              pitch also drive breakthrough success in business and AI innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="apple-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-headline font-display mb-4">Sayed's Vision</h3>
              <p className="text-body text-muted-foreground">
                The strategic architect who saw the opportunity to revolutionize how we think about performance
              </p>
            </div>
            
            <div className="apple-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-headline font-display mb-4">Shared Mission</h3>
              <p className="text-body text-muted-foreground">
                Decode pressure performance and make championship-level thinking accessible to everyone
              </p>
            </div>
            
            <div className="apple-card p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-headline font-display mb-4">Patrice's Platform</h3>
              <p className="text-body text-muted-foreground">
                The champion's credibility and global reach to amplify these insights worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Mission Statement */}
      <section className="content-section relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={podcastStudioImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70"></div>
        </div>
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-display-2 font-display mb-8">
            <span className="brand-text">Our Mission</span>
          </h2>
          <p className="text-body-large text-muted-foreground leading-relaxed">
            Sayed Baharun and Patrice Evra decode the mindset, strategies, and systems that separate good from great. 
            Together, we bring you exclusive conversations combining elite sports psychology, cutting-edge business strategy, 
            and AI innovation to unlock championship-level performance in any field.
          </p>
        </div>
      </section>

    </div>
  );
}