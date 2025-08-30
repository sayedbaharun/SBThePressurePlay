import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Mic,
  Video,
  Globe,
  Target,
  Trophy,
  Zap,
  PlayCircle,
  ExternalLink
} from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Pressure Performance Masterclass",
    subtitle: "Live Q&A with Sayed & Patrice",
    description: "Deep dive into applying championship mindset to business challenges. Interactive session combining neuroscience insights with real-world championship experience.",
    date: "Coming Soon",
    time: "TBA",
    format: "Virtual Event",
    type: "Masterclass",
    hosts: "Sayed Baharun & Patrice Evra",
    capacity: "Limited to 500 participants",
    status: "coming_soon"
  },
  {
    id: 2,
    title: "The Champion's Boardroom",
    subtitle: "Elite Strategy Workshop",
    description: "Exclusive workshop for C-suite executives on implementing championship frameworks in high-stakes business decisions.",
    date: "Coming Soon",
    time: "TBA",
    format: "In-Person + Virtual",
    type: "Workshop",
    hosts: "Sayed Baharun & Patrice Evra",
    capacity: "50 in-person, 200 virtual",
    status: "coming_soon"
  },
  {
    id: 3,
    title: "AI x Championship Mindset Summit",
    subtitle: "Future of Performance",
    description: "First-ever summit combining AI innovation with championship psychology. Features live podcast recording with special guests.",
    date: "Coming Soon",
    time: "TBA",
    format: "Hybrid Event",
    type: "Summit",
    hosts: "Sayed Baharun & Patrice Evra + Special Guests",
    capacity: "1,000 attendees",
    status: "coming_soon"
  }
];

const eventTypes = [
  {
    icon: Mic,
    title: "Live Masterclasses",
    description: "Interactive deep-dives with both co-founders",
    features: ["Q&A Sessions", "Live Coaching", "Pressure Scenarios", "Framework Application"]
  },
  {
    icon: Trophy,
    title: "Speaking Engagements",
    description: "Sayed & Patrice at your organization or event",
    features: ["Keynote Presentations", "Corporate Workshops", "Leadership Seminars", "Team Development"]
  },
  {
    icon: Zap,
    title: "AI Strategy Workshops",
    description: "Practical AI implementation for elite performance",
    features: ["Technology Integration", "Performance Analytics", "Decision Support", "Innovation Strategy"]
  },
  {
    icon: PlayCircle,
    title: "Live Podcast Recordings",
    description: "Be part of The Pressure Play audience",
    features: ["Behind-the-Scenes Access", "Guest Interactions", "Live Q&A", "Exclusive Content"]
  }
];

const pastHighlights = [
  {
    title: "Fortune 500 Leadership Summit",
    description: "Keynote on 'Championship Mindset in Business'",
    audience: "500+ C-suite executives",
    impact: "95% rated 'Transformational'"
  },
  {
    title: "Premier League Academy Workshop",
    description: "Mental performance training for young athletes",
    audience: "100+ academy players",
    impact: "Improved pressure performance by 40%"
  },
  {
    title: "AI Innovation Conference",
    description: "Panel on 'Human Performance x Technology'",
    audience: "1,000+ tech leaders",
    impact: "Featured in 15+ industry publications"
  }
];

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Live Experiences
            </Badge>
            <h1 className="text-display-1 font-display mb-6">
              Championship Events
            </h1>
            <p className="text-body-large mb-8 text-white/90">
              Live experiences where the locker room meets the boardroom. 
              Join Sayed Baharun and Patrice Evra for transformational events combining 
              championship mindset with strategic innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Calendar className="w-5 h-5 mr-2" />
                Notify Me of Events
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                <ExternalLink className="w-5 h-5 mr-2" />
                Book Speaking Engagement
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="content-section">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Upcoming Events</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                Exclusive opportunities to learn directly from the co-founders of The Pressure Play. 
                Each event combines Sayed's strategic methodology with Patrice's championship insights.
              </p>
            </div>

            <div className="grid lg:grid-cols-1 gap-8 mb-16">
              {upcomingEvents.map((event, index) => (
                <Card key={event.id} className="apple-card p-8">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge variant={event.status === 'coming_soon' ? 'secondary' : 'default'}>
                            {event.type}
                          </Badge>
                          <Badge variant="outline">
                            {event.format}
                          </Badge>
                        </div>
                        <CardTitle className="text-headline mb-2">{event.title}</CardTitle>
                        <CardDescription className="text-body font-medium brand-text">
                          {event.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-body text-muted-foreground mb-6 leading-relaxed">
                          {event.description}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 text-small">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-primary" />
                            <span>{event.format}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{event.capacity}</span>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                          <p className="text-small font-medium">Hosted by: {event.hosts}</p>
                        </div>
                      </CardContent>
                    </div>
                    <div className="text-center lg:text-right">
                      <Button size="lg" className="w-full lg:w-auto mb-4">
                        Get Notified
                      </Button>
                      <p className="text-small text-muted-foreground">
                        Be first to know when registration opens
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="content-section bg-muted/30">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Event Formats</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                Multiple ways to experience the Champion's Framework live. 
                Each format designed to maximize learning and application.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {eventTypes.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <Card key={type.title} className="apple-card p-8">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-headline">{type.title}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {type.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-small">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-6">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Past Impact */}
      <section className="content-section">
        <div className="container mx-auto px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display-2 font-display mb-6">
                <span className="brand-text">Event Impact</span>
              </h2>
              <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
                Real results from organizations and individuals who've experienced 
                The Pressure Play methodology live.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pastHighlights.map((highlight, index) => (
                <Card key={highlight.title} className="apple-card p-6 text-center">
                  <CardHeader>
                    <CardTitle className="text-caption">{highlight.title}</CardTitle>
                    <CardDescription className="text-small">{highlight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-small font-medium">{highlight.audience}</p>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                        <p className="text-small font-medium brand-text">{highlight.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="content-section">
        <div className="container mx-auto px-5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="apple-card p-12 bg-gradient-to-r from-primary/5 to-accent/5">
              <h2 className="text-display-2 font-display mb-6">
                Ready for Championship-Level Events?
              </h2>
              <p className="text-body-large text-muted-foreground mb-8">
                Join thousands who've experienced the transformational power of combining 
                championship mindset with strategic innovation. Be part of the next live experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  Get Event Notifications
                </Button>
                <Button size="lg" variant="outline">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Book Speaking Engagement
                </Button>
              </div>
              <p className="text-small text-muted-foreground mt-6">
                Events fill up fast • Priority access for Elite Circle members
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}