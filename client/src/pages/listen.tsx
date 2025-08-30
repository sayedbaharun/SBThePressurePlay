import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Rss, Smartphone, Headphones } from "lucide-react";
import EpisodeCard from "@/components/episode-card";
import NewsletterSection from "@/components/newsletter-section";
import type { Episode } from "@shared/schema";

const platforms = [
  {
    name: "Spotify",
    description: "Stream on the world's largest music platform",
    url: "https://open.spotify.com/show/thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    color: "text-green-500",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
  {
    name: "Apple Podcasts",
    description: "Listen on iOS and macOS devices",
    url: "https://podcasts.apple.com/podcast/thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    color: "text-gray-400",
    bgColor: "bg-gray-400/10 border-gray-400/20",
  },
  {
    name: "Google Podcasts",
    description: "Available on Android and Google devices",
    url: "https://podcasts.google.com/feed/thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-11.616c-2.484 0-4.512 2.028-4.512 4.512S9.516 16.512 12 16.512s4.512-2.028 4.512-4.512S14.484 7.488 12 7.488zm0 6.72c-1.224 0-2.208-.984-2.208-2.208S10.776 9.792 12 9.792s2.208.984 2.208 2.208S13.224 14.208 12 14.208z"/>
      </svg>
    ),
    color: "text-blue-500",
    bgColor: "bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "YouTube Music",
    description: "Listen with YouTube Premium",
    url: "https://music.youtube.com/playlist?list=thepressureplay",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: "text-red-500",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
  {
    name: "Overcast",
    description: "Premium podcast app for iOS",
    url: "https://overcast.fm/itunes/thepressureplay",
    icon: <Headphones className="w-8 h-8" />,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10 border-orange-500/20",
  },
  {
    name: "Pocket Casts",
    description: "Cross-platform podcast player",
    url: "https://pca.st/thepressureplay",
    icon: <Smartphone className="w-8 h-8" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10 border-purple-500/20",
  },
];

export default function Listen() {
  const { data: episodes = [], isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const featuredEpisodes = episodes.slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text font-display">
              Listen Everywhere
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The Pressure Play is available on all major podcast platforms. Choose your preferred 
              listening experience and never miss an episode.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Rss className="w-4 h-4 mr-2" />
                50+ Episodes
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Play className="w-4 h-4 mr-2" />
                2M+ Downloads
              </Badge>
            </div>
          </div>

          {/* Platform Grid */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">
              Choose Your Platform
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <Card key={platform.name} className={`${platform.bgColor} border transition-all duration-300 hover:scale-105`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${platform.color} flex-shrink-0`}>
                        {platform.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold mb-2" data-testid={`platform-${platform.name.toLowerCase().replace(' ', '-')}`}>
                          {platform.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {platform.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(platform.url, '_blank')}
                          className="w-full"
                          data-testid={`listen-on-${platform.name.toLowerCase().replace(' ', '-')}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Listen Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* RSS Feed */}
          <Card className="mb-20 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Rss className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 font-display">
                Use Your Own Podcast App?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Copy our RSS feed URL and add it to any podcast application of your choice. 
                Perfect for custom setups and professional podcast managers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <div className="flex-1 p-3 bg-background rounded-lg border text-sm font-mono text-muted-foreground">
                  https://feeds.thepressureplay.com/rss
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText('https://feeds.thepressureplay.com/rss');
                  }}
                  data-testid="copy-rss-feed"
                >
                  Copy RSS
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Latest Episodes */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 gradient-text font-display">
                Latest Episodes
              </h2>
              <p className="text-muted-foreground">
                Start with our most recent conversations and work your way back through our archive.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded mb-2 animate-pulse" />
                      <div className="h-4 bg-muted rounded mb-4 animate-pulse" />
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {featuredEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-20 text-center">
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">50+</h3>
              <p className="text-muted-foreground">Episodes Available</p>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">2M+</h3>
              <p className="text-muted-foreground">Total Downloads</p>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">12</h3>
              <p className="text-muted-foreground">Platforms Available</p>
            </div>
            <div className="p-6">
              <h3 className="text-3xl font-bold gradient-text font-display mb-2">4.9★</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>

          {/* Call to Action */}
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 font-display">
                Start Listening Today
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join millions of listeners who trust The Pressure Play for insights on performance, 
                leadership, and innovation. Pick your platform and dive into our archive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Play className="w-5 h-5 mr-2" />
                  Start with Latest Episode
                </Button>
                <Button variant="outline" size="lg">
                  Browse All Episodes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-20">
        <NewsletterSection />
      </div>
    </div>
  );
}
